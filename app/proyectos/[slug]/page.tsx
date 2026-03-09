import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapProjectRowToPublicProject } from "@/lib/project-mappers";
import AccordionSections from "@/components/AccordionSections";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: projectRow, error: projectError } = await supabase
    .from("projects")
    .select(
      "id, slug, title, year, status, summary, tags, cover_url, intro, objective, process, challenges, results, extra_sections, pdf_url, github_url"
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (projectError || !projectRow) {
    return notFound();
  }

  const { data: imageRows, error: imagesError } = await supabase
    .from("project_images")
    .select("image_url, sort_order")
    .eq("project_id", projectRow.id)
    .order("sort_order", { ascending: true });

  if (imagesError) {
    console.error("Error loading gallery:", imagesError);
  }

  const gallery = (imageRows ?? []).map((img) => img.image_url);
  const project = mapProjectRowToPublicProject(projectRow, gallery);

  return (
    <main className="bg-white px-6 py-16">
      <article className="mx-auto max-w-5xl">
        <div className="mb-10 border-b border-neutral-200 pb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-neutral-500">{project.year}</p>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs uppercase tracking-wide text-neutral-600">
              {project.status}
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-900">
            {project.title}
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-neutral-700">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mb-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </section>

        <div className="grid gap-12">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
              Introduction
            </h2>
            <p className="leading-8 text-neutral-700">{project.intro}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
              Objective
            </h2>
            <p className="leading-8 text-neutral-700">{project.objective}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
              Process
            </h2>
            <ul className="space-y-3 text-neutral-700">
              {project.process.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
              Technical challenges
            </h2>
            <ul className="space-y-3 text-neutral-700">
              {project.challenges.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
              Outcome
            </h2>
            <ul className="space-y-3 text-neutral-700">
              {project.results.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <AccordionSections sections={project.extraSections} />

          {project.gallery && project.gallery.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
                Gallery
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {(project.pdfUrl || project.githubUrl) && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
                Files and links
              </h2>

              <div className="flex flex-wrap gap-4">
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-neutral-900 px-6 py-3 text-white transition hover:opacity-90"
                  >
                    View project PDF
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-neutral-300 px-6 py-3 text-neutral-800 transition hover:bg-neutral-100"
                  >
                    View code
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}