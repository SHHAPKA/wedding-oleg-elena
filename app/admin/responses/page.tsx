import { redirect } from "next/navigation";
import { ResponsesDashboard } from "@/components/admin/ResponsesDashboard";
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
    <main className="admin-page">
      <header className="admin-page-header">
        <h1>Ответы</h1>
        <form action={signOut}>
          <button className="admin-secondary-button" type="submit">
            Выйти
          </button>
        </form>
      </header>

      {error ? <p className="admin-load-error">Не удалось загрузить ответы.</p> : null}

      <ResponsesDashboard responses={responses} />
    </main>
  );
}
