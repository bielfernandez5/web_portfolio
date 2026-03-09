import Link from "next/link";
import Image from "next/image";
import { PublicProject } from "@/lib/project-mappers";

type Props = {
  project: PublicProject;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-neutral-500">{project.year}</p>
            <h3 className="text-2xl font-semibold text-neutral-900">
              {project.title}
            </h3>
          </div>

          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs uppercase tracking-wide text-neutral-600">
            {project.status}
          </span>
        </div>

        <p className="mb-5 leading-7 text-neutral-600">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
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
    </Link>
  );
}