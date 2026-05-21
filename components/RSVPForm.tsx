"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { submitRsvp } from "@/app/actions/submit-rsvp";
import { ScrollReveal } from "@/components/ScrollReveal";
import { rsvpSchema, type RSVPFormSchemaInput } from "@/lib/validations/rsvp";
import type { RSVPFormValues, SubmitRsvpResult } from "@/types/rsvp";

function normalizeChildrenInfo(rows: string[]) {
  return rows.map((row) => row.trim()).filter(Boolean).join(", ");
}

export function RSVPForm() {
  const [result, setResult] = useState<SubmitRsvpResult | null>(null);
  const [childrenRows, setChildrenRows] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormSchemaInput, unknown, RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    shouldUnregister: true,
    defaultValues: {
      guestName: "",
      partnerName: "",
      hasChildren: false,
      childrenInfo: "",
    },
  });

  const attendanceStatus = useWatch({ control, name: "attendanceStatus" });
  const hasChildren = useWatch({ control, name: "hasChildren" });
  const childrenCount = useWatch({ control, name: "childrenCount" });
  const canIncludeChildren = attendanceStatus !== "declined";
  const visibleChildrenCount =
    canIncludeChildren &&
    hasChildren &&
    typeof childrenCount === "number" &&
    Number.isFinite(childrenCount) &&
    childrenCount > 0
      ? childrenCount
      : 0;

  const updateChildRow = (index: number, value: string) => {
    setChildrenRows((currentRows) => {
      const nextRows = [...currentRows];
      nextRows[index] = value;
      setValue("childrenInfo", normalizeChildrenInfo(nextRows.slice(0, visibleChildrenCount)), {
        shouldDirty: true,
        shouldValidate: true,
      });
      return nextRows;
    });
  };

  const chooseChildrenPresence = (value: boolean) => {
    setValue("hasChildren", value, { shouldDirty: true, shouldValidate: true });
    if (!value) {
      setChildrenRows([]);
      setValue("childrenInfo", "", { shouldDirty: true, shouldValidate: true });
    }
    setResult(null);
  };

  const onSubmit: SubmitHandler<RSVPFormValues> = async (values) => {
    setResult(null);
    const shouldSaveChildren = values.attendanceStatus !== "declined" && values.hasChildren;
    const response = await submitRsvp({
      ...values,
      hasChildren: shouldSaveChildren,
      childrenCount: shouldSaveChildren ? values.childrenCount : undefined,
      childrenInfo: shouldSaveChildren
        ? normalizeChildrenInfo(childrenRows.slice(0, visibleChildrenCount))
        : undefined,
    });
    setResult(response);

    if (response.success) {
      setChildrenRows([]);
      reset({
        guestName: "",
        partnerName: "",
        hasChildren: false,
        childrenInfo: "",
      });
    }
  };

  return (
    <ScrollReveal
      as="form"
      className={["rsvp-form", hasChildren ? "rsvp-form--with-children" : ""]
        .filter(Boolean)
        .join(" ")}
      onSubmit={handleSubmit(onSubmit)}
      delay={0.26}
    >
      <ScrollReveal as="fieldset" className="field option-group" delay={0.38} y={10}>
        <legend>Планируете ли вы присутствовать на свадьбе?</legend>
        <ScrollReveal as="label" delay={0.44} y={8}>
          <input type="radio" value="alone" {...register("attendanceStatus")} />
          <span>Да, с удовольствием</span>
        </ScrollReveal>
        <ScrollReveal as="label" delay={0.5} y={8}>
          <input type="radio" value="with_partner" {...register("attendanceStatus")} />
          <span>Да, буду с парой</span>
        </ScrollReveal>
        <ScrollReveal as="label" delay={0.56} y={8}>
          <input type="radio" value="declined" {...register("attendanceStatus")} />
          <span>К сожалению, не смогу</span>
        </ScrollReveal>
        {errors.attendanceStatus ? (
          <ScrollReveal as="p" className="field-error" y={6}>
            {errors.attendanceStatus.message}
          </ScrollReveal>
        ) : null}
      </ScrollReveal>

      <ScrollReveal className="field guest-name-field" delay={0.6} y={10}>
        <input
          id="guestName"
          type="text"
          autoComplete="name"
          aria-label="Ваше имя и фамилия"
          placeholder="Ваше имя и фамилия"
          {...register("guestName")}
        />
        {errors.guestName ? (
          <ScrollReveal as="p" className="field-error" y={6}>
            {errors.guestName.message}
          </ScrollReveal>
        ) : null}
      </ScrollReveal>

      {attendanceStatus === "with_partner" ? (
        <ScrollReveal className="field" y={10}>
          <input
            id="partnerName"
            type="text"
            aria-label="Имя и Фамилия вашей пары"
            placeholder="Имя и Фамилия вашей пары"
            {...register("partnerName")}
          />
          {errors.partnerName ? (
            <ScrollReveal as="p" className="field-error" y={6}>
              {errors.partnerName.message}
            </ScrollReveal>
          ) : null}
        </ScrollReveal>
      ) : null}

      {canIncludeChildren ? (
        <>
          <ScrollReveal as="fieldset" className="field option-group children-presence" delay={0.62} y={10}>
            <legend>Будут ли с вами дети?</legend>
            <ScrollReveal as="label" delay={0.68} y={8}>
              <input
                type="radio"
                name="hasChildrenChoice"
                checked={hasChildren === true}
                onChange={() => chooseChildrenPresence(true)}
              />
              <span>Да</span>
            </ScrollReveal>
            <ScrollReveal as="label" delay={0.74} y={8}>
              <input
                type="radio"
                name="hasChildrenChoice"
                checked={hasChildren === false}
                onChange={() => chooseChildrenPresence(false)}
              />
              <span>Нет</span>
            </ScrollReveal>
          </ScrollReveal>

          <input type="hidden" {...register("childrenInfo")} />

          {hasChildren ? (
            <ScrollReveal className="children-details" y={10}>
              <div className="field children-count-field">
                <label htmlFor="childrenCount">Укажите кол-во детей:</label>
                <input
                  id="childrenCount"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  {...register("childrenCount", {
                    valueAsNumber: true,
                    onChange: (event) => {
                      const nextCount = Number(event.target.value);
                      const nextVisibleCount =
                        Number.isFinite(nextCount) && nextCount > 0 ? nextCount : 0;

                      setValue(
                        "childrenInfo",
                        normalizeChildrenInfo(childrenRows.slice(0, nextVisibleCount)),
                        { shouldDirty: true, shouldValidate: true },
                      );
                    },
                  })}
                />
              </div>
              {errors.childrenCount ? (
                <ScrollReveal as="p" className="field-error" y={6}>
                  {errors.childrenCount.message}
                </ScrollReveal>
              ) : null}

              {Array.from({ length: visibleChildrenCount }, (_, index) => (
                <div className="field" key={index}>
                  <input
                    id={`child-${index}`}
                    type="text"
                    aria-label={`Имя и возраст ребенка ${index + 1}`}
                    placeholder="Имя и возраст"
                    value={childrenRows[index] ?? ""}
                    onChange={(event) => updateChildRow(index, event.target.value)}
                  />
                </div>
              ))}

              {errors.childrenInfo ? (
                <ScrollReveal as="p" className="field-error" y={6}>
                  {errors.childrenInfo.message}
                </ScrollReveal>
              ) : null}
            </ScrollReveal>
          ) : null}
        </>
      ) : null}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем..." : "Отправить"}
      </button>

      {result ? (
        <ScrollReveal
          as="p"
          className={result.success ? "form-message form-message--success" : "form-message"}
          y={6}
        >
          {result.success ? result.message : result.error}
        </ScrollReveal>
      ) : null}
    </ScrollReveal>
  );
}
