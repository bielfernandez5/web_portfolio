import { createClient } from "@/lib/supabase/server";

export default async function TestDbPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug, year, status")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold">Error de Supabase</h1>
          <pre className="rounded-2xl bg-neutral-100 p-4 text-sm">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Test DB</h1>

        <div className="space-y-4">
          {data?.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-neutral-200 p-4"
            >
              <p className="text-sm text-neutral-500">{project.year}</p>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-neutral-600">{project.slug}</p>
              <p className="text-neutral-500">{project.status}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}