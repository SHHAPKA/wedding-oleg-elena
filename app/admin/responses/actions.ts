"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { calculateRsvpTotals, normalizeOptionalText, rsvpSchema } from "@/lib/validations/rsvp";
import { createClient } from "@/lib/supabase/server";

export type AdminActionState = {
  error: string | null;
  success: string | null;
};

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readRsvpValues(formData: FormData) {
  return {
    guestName: readString(formData, "guestName"),
    attendanceStatus: readString(formData, "attendanceStatus"),
    partnerName: readString(formData, "partnerName"),
    hasChildren: formData.get("hasChildren") === "on",
    childrenCount: readString(formData, "childrenCount"),
    childrenInfo: readString(formData, "childrenInfo"),
  };
}

export async function updateRsvpResponse(
  formData: FormData,
): Promise<AdminActionState> {
  const id = readString(formData, "id");

  if (!id) {
    return {
      error: "Не удалось определить ответ для редактирования.",
      success: null,
    };
  }

  const parsed = rsvpSchema.safeParse(readRsvpValues(formData));

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Проверьте данные ответа.",
      success: null,
    };
  }

  const data = parsed.data;
  const totals = calculateRsvpTotals(data);
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("rsvp_responses")
    .update({
      guest_name: data.guestName,
      attendance_status: data.attendanceStatus,
      partner_name:
        data.attendanceStatus === "with_partner" ? normalizeOptionalText(data.partnerName) : null,
      has_children: data.attendanceStatus !== "declined" ? data.hasChildren : false,
      children_count: totals.childrenCount,
      children_info:
        data.attendanceStatus !== "declined" && data.hasChildren
          ? normalizeOptionalText(data.childrenInfo)
          : null,
      total_guests: totals.totalGuests,
    })
    .eq("id", id);

  if (error) {
    return {
      error: "Не удалось сохранить изменения.",
      success: null,
    };
  }

  revalidatePath("/admin/responses");

  return {
    error: null,
    success: "Ответ обновлен.",
  };
}

export async function deleteRsvpResponse(
  formData: FormData,
): Promise<AdminActionState> {
  const id = readString(formData, "id");

  if (!id) {
    return {
      error: "Не удалось определить ответ для удаления.",
      success: null,
    };
  }

  const supabase = await requireAdmin();
  const { error } = await supabase.from("rsvp_responses").delete().eq("id", id);

  if (error) {
    return {
      error: "Не удалось удалить ответ.",
      success: null,
    };
  }

  revalidatePath("/admin/responses");

  return {
    error: null,
    success: "Ответ удален.",
  };
}
