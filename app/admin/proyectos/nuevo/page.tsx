"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [year, setYear] = useState("2026");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("projects").insert({
      title,
      slug,
      year,
      status: "en desarrollo",
      summary: "",
      intro: "",
      objective: "",
      process: [],
      challenges: [],
      results: [],
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold">Nuevo proyecto</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="slug-proyecto"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <button className="rounded-xl bg-neutral-900 px-6 py-3 text-white">
            Crear proyecto
          </button>
        </form>
      </div>
    </main>
  );
}