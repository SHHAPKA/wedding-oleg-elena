import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <h1 id="admin-login-title">Вход в админку</h1>
        <LoginForm />
      </section>
    </main>
  );
}
