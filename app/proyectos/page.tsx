import ProjectCard from "@/components/ProjectCard";
import { createClient } from "@/lib/supabase/server";
import { mapProjectRowToPublicProject } from "@/lib/project-mappers";

export default async function ProyectosPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, slug, title, year, status, summary, tags, cover_url, intro, objective, process, challenges, results, extra_sections, pdf_url, github_url"
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading projects:", error);
  }

  const projects = (data ?? []).map((row) => mapProjectRowToPublicProject(row));

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neutral-500">
          Project archive
        </p>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-neutral-900">
          Projects
        </h1>

        <p className="mb-12 max-w-3xl text-lg leading-8 text-neutral-600">
          A selection of engineering, prototyping, electronics, automation,
          physical interface, and experimental development projects.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}