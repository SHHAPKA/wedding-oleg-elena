import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { RSVPResponseRow } from "@/types/rsvp";

export const dynamic = "force-dynamic";

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default async function AdminResponsesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<RSVPResponseRow[]>();

  const responses = data ?? [];

  return (
    <main>
      <header>
        <h1>Ответы RSVP</h1>
        <form action={signOut}>
          <button type="submit">Выйти</button>
        </form>
      </header>

      {error ? <p>Не удалось загрузить ответы.</p> : null}

      <table>
        <caption>Список ответов гостей</caption>
        <thead>
          <tr>
            <th>Гость</th>
            <th>Статус</th>
            <th>Пара</th>
            <th>Дети</th>
            <th>Всего гостей</th>
            <th>Комментарий</th>
            <th>Дата ответа</th>
          </tr>
        </thead>
        <tbody>
          {responses.length > 0 ? (
            responses.map((response) => (
              <tr key={response.id}>
                <td>{response.guest_name}</td>
                <td>{response.attendance_status}</td>
                <td>{response.partner_name ?? "-"}</td>
                <td>
                  {response.has_children
                    ? `${response.children_count ?? 0}: ${response.children_info ?? "-"}`
                    : "-"}
                </td>
                <td>{response.total_guests ?? 0}</td>
                <td>{response.comment ?? "-"}</td>
                <td>
                  {response.created_at
                    ? new Intl.DateTimeFormat("ru-RU", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(response.created_at))
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Ответов пока нет.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
