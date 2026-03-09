"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type ExtraSection = {
  title: string;
  content: string;
};

type Project = {
  id: string;
  slug: string;
  title: string;
  year: string;
  status: "concepto" | "prototipo" | "funcional" | "en desarrollo";
  summary: string;
  tags: string[];
  intro: string;
  objective: string;
  process: string[];
  challenges: string[];
  results: string[];
  extra_sections: ExtraSection[];
  cover_url: string | null;
  pdf_url: string | null;
  github_url: string | null;
  published: boolean;
};

type GalleryImage = {
  id: string;
  image_url: string;
  sort_order: number;
};

export default function EditProjectPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  const [project, setProject] = useState<Project | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [extraSections, setExtraSections] = useState<ExtraSection[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState<Project["status"]>("en desarrollo");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [intro, setIntro] = useState("");
  const [objective, setObjective] = useState("");
  const [process, setProcess] = useState("");
  const [challenges, setChallenges] = useState("");
  const [results, setResults] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert(error.message);
        router.push("/admin");
        return;
      }

      setProject(data);
      setTitle(data.title ?? "");
      setSlug(data.slug ?? "");
      setYear(data.year ?? "");
      setStatus(data.status ?? "en desarrollo");
      setSummary(data.summary ?? "");
      setTags((data.tags ?? []).join(", "));
      setIntro(data.intro ?? "");
      setObjective(data.objective ?? "");
      setProcess((data.process ?? []).join("\n"));
      setChallenges((data.challenges ?? []).join("\n"));
      setResults((data.results ?? []).join("\n"));
      setExtraSections(data.extra_sections ?? []);
      setCoverUrl(data.cover_url ?? "");
      setPdfUrl(data.pdf_url ?? "");
      setGithubUrl(data.github_url ?? "");
      setPublished(data.published ?? true);

      const { data: imagesData, error: imagesError } = await supabase
        .from("project_images")
        .select("id, image_url, sort_order")
        .eq("project_id", id)
        .order("sort_order", { ascending: true });

      if (imagesError) {
        alert(imagesError.message);
      } else {
        setGalleryImages(imagesData ?? []);
      }

      setLoading(false);
    };

    loadProject();
  }, [id, router, supabase]);

  const toArray = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const tagsToArray = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const updateExtraSection = (
    index: number,
    field: keyof ExtraSection,
    value: string
  ) => {
    setExtraSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  const addExtraSection = () => {
    setExtraSections((prev) => [...prev, { title: "", content: "" }]);
  };

  const removeExtraSection = (index: number) => {
    setExtraSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const cleanedExtraSections = extraSections
      .map((section) => ({
        title: section.title.trim(),
        content: section.content.trim(),
      }))
      .filter((section) => section.title || section.content);

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        slug,
        year,
        status,
        summary,
        tags: tagsToArray(tags),
        intro,
        objective,
        process: toArray(process),
        challenges: toArray(challenges),
        results: toArray(results),
        extra_sections: cleanedExtraSections,
        cover_url: coverUrl || null,
        pdf_url: pdfUrl || null,
        github_url: githubUrl || null,
        published,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Proyecto guardado");
  };

  const handleDelete = async () => {
    const ok = confirm("¿Seguro que quieres borrar este proyecto?");
    if (!ok) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  };

  const handleCoverUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${id}/cover-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      setUploadingCover(false);
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    setCoverUrl(data.publicUrl);
    setUploadingCover(false);
  };

  const handlePdfUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${id}/documento-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("project-pdfs")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      setUploadingPdf(false);
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("project-pdfs")
      .getPublicUrl(filePath);

    setPdfUrl(data.publicUrl);
    setUploadingPdf(false);
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploadingGallery(true);

    const startOrder =
      galleryImages.length > 0
        ? Math.max(...galleryImages.map((img) => img.sort_order)) + 1
        : 0;

    const newRows: GalleryImage[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const fileExt = file.name.split(".").pop();
      const filePath = `${id}/gallery-${Date.now()}-${index}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);

      if (uploadError) {
        alert(`Error subiendo ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: publicData } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      const { data: row, error: insertError } = await supabase
        .from("project_images")
        .insert({
          project_id: id,
          image_url: publicData.publicUrl,
          sort_order: startOrder + index,
        })
        .select("id, image_url, sort_order")
        .single();

      if (insertError) {
        alert(`Error guardando ${file.name} en la base: ${insertError.message}`);
        continue;
      }

      newRows.push(row);
    }

    setGalleryImages((prev) =>
      [...prev, ...newRows].sort((a, b) => a.sort_order - b.sort_order)
    );

    e.target.value = "";
    setUploadingGallery(false);
  };

  const extractStoragePathFromPublicUrl = (publicUrl: string) => {
    const marker = "/storage/v1/object/public/project-images/";
    const index = publicUrl.indexOf(marker);

    if (index === -1) return null;

    return publicUrl.slice(index + marker.length);
  };

  const handleDeleteGalleryImage = async (image: GalleryImage) => {
    const ok = confirm("¿Seguro que quieres borrar esta imagen?");
    if (!ok) return;

    setDeletingImageId(image.id);

    const storagePath = extractStoragePathFromPublicUrl(image.image_url);

    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from("project-images")
        .remove([storagePath]);

      if (storageError) {
        setDeletingImageId(null);
        alert(storageError.message);
        return;
      }
    }

    const { error: dbError } = await supabase
      .from("project_images")
      .delete()
      .eq("id", image.id);

    setDeletingImageId(null);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    setGalleryImages((prev) => prev.filter((img) => img.id !== image.id));
  };

  if (loading) {
    return (
      <main className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p>Cargando proyecto...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">Editar proyecto</p>
            <h1 className="text-3xl font-bold">{project?.title}</h1>
          </div>

          <button
            onClick={handleDelete}
            className="rounded-xl border border-red-300 px-4 py-2 text-red-600"
          >
            Borrar
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Datos básicos</h2>

            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <input
              placeholder="Slug"
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

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Project["status"])}
              className="w-full rounded-xl border p-3"
            >
              <option value="concepto">concepto</option>
              <option value="prototipo">prototipo</option>
              <option value="funcional">funcional</option>
              <option value="en desarrollo">en desarrollo</option>
            </select>

            <textarea
              placeholder="Resumen"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[120px] w-full rounded-xl border p-3"
            />

            <input
              placeholder="Tags separados por comas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <span>Publicado</span>
            </label>
          </section>

          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Contenido principal</h2>

            <textarea
              placeholder="Introducción"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border p-3"
            />

            <textarea
              placeholder="Objetivo"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border p-3"
            />

            <textarea
              placeholder="Proceso (una línea por punto)"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              className="min-h-[160px] w-full rounded-xl border p-3"
            />

            <textarea
              placeholder="Retos técnicos (una línea por punto)"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              className="min-h-[160px] w-full rounded-xl border p-3"
            />

            <textarea
              placeholder="Resultados (una línea por punto)"
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className="min-h-[160px] w-full rounded-xl border p-3"
            />
          </section>

          <section className="space-y-4 rounded-2xl border p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Secciones adicionales</h2>

              <button
                type="button"
                onClick={addExtraSection}
                className="rounded-xl border px-4 py-2"
              >
                Añadir sección
              </button>
            </div>

            {extraSections.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Aún no has añadido secciones adicionales.
              </p>
            ) : (
              <div className="space-y-4">
                {extraSections.map((section, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-neutral-700">
                        Sección {index + 1}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeExtraSection(index)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600"
                      >
                        Borrar sección
                      </button>
                    </div>

                    <input
                      placeholder="Título de la sección"
                      value={section.title}
                      onChange={(e) =>
                        updateExtraSection(index, "title", e.target.value)
                      }
                      className="w-full rounded-xl border bg-white p-3"
                    />

                    <textarea
                      placeholder="Contenido de la sección"
                      value={section.content}
                      onChange={(e) =>
                        updateExtraSection(index, "content", e.target.value)
                      }
                      className="min-h-[180px] w-full rounded-xl border bg-white p-3"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Portada</h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="w-full rounded-xl border p-3"
            />

            {uploadingCover && (
              <p className="text-sm text-neutral-500">Subiendo portada...</p>
            )}

            <input
              placeholder="URL portada"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            {coverUrl && (
              <img
                src={coverUrl}
                alt="Portada del proyecto"
                className="max-h-72 rounded-2xl border"
              />
            )}
          </section>

          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Galería</h2>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="w-full rounded-xl border p-3"
            />

            {uploadingGallery && (
              <p className="text-sm text-neutral-500">
                Subiendo imágenes de galería...
              </p>
            )}

            {galleryImages.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Aún no hay imágenes en la galería.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {galleryImages.map((image) => (
                  <div key={image.id} className="rounded-2xl border p-3">
                    <img
                      src={image.image_url}
                      alt="Imagen de galería"
                      className="mb-3 aspect-[4/3] w-full rounded-xl object-cover"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-neutral-500">
                        Orden: {image.sort_order}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(image)}
                        disabled={deletingImageId === image.id}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 disabled:opacity-60"
                      >
                        {deletingImageId === image.id
                          ? "Borrando..."
                          : "Borrar"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">PDF</h2>

            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="w-full rounded-xl border p-3"
            />

            {uploadingPdf && (
              <p className="text-sm text-neutral-500">Subiendo PDF...</p>
            )}

            <input
              placeholder="URL PDF"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl border px-4 py-2"
              >
                Ver PDF actual
              </a>
            )}
          </section>

          <section className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Enlaces</h2>

            <input
              placeholder="URL GitHub"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </section>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-neutral-900 px-6 py-3 text-white disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="rounded-xl border px-6 py-3"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}