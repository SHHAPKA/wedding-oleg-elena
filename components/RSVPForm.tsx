"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { submitRsvp } from "@/app/actions/submit-rsvp";
import { ScrollReveal } from "@/components/ScrollReveal";
import { rsvpSchema, type RSVPFormSchemaInput } from "@/lib/validations/rsvp";
import type { RSVPFormValues, SubmitRsvpResult } from "@/types/rsvp";

export function RSVPForm() {
  const [result, setResult] = useState<SubmitRsvpResult | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormSchemaInput, unknown, RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    shouldUnregister: true,
    defaultValues: {
      guestName: "",
      partnerName: "",
      hasChildren: false,
      childrenInfo: "",
      comment: "",
    },
  });

  const attendanceStatus = useWatch({ control, name: "attendanceStatus" });
  const hasChildren = useWatch({ control, name: "hasChildren" });

  const onSubmit: SubmitHandler<RSVPFormValues> = async (values) => {
    setResult(null);
    const response = await submitRsvp(values);
    setResult(response);

    if (response.success) {
      reset({
        guestName: "",
        partnerName: "",
        hasChildren: false,
        childrenInfo: "",
        comment: "",
      });
    }
  };

  return (
    <ScrollReveal as="form" className="rsvp-form" onSubmit={handleSubmit(onSubmit)} delay={0.26}>
      <ScrollReveal className="field" delay={0.32} y={10}>
        <label htmlFor="guestName">Ваше имя и фамилия</label>
        <input id="guestName" type="text" autoComplete="name" {...register("guestName")} />
        {errors.guestName ? (
          <ScrollReveal as="p" className="field-error" y={6}>
            {errors.guestName.message}
          </ScrollReveal>
        ) : null}
      </ScrollReveal>

      <ScrollReveal as="fieldset" className="field option-group" delay={0.38} y={10}>
        <legend>Вы сможете быть с нами?</legend>
        <ScrollReveal as="label" delay={0.44} y={8}>
          <input type="radio" value="alone" {...register("attendanceStatus")} />
          <span>Да, приду один / одна</span>
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

      {attendanceStatus === "with_partner" ? (
        <ScrollReveal className="field" y={10}>
          <label htmlFor="partnerName">Имя и фамилия пары</label>
          <input id="partnerName" type="text" {...register("partnerName")} />
          {errors.partnerName ? (
            <ScrollReveal as="p" className="field-error" y={6}>
              {errors.partnerName.message}
            </ScrollReveal>
          ) : null}
        </ScrollReveal>
      ) : null}

      <ScrollReveal as="label" className="checkbox-field" delay={0.62} y={10}>
        <input type="checkbox" {...register("hasChildren")} />
        <span>Будут дети</span>
      </ScrollReveal>

      {hasChildren ? (
        <>
          <ScrollReveal className="field" y={10}>
            <label htmlFor="childrenCount">Количество детей</label>
            <input
              id="childrenCount"
              type="number"
              min="1"
              inputMode="numeric"
              {...register("childrenCount", { valueAsNumber: true })}
            />
            {errors.childrenCount ? (
              <ScrollReveal as="p" className="field-error" y={6}>
                {errors.childrenCount.message}
              </ScrollReveal>
            ) : null}
          </ScrollReveal>

          <ScrollReveal className="field" y={10}>
            <label htmlFor="childrenInfo">Имена и возраст детей</label>
            <textarea id="childrenInfo" rows={3} {...register("childrenInfo")} />
            {errors.childrenInfo ? (
              <ScrollReveal as="p" className="field-error" y={6}>
                {errors.childrenInfo.message}
              </ScrollReveal>
            ) : null}
          </ScrollReveal>
        </>
      ) : null}

      <ScrollReveal className="field" delay={0.68} y={10}>
        <label htmlFor="comment">Комментарий</label>
        <textarea id="comment" rows={3} {...register("comment")} />
        {errors.comment ? (
          <ScrollReveal as="p" className="field-error" y={6}>
            {errors.comment.message}
          </ScrollReveal>
        ) : null}
      </ScrollReveal>

      <ScrollReveal
        as="button"
        className="submit-button"
        type="submit"
        disabled={isSubmitting}
        delay={0.74}
        y={8}
      >
        {isSubmitting ? "Отправляем..." : "Отправить"}
      </ScrollReveal>

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
