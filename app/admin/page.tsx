import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, year, status, slug")
    .order("created_at", { ascending: false });

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Panel admin</h1>

          <Link
            href="/admin/proyectos/nuevo"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-white"
          >
            Nuevo proyecto
          </Link>
        </div>

        <div className="space-y-4">
          {projects?.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="text-sm text-neutral-500">{p.year}</p>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-neutral-500">{p.status}</p>
              </div>

              <Link
                href={`/admin/proyectos/${p.id}`}
                className="text-sm underline"
              >
                editar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}