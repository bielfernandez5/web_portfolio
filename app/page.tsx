import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { createClient } from "@/lib/supabase/server";
import { mapProjectRowToPublicProject } from "@/lib/project-mappers";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, slug, title, year, status, summary, tags, cover_url, intro, objective, process, challenges, results, extra_sections, pdf_url, github_url"
    )
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(2);

  if (error) {
    console.error("Error loading projects:", error);
  }

  const featuredProjects = (data ?? []).map((row) =>
    mapProjectRowToPublicProject(row)
  );

  return (
    <main>
      <section className="bg-neutral-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-neutral-500">
              Engineering portfolio
            </p>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl">
              Prototyping, electronics, and experimental development projects
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
              An organized collection of projects focused on technical design,
              problem solving, interactive systems, documentation, and the
              construction of functional prototypes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/proyectos"
                className="rounded-2xl bg-neutral-900 px-6 py-3 text-white transition hover:opacity-90"
              >
                View projects
              </Link>

             <Link
              href="/sobre"
              className="rounded-2xl border border-neutral-300 px-6 py-3 text-neutral-800 transition hover:bg-neutral-100"
            >
              About 
            </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neutral-500">
              Approach
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900">
              A technical and visual archive of real processes
            </h2>
          </div>

          <div className="space-y-5 md:col-span-2">
            <p className="leading-8 text-neutral-600">
              This portfolio is not intended as just a gallery of results, but
              as a clear structure for documenting ideas, iterations, technical
              problems, and the solutions applied.
            </p>

            <p className="leading-8 text-neutral-600">
              The aim is to show both the visual side of each project and its
              internal logic: design decisions, architecture, component
              integration, and accumulated learning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neutral-500">
                Selection
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900">
                Featured projects
              </h2>
            </div>

            <Link
              href="/proyectos"
              className="text-sm font-medium text-neutral-700 transition hover:text-neutral-900"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}