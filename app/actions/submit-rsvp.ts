"use server";

import { calculateRsvpTotals, normalizeOptionalText, rsvpSchema } from "@/lib/validations/rsvp";
import { createClient } from "@/lib/supabase/server";
import type { RSVPFormValues, SubmitRsvpResult } from "@/types/rsvp";

export async function submitRsvp(values: RSVPFormValues): Promise<SubmitRsvpResult> {
  const parsed = rsvpSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Проверьте данные формы",
    };
  }

  const data = parsed.data;
  const totals = calculateRsvpTotals(data);

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("rsvp_responses").insert({
      guest_name: data.guestName,
      attendance_status: data.attendanceStatus,
      partner_name:
        data.attendanceStatus === "with_partner" ? normalizeOptionalText(data.partnerName) : null,
      has_children: data.hasChildren,
      children_count: totals.childrenCount,
      children_info: data.hasChildren ? normalizeOptionalText(data.childrenInfo) : null,
      comment: normalizeOptionalText(data.comment),
      total_guests: totals.totalGuests,
    });

    if (error) {
      return {
        success: false,
        error: "Не удалось сохранить ответ. Попробуйте позже.",
      };
    }

    return {
      success: true,
      message: "Спасибо, ваш ответ сохранен.",
    };
  } catch {
    return {
      success: false,
      error: "Не удалось подключиться к базе данных.",
    };
  }
}
