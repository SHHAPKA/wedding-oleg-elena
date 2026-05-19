"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { submitRsvp } from "@/app/actions/submit-rsvp";
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
    <form className="rsvp-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="guestName">Ваше имя и фамилия</label>
        <input id="guestName" type="text" autoComplete="name" {...register("guestName")} />
        {errors.guestName ? <p className="field-error">{errors.guestName.message}</p> : null}
      </div>

      <fieldset className="field option-group">
        <legend>Вы сможете быть с нами?</legend>
        <label>
          <input type="radio" value="alone" {...register("attendanceStatus")} />
          <span>Да, приду один / одна</span>
        </label>
        <label>
          <input type="radio" value="with_partner" {...register("attendanceStatus")} />
          <span>Да, буду с парой</span>
        </label>
        <label>
          <input type="radio" value="declined" {...register("attendanceStatus")} />
          <span>К сожалению, не смогу</span>
        </label>
        {errors.attendanceStatus ? (
          <p className="field-error">{errors.attendanceStatus.message}</p>
        ) : null}
      </fieldset>

      {attendanceStatus === "with_partner" ? (
        <div className="field">
          <label htmlFor="partnerName">Имя и фамилия пары</label>
          <input id="partnerName" type="text" {...register("partnerName")} />
          {errors.partnerName ? <p className="field-error">{errors.partnerName.message}</p> : null}
        </div>
      ) : null}

      <label className="checkbox-field">
        <input type="checkbox" {...register("hasChildren")} />
        <span>Будут дети</span>
      </label>

      {hasChildren ? (
        <>
          <div className="field">
            <label htmlFor="childrenCount">Количество детей</label>
            <input
              id="childrenCount"
              type="number"
              min="1"
              inputMode="numeric"
              {...register("childrenCount", { valueAsNumber: true })}
            />
            {errors.childrenCount ? (
              <p className="field-error">{errors.childrenCount.message}</p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="childrenInfo">Имена и возраст детей</label>
            <textarea id="childrenInfo" rows={3} {...register("childrenInfo")} />
            {errors.childrenInfo ? (
              <p className="field-error">{errors.childrenInfo.message}</p>
            ) : null}
          </div>
        </>
      ) : null}

      <div className="field">
        <label htmlFor="comment">Комментарий</label>
        <textarea id="comment" rows={3} {...register("comment")} />
        {errors.comment ? <p className="field-error">{errors.comment.message}</p> : null}
      </div>

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем..." : "Отправить"}
      </button>

      {result ? (
        <p className={result.success ? "form-message form-message--success" : "form-message"}>
          {result.success ? result.message : result.error}
        </p>
      ) : null}
    </form>
  );
}
