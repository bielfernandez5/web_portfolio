import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neutral-500">
          About
        </p>

        <h1 className="mb-14 max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
          Design, prototyping, engineering, and experimental development
        </h1>

        <section className="mb-20 grid gap-12 md:grid-cols-[380px_1fr] md:items-start">
          <div className="space-y-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
              <Image
                src="/images/profile.jpg"
                alt="Biel Fernandez"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="mb-2 text-sm uppercase tracking-[0.18em] text-neutral-500">
                Focus
              </p>
              <p className="leading-7 text-neutral-700">
                Technical systems, interactive objects, prototyping,
                electronics, physical interfaces, and structured project
                development.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6 text-lg leading-8 text-neutral-700">
              <p>
                I am interested in creating systems, objects, and interfaces
                where engineering, design, experimentation, and problem solving
                intersect in a coherent and functional way.
              </p>

              <p>
                My work is centered on developing prototypes and technical
                projects that combine physical interaction, electronic systems,
                digital logic, iterative construction, and clear documentation.
              </p>

              <p>
                Rather than treating projects only as final results, I approach
                them as evolving structures shaped by decisions, constraints,
                testing, failure, adjustment, and refinement. For me, the value
                of a project is just as much in its internal logic as in its
                final form.
              </p>

              <p>
                This portfolio is designed as a technical and visual archive of
                that process: a place to document concepts, architecture,
                materials, interfaces, technical challenges, and the reasoning
                behind each stage of development.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-neutral-500">
                  Areas of interest
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li>Electronics and embedded systems</li>
                  <li>Prototyping and experimental devices</li>
                  <li>Physical interfaces and interaction design</li>
                  <li>Automation and custom technical tools</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-neutral-500">
                  Working approach
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li>Concept-driven technical development</li>
                  <li>Iterative design and testing</li>
                  <li>Attention to structure and usability</li>
                  <li>Documentation as part of the project itself</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
              <p className="mb-3 text-sm uppercase tracking-[0.18em] text-neutral-500">
                Intent
              </p>
              <p className="text-lg leading-8 text-neutral-700">
                My goal is to build projects that are not only functional, but
                also intellectually coherent: systems where form, structure,
                interaction, and technical decisions all support one another.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-neutral-200 bg-neutral-900 px-8 py-12 text-white md:px-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.9fr] md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neutral-400">
                Curriculum vitae
              </p>

              <h2 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl">
                CV / Resume
              </h2>

              <p className="max-w-2xl text-lg leading-8 text-neutral-300">
                A full overview of my background, skills, and project-oriented
                experience in a clean downloadable format.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:justify-end">
              <a
                href="/docs/Biel-Fernandez-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white px-6 py-3 font-medium text-neutral-900 transition hover:opacity-90"
              >
                View CV
              </a>

              <a
                href="/docs/Biel-Fernandez-CV.pdf"
                download
                className="rounded-2xl border border-neutral-500 px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
              >
                Download CV
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}