"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUserAction } from "@/app/actions/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const res = await registerUserAction(data);

    setLoading(false);
    if (!res.ok) {
      if (res.error === "invalid_input") {
        setServerError("Invalid input — check the form fields.");
        console.log("validation details:", res.details);
      } else if (res.error === "user_exists") {
        setServerError("A user with that email already exists.");
      } else {
        console.log("errorr",res.error.message)
        setServerError(res.error.message);
      }
      return;
    }

    // success
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="name" type="text" required/>
      <input name="email" type="email" required />
      <input name="phone" type="text" />
      <input name="password" type="password" required/>
      <button type="submit" disabled={loading}>{loading ? "Saving..." : "Register"}</button>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
    </form>
  );
}
