export type ExtraSection = {
  title: string;
  content: string;
};

export type PublicProject = {
  id: string;
  slug: string;
  title: string;
  year: string;
  status: "concepto" | "prototipo" | "funcional" | "en desarrollo";
  summary: string;
  tags: string[];
  cover: string;
  intro: string;
  objective: string;
  process: string[];
  challenges: string[];
  results: string[];
  extraSections: ExtraSection[];
  gallery?: string[];
  pdfUrl?: string;
  githubUrl?: string;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  year: string;
  status: PublicProject["status"];
  summary: string;
  tags: string[] | null;
  cover_url: string | null;
  intro: string;
  objective: string;
  process: string[] | null;
  challenges: string[] | null;
  results: string[] | null;
  extra_sections: ExtraSection[] | null;
  pdf_url: string | null;
  github_url: string | null;
};

export function mapProjectRowToPublicProject(
  row: ProjectRow,
  gallery: string[] = []
): PublicProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    year: row.year,
    status: row.status,
    summary: row.summary,
    tags: row.tags ?? [],
    cover: row.cover_url || "/images/placeholder-project.jpg",
    intro: row.intro,
    objective: row.objective,
    process: row.process ?? [],
    challenges: row.challenges ?? [],
    results: row.results ?? [],
    extraSections: row.extra_sections ?? [],
    gallery,
    pdfUrl: row.pdf_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
  };
}