"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <form className="admin-login-form" action={formAction}>
      <div className="admin-form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="admin-form-field">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <button className="admin-primary-button" type="submit" disabled={isPending}>
        {isPending ? "Входим..." : "Войти"}
      </button>

      {state.error ? <p className="admin-action-error">{state.error}</p> : null}
    </form>
  );
}
