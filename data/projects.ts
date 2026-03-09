export type ProjectStatus =
  | "concepto"
  | "prototipo"
  | "funcional"
  | "en desarrollo";

export type Project = {
  slug: string;
  title: string;
  year: string;
  status: ProjectStatus;
  summary: string;
  tags: string[];
  cover: string;
  intro: string;
  objective: string;
  process: string[];
  challenges: string[];
  results: string[];
  gallery?: string[];
  pdfUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "sintetizador-modular-digital",
    title: "Sintetizador modular digital",
    year: "2026",
    status: "en desarrollo",
    summary:
      "Desarrollo de un sintetizador experimental con controles físicos, routing digital y diseño modular.",
    tags: ["ESP32", "Audio", "Prototipo", "Diseño industrial"],
    cover: "/images/sinte-cover.jpg",
    intro:
      "Proyecto centrado en la creación de un instrumento digital experimental con interfaz física personalizada y arquitectura modular.",
    objective:
      "Diseñar un sintetizador propio que combine control físico, flexibilidad sonora y una estructura visual y técnica coherente.",
    process: [
      "Definición de la arquitectura general del instrumento.",
      "Selección de microcontrolador, controles físicos y pantalla.",
      "Diseño del flujo de navegación y organización de parámetros.",
      "Pruebas de integración entre electrónica, firmware y carcasa.",
    ],
    challenges: [
      "Organizar muchos controles físicos sin volver confusa la interfaz.",
      "Mantener estabilidad eléctrica y buena lectura de entradas.",
      "Diseñar una carcasa que sea funcional y visualmente limpia.",
    ],
    results: [
      "Base funcional del sistema de control.",
      "Definición clara del enfoque modular del instrumento.",
      "Estructura lista para seguir ampliando motores sonoros y documentación.",
    ],
    gallery: [
      "/images/sinte-cover.jpg",
      "/images/sinte-2.jpg",
      "/images/sinte-3.jpg",
    ],
    pdfUrl: "/docs/sintetizador.pdf",
  },
  {
    slug: "sistema-cultivo-automatizado",
    title: "Sistema de cultivo automatizado",
    year: "2026",
    status: "prototipo",
    summary:
      "Sistema con sensores ambientales, control horario y automatización con microcontrolador.",
    tags: ["ESP32", "IoT", "Sensores", "Automatización"],
    cover: "/images/cultivo-cover.jpg",
    intro:
      "Sistema orientado al control de ventilación, humedad y monitorización ambiental para cultivo automatizado.",
    objective:
      "Crear un sistema compacto capaz de supervisar variables clave y actuar sobre dispositivos según horarios y lecturas.",
    process: [
      "Selección de sensores y relés adecuados para el entorno.",
      "Programación de lógica de horarios y lectura ambiental.",
      "Integración de pantalla y elementos de interfaz.",
      "Pruebas de estabilidad eléctrica y validación del sistema.",
    ],
    challenges: [
      "Evitar errores de lectura por ruido o problemas de bus.",
      "Mantener comportamiento fiable en relés y actuadores.",
      "Diseñar una lógica clara para horarios y estados visibles.",
    ],
    results: [
      "Prototipo funcional de monitorización y automatización.",
      "Sistema preparado para siguientes iteraciones de robustez.",
      "Base sólida para documentación técnica del proyecto.",
    ],
    gallery: [
      "/images/cultivo-cover.jpg",
      "/images/cultivo-2.jpg",
      "/images/cultivo-3.jpg",
    ],
  },
];