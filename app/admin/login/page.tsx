"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback?next=/admin",
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Revisa tu email para el enlace de acceso.");
    }
  };

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-3xl font-bold">Admin login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-white"
          >
            Enviar enlace mágico
          </button>
        </form>
      </div>
    </main>
  );
}