"use client";

import { useState } from "react";

type ExtraSection = {
  title: string;
  content: string;
};

type Props = {
  sections: ExtraSection[];
};

export default function AccordionSections({ sections }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!sections.length) return null;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
        Additional sections
      </h2>

      <div className="space-y-3">
        {sections.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={`${section.title}-${index}`}
              className="overflow-hidden rounded-2xl border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between bg-neutral-50 px-5 py-4 text-left"
              >
                <span className="text-lg font-medium text-neutral-900">
                  {section.title}
                </span>

                <span className="text-sm text-neutral-500">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-neutral-200 bg-white px-5 py-5">
                  <p className="whitespace-pre-line leading-8 text-neutral-700">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}