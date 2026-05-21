import { z } from "zod";
import { ATTENDANCE_STATUSES, type RSVPFormValues, type RSVPGuestTotals } from "@/types/rsvp";

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

const optionalNumber = z.preprocess(
  (value) => {
    if (value === "" || value === null || typeof value === "undefined") {
      return undefined;
    }

    return Number(value);
  },
  z.number().int("Укажите целое число").min(0, "Количество не может быть отрицательным").optional(),
);

export const rsvpSchema = z
  .object({
    guestName: z.string().trim().min(1, "Укажите имя и фамилию"),
    attendanceStatus: z.enum(ATTENDANCE_STATUSES, {
      error: "Выберите статус присутствия",
    }),
    partnerName: optionalText,
    hasChildren: z.boolean().default(false),
    childrenCount: optionalNumber,
    childrenInfo: optionalText,
  })
  .superRefine((data, ctx) => {
    if (data.attendanceStatus === "with_partner" && !data.partnerName) {
      ctx.addIssue({
        code: "custom",
        path: ["partnerName"],
        message: "Укажите имя и фамилию пары",
      });
    }

    const shouldValidateChildren = data.attendanceStatus !== "declined" && data.hasChildren;

    if (shouldValidateChildren && (!data.childrenCount || data.childrenCount < 1)) {
      ctx.addIssue({
        code: "custom",
        path: ["childrenCount"],
        message: "Укажите количество детей",
      });
    }

    const filledChildrenRows = data.childrenInfo
      ? data.childrenInfo.split(",").map((child) => child.trim()).filter(Boolean)
      : [];

    if (
      shouldValidateChildren &&
      (!data.childrenInfo || filledChildrenRows.length < (data.childrenCount ?? 0))
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["childrenInfo"],
        message: "Укажите имя и возраст каждого ребенка",
      });
    }
  });

export type RSVPFormSchemaInput = z.input<typeof rsvpSchema>;

export function calculateRsvpTotals(values: RSVPFormValues): RSVPGuestTotals {
  if (values.attendanceStatus === "declined") {
    return {
      adults: 0,
      childrenCount: 0,
      totalGuests: 0,
    };
  }

  const adults = values.attendanceStatus === "with_partner" ? 2 : 1;
  const childrenCount = values.hasChildren ? values.childrenCount ?? 0 : 0;

  return {
    adults,
    childrenCount,
    totalGuests: adults + childrenCount,
  };
}

export function normalizeOptionalText(value: string | undefined): string | null {
  return value?.trim() ? value.trim() : null;
}
