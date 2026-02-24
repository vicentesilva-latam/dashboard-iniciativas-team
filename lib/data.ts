export interface StateHistory {
  status: 'Backlog' | 'Discovery' | 'Priorizado' | 'En Progreso' | 'Finalizado';
  days: number;
}

export interface Initiative {
  id: string;
  summary: string;
  status: 'Backlog' | 'Discovery' | 'Priorizado' | 'En Progreso' | 'Finalizado';
  originalStatus: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  journeyStage: 'Atracción a Contratación' | 'Pre-ingreso a Aterrizaje' | 'Vida en LATAM' | 'Egreso' | 'Fundamentos Corporativos';
  microJourney: string;
  country: string;
  assignee: string;
  createdDate: string;
  updatedDate: string;
  resolvedDate?: string;
  targetEnd?: string;
  timeInStateDays: number;
  description: string;
  history?: StateHistory[];
}

export const HR_DATA: Initiative[] = [
  // PRIORITIZED (Portfolio Backlog) - 10 items
  { 
    id: "GDI-2420", 
    summary: "Integración Reclutamiento + Personas Único", 
    status: "Priorizado", 
    originalStatus: "PORTFOLIO BACKLOG", 
    priority: "Critical", 
    journeyStage: "Atracción a Contratación", 
    microJourney: "Reclutamiento", 
    country: "Corporativo", 
    assignee: "Ricardo Gonzalez", 
    createdDate: "2025-11-04", 
    updatedDate: "2026-02-23", 
    targetEnd: "2026-05-15", 
    timeInStateDays: 111, 
    description: "Integración de sistemas de reclutamiento.",
    history: [
      { status: 'Backlog', days: 30 },
      { status: 'Discovery', days: 45 }
    ]
  },
  { 
    id: "GDI-2721", 
    summary: "[MGP] Impulso de Desarrollo", 
    status: "Priorizado", 
    originalStatus: "PORTFOLIO BACKLOG", 
    priority: "Critical", 
    journeyStage: "Vida en LATAM", 
    microJourney: "Crecimiento de Personas", 
    country: "Corporativo", 
    assignee: "Fernanda Santos", 
    createdDate: "2026-02-05", 
    updatedDate: "2026-02-23", 
    targetEnd: "2026-04-30", 
    timeInStateDays: 18, 
    description: "Impulso de desarrollo con IA.",
    history: [
      { status: 'Backlog', days: 5 }
    ]
  },
  { id: "GDI-2715", summary: "Iniciativa - EMBRAER - Impactos Nómina", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "Critical", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Silvia Correia", createdDate: "2026-02-04", updatedDate: "2026-02-10", targetEnd: "2026-03-20", timeInStateDays: 19, description: "Impactos nómina tripulantes Embraer.", history: [{ status: 'Backlog', days: 6 }] },
  { id: "GDI-2424", summary: "Traslado de Aplicaciones Fiori - KR 2.3", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "Critical", journeyStage: "Fundamentos Corporativos", microJourney: "Tecnología", country: "Corporativo", assignee: "Ricardo Gonzalez", createdDate: "2025-09-25", updatedDate: "2026-02-10", targetEnd: "2026-06-30", timeInStateDays: 151, description: "Disminución de vulnerabilidades.", history: [{ status: 'Backlog', days: 20 }, { status: 'Discovery', days: 40 }] },
  { id: "GDI-2415", summary: "Iniciativa - Mejoras Brasil 2026", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Silvia Correia", createdDate: "2025-11-18", updatedDate: "2026-02-23", targetEnd: "2026-05-01", timeInStateDays: 97, description: "Listado de mejoras Brasil.", history: [{ status: 'Backlog', days: 15 }] },
  { id: "GDI-2414", summary: "Iniciativa - RRHH Corporativas", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "High", journeyStage: "Fundamentos Corporativos", microJourney: "Corporativo", country: "Corporativo", assignee: "Edilaine Vascos", createdDate: "2025-11-18", updatedDate: "2026-02-23", targetEnd: "2026-04-15", timeInStateDays: 97, description: "Iniciativas RRHH Corporativas.", history: [{ status: 'Backlog', days: 20 }] },
  { id: "GDI-2413", summary: "Proyecto Santander Nexus", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil/Chile", assignee: "Silvia Correia", createdDate: "2025-11-18", updatedDate: "2026-02-10", targetEnd: "2026-08-30", timeInStateDays: 97, description: "Automatización de pagos bancarios.", history: [{ status: 'Backlog', days: 12 }, { status: 'Discovery', days: 30 }] },
  { id: "GDI-2524", summary: "Iniciativa - ADT: Evaluación y Mejora", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Silvia Correia", createdDate: "2026-01-14", updatedDate: "2026-02-23", targetEnd: "2026-04-30", timeInStateDays: 40, description: "Evaluación de viáticos de tripulantes.", history: [{ status: 'Backlog', days: 5 }] },
  { id: "GDI-2685", summary: "Iniciativa - Gen. Contratos Automático PE", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "Medium", journeyStage: "Atracción a Contratación", microJourney: "Reclutamiento", country: "Perú", assignee: "Leonardo Gonzalez", createdDate: "2026-01-29", updatedDate: "2026-02-23", targetEnd: "2026-03-31", timeInStateDays: 25, description: "Automatización de contratos.", history: [{ status: 'Backlog', days: 3 }] },
  { id: "GDI-2427", summary: "Proyecto JV", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "High", journeyStage: "Fundamentos Corporativos", microJourney: "Cumplimiento", country: "Corporativo", assignee: "Ricardo Gonzalez", createdDate: "2025-06-02", updatedDate: "2026-02-23", targetEnd: "2026-05-30", timeInStateDays: 266, description: "Gestión de empleados JV.", history: [{ status: 'Backlog', days: 40 }, { status: 'Discovery', days: 60 }] },

  // EN ENTREGA (Developing) - 11 items
  { 
    id: "GDI-2720", 
    summary: "[MGP] Metas dinámicas", 
    status: "En Progreso", 
    originalStatus: "DEVELOPING", 
    priority: "Critical", 
    journeyStage: "Vida en LATAM", 
    microJourney: "Crecimiento de Personas", 
    country: "Corporativo", 
    assignee: "Fernanda Santos", 
    createdDate: "2026-02-05", 
    updatedDate: "2026-02-23", 
    targetEnd: "2026-03-12", 
    timeInStateDays: 18, 
    description: "Objetivos dinámicos trimestrales.",
    history: [
      { status: 'Backlog', days: 2 },
      { status: 'Discovery', days: 10 },
      { status: 'Priorizado', days: 5 }
    ]
  },
  { id: "GDI-2448", summary: "Iniciativa - BR - OCV - ACT 2025", status: "En Progreso", originalStatus: "DEVELOPING", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Silvia Correia", createdDate: "2025-12-15", updatedDate: "2026-02-10", targetEnd: "2026-03-02", timeInStateDays: 70, description: "Acuerdo sindical Brasil 2025.", history: [{ status: 'Backlog', days: 10 }, { status: 'Discovery', days: 15 }, { status: 'Priorizado', days: 20 }] },
  { id: "GDI-2417", summary: "Proyecto Payflow - Compensaciones", status: "En Progreso", originalStatus: "DEVELOPING", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Corporativo", assignee: "Benjamin Vilches", createdDate: "2025-11-18", updatedDate: "2026-02-23", targetEnd: "2026-03-06", timeInStateDays: 97, description: "Asignación de compensaciones.", history: [{ status: 'Backlog', days: 10 }, { status: 'Discovery', days: 20 }, { status: 'Priorizado', days: 30 }] },
  { id: "GDI-2416", summary: "Proyecto Reconóceme", status: "En Progreso", originalStatus: "DEVELOPING", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Crecimiento de Personas", country: "Corporativo", assignee: "Benjamin Vilches", createdDate: "2025-11-18", updatedDate: "2026-02-23", targetEnd: "2026-03-31", timeInStateDays: 97, description: "Plataforma de reconocimientos.", history: [{ status: 'Backlog', days: 15 }, { status: 'Discovery', days: 25 }, { status: 'Priorizado', days: 40 }] },
  { id: "GDI-2418", summary: "Proyecto SOC - Reemplazo SAP EHS", status: "En Progreso", originalStatus: "DEVELOPING", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Fabio Mecheletti", createdDate: "2025-11-18", updatedDate: "2026-02-23", targetEnd: "2026-03-31", timeInStateDays: 97, description: "Salud y seguridad Brasil.", history: [{ status: 'Backlog', days: 20 }, { status: 'Priorizado', days: 40 }] },
  { id: "GDI-2422", summary: "Automatización de sueldos Perú", status: "En Progreso", originalStatus: "DEVELOPING", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Perú", assignee: "Ricardo Gonzalez", createdDate: "2025-10-24", updatedDate: "2026-02-23", targetEnd: "2026-04-10", timeInStateDays: 122, description: "Aumentos sueldos pilotos.", history: [{ status: 'Backlog', days: 30 }, { status: 'Priorizado', days: 50 }] },
  { id: "GDI-2716", summary: "[RUN] RRHH Personas", status: "En Progreso", originalStatus: "DEVELOPING", priority: "Medium", journeyStage: "Fundamentos Corporativos", microJourney: "Operación", country: "Corporativo", assignee: "Juan Carlos Cepeda", createdDate: "2026-02-04", updatedDate: "2026-02-23", targetEnd: "2026-12-31", timeInStateDays: 19, description: "Control demandas RUN.", history: [{ status: 'Backlog', days: 5 }] },
  { id: "GDI-2412", summary: "Proyecto MUP - Desempeño", status: "En Progreso", originalStatus: "DEVELOPING", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Crecimiento de Personas", country: "Corporativo", assignee: "Vicente Silva", createdDate: "2025-10-10", updatedDate: "2026-02-23", targetEnd: "2026-03-12", timeInStateDays: 136, description: "Modelo Único de Personas.", history: [{ status: 'Backlog', days: 20 }, { status: 'Priorizado', days: 60 }] },
  { id: "GDI-2516", summary: "Iniciativa - Nombre Social (RRHH)", status: "En Progreso", originalStatus: "DEVELOPING", priority: "Medium", journeyStage: "Pre-ingreso a Aterrizaje", microJourney: "Pre-ingreso", country: "Brasil", assignee: "Fernando Salazar", createdDate: "2026-01-12", updatedDate: "2026-02-10", targetEnd: "2026-03-31", timeInStateDays: 42, description: "Nombre Social Brasil.", history: [{ status: 'Backlog', days: 10 }, { status: 'Priorizado', days: 20 }] },
  { id: "GDI-2425", summary: "SAP S4 - Mejoras BPs Externos", status: "En Progreso", originalStatus: "DEVELOPING", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Corporativo", assignee: "Silvia Correia", createdDate: "2025-09-10", updatedDate: "2026-02-10", targetEnd: "2026-04-30", timeInStateDays: 166, description: "Gestión masiva BPs.", history: [{ status: 'Backlog', days: 40 }, { status: 'Priorizado', days: 80 }] },
  { id: "GDI-2428", summary: "Iniciativa - WF Ordenanza 671", status: "En Progreso", originalStatus: "DEVELOPING", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Fabio Mecheletti", createdDate: "2024-06-24", updatedDate: "2026-02-23", targetEnd: "2026-04-30", timeInStateDays: 609, description: "Legislación 671 Brasil.", history: [{ status: 'Backlog', days: 100 }, { status: 'Discovery', days: 200 }, { status: 'Priorizado', days: 300 }] },

  // DESCUBRIMIENTO (Exploring Solution) - 3 items
  { id: "GDI-2419", summary: "Iniciativa - Procesos de selección masivos", status: "Discovery", originalStatus: "EXPLORING SOLUTION", priority: "Critical", journeyStage: "Atracción a Contratación", microJourney: "Reclutamiento Masivo", country: "Corporativo", assignee: "Vicente Silva", createdDate: "2025-11-04", updatedDate: "2026-02-23", targetEnd: "2026-03-07", timeInStateDays: 111, description: "Transformación reclutamiento.", history: [{ status: 'Backlog', days: 20 }] },
  { id: "GDI-2729", summary: "Lentitud procesos de nómina Brasil", status: "Discovery", originalStatus: "EXPLORING SOLUTION", priority: "Critical", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Brasil", assignee: "Fabio Mecheletti", createdDate: "2026-02-05", updatedDate: "2026-02-23", targetEnd: "2026-03-31", timeInStateDays: 18, description: "Análisis lentitud nómina Brasil.", history: [{ status: 'Backlog', days: 5 }] },
  { id: "GDI-2421", summary: "Iniciativa - RMK", status: "Discovery", originalStatus: "EXPLORING SOLUTION", priority: "Critical", journeyStage: "Atracción a Contratación", microJourney: "Atracción", country: "Corporativo", assignee: "Ricardo Gonzalez", createdDate: "2025-11-04", updatedDate: "2026-02-23", targetEnd: "2026-06-30", timeInStateDays: 111, description: "Implementación RMK." },

  // CREADO (Not Prioritized) - 4 items
  { id: "GDI-2724", summary: "[MGP] Asistente de Apoyo (IA)", status: "Backlog", originalStatus: "Created", priority: "High", journeyStage: "Vida en LATAM", microJourney: "Crecimiento de Personas", country: "Corporativo", assignee: "Fernanda Santos", createdDate: "2026-02-05", updatedDate: "2026-02-23", targetEnd: "2026-05-30", timeInStateDays: 18, description: "Asistente escritura GenAI." },
  { id: "GDI-2722", summary: "[MGP] Diario de a bordo", status: "Backlog", originalStatus: "Created", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Crecimiento de Personas", country: "Corporativo", assignee: "Fernanda Santos", createdDate: "2026-02-05", updatedDate: "2026-02-23", targetEnd: "2026-05-30", timeInStateDays: 18, description: "Registro eventos líder." },
  { id: "GDI-2723", summary: "[MGP] Gestión de masas", status: "Backlog", originalStatus: "Created", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Crecimiento de Personas", country: "Corporativo", assignee: "Fernanda Santos", createdDate: "2026-02-05", updatedDate: "2026-02-23", targetEnd: "2026-05-30", timeInStateDays: 18, description: "Acciones masivas líderes." },
  { id: "GDI-2725", summary: "[MGP] Experiencia vía - Móvil", status: "Backlog", originalStatus: "Created", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Crecimiento de Personas", country: "Corporativo", assignee: "Fernanda Santos", createdDate: "2026-02-05", updatedDate: "2026-02-23", targetEnd: "2026-05-30", timeInStateDays: 18, description: "Mobile-First microinteracciones." },

  // ENTREGADO (Listo/Resuelta) - 2 items
  { 
    id: "GDI-2423", 
    summary: "Limpieza de almacenamiento SuccessFactors", 
    status: "Finalizado", 
    originalStatus: "Listo", 
    priority: "Critical", 
    journeyStage: "Fundamentos Corporativos", 
    microJourney: "Datos", 
    country: "Corporativo", 
    assignee: "Ricardo Gonzalez", 
    createdDate: "2025-10-16", 
    updatedDate: "2026-01-26", 
    resolvedDate: "2026-01-26", 
    timeInStateDays: 130, 
    description: "Purga candidatos SF.",
    history: [
      { status: 'Backlog', days: 10 },
      { status: 'Discovery', days: 30 },
      { status: 'Priorizado', days: 20 },
      { status: 'En Progreso', days: 70 }
    ]
  },
  { id: "GDI-2426", summary: "Compensaciones: Ambientes seguros", status: "Finalizado", originalStatus: "Listo", priority: "Critical", journeyStage: "Vida en LATAM", microJourney: "Operaciones de Personas", country: "Corporativo", assignee: "Benjamin Vilches", createdDate: "2025-08-06", updatedDate: "2025-10-22", resolvedDate: "2025-10-22", timeInStateDays: 84, description: "Ambiente seguro compensaciones.", history: [{ status: 'Backlog', days: 10 }, { status: 'En Progreso', days: 74 }] },
  { 
    id: "GDI-2310", 
    summary: "Portal de Autoatención RRHH v2", 
    status: "Finalizado", 
    originalStatus: "Listo", 
    priority: "High", 
    journeyStage: "Vida en LATAM", 
    microJourney: "Operación", 
    country: "Chile", 
    assignee: "Edilaine Vascos", 
    createdDate: "2025-06-15", 
    updatedDate: "2025-11-30", 
    resolvedDate: "2025-11-30", 
    timeInStateDays: 168, 
    description: "Rediseño completo del portal de autoatención para colaboradores.",
    history: [
      { status: 'Backlog', days: 15 },
      { status: 'Discovery', days: 40 },
      { status: 'Priorizado', days: 20 },
      { status: 'En Progreso', days: 93 }
    ]
  },
  { 
    id: "GDI-2280", 
    summary: "Digitalización de Legajos - Fase 1", 
    status: "Finalizado", 
    originalStatus: "Listo", 
    priority: "Medium", 
    journeyStage: "Fundamentos Corporativos", 
    microJourney: "Digitalización", 
    country: "Argentina", 
    assignee: "Juan Carlos Cepeda", 
    createdDate: "2025-05-10", 
    updatedDate: "2025-09-15", 
    resolvedDate: "2025-09-15", 
    timeInStateDays: 128, 
    description: "Migración de archivos físicos a repositorio digital centralizado.",
    history: [
      { status: 'Backlog', days: 20 },
      { status: 'Discovery', days: 30 },
      { status: 'En Progreso', days: 78 }
    ]
  },
  { 
    id: "GDI-2350", 
    summary: "Módulo de Feedback Continuo", 
    status: "Finalizado", 
    originalStatus: "Listo", 
    priority: "High", 
    journeyStage: "Vida en LATAM", 
    microJourney: "Crecimiento de Personas", 
    country: "Corporativo", 
    assignee: "Fernanda Santos", 
    createdDate: "2025-07-20", 
    updatedDate: "2025-12-20", 
    resolvedDate: "2025-12-20", 
    timeInStateDays: 153, 
    description: "Implementación de herramienta para feedback 360 en tiempo real.",
    history: [
      { status: 'Backlog', days: 10 },
      { status: 'Discovery', days: 25 },
      { status: 'Priorizado', days: 30 },
      { status: 'En Progreso', days: 88 }
    ]
  },
  { 
    id: "GDI-2390", 
    summary: "Integración API Beneficios Locales", 
    status: "Finalizado", 
    originalStatus: "Listo", 
    priority: "Medium", 
    journeyStage: "Vida en LATAM", 
    microJourney: "Beneficios", 
    country: "Colombia", 
    assignee: "Leonardo Gonzalez", 
    createdDate: "2025-09-01", 
    updatedDate: "2026-02-10", 
    resolvedDate: "2026-02-10", 
    timeInStateDays: 162, 
    description: "Conexión automatizada con proveedores de beneficios locales.",
    history: [
      { status: 'Backlog', days: 5 },
      { status: 'Discovery', days: 20 },
      { status: 'Priorizado', days: 15 },
      { status: 'En Progreso', days: 122 }
    ]
  },

  // ADDING MISSING FROM IMAGE
  { id: "GDI-UNI", summary: "UniFi", status: "En Progreso", originalStatus: "DEVELOPING", priority: "High", journeyStage: "Pre-ingreso a Aterrizaje", microJourney: "Habilitación", country: "Brasil", assignee: "TBD", createdDate: "2025-12-01", updatedDate: "2026-02-23", targetEnd: "2026-04-30", timeInStateDays: 84, description: "Ingreso correcto de información de dirección." },
  { id: "GDI-AVSEC", summary: "AVSEC", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "Medium", journeyStage: "Vida en LATAM", microJourney: "Prog. Carrera", country: "Brasil", assignee: "TBD", createdDate: "2026-01-01", updatedDate: "2026-02-23", targetEnd: "2026-06-15", timeInStateDays: 53, description: "Seguridad aviación civil.", history: [{ status: 'Backlog', days: 10 }] },
  { id: "GDI-BPEXT", summary: "Creación BP externo", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "High", journeyStage: "Fundamentos Corporativos", microJourney: "Fundamentos", country: "Corporativo", assignee: "TBD", createdDate: "2026-01-10", updatedDate: "2026-02-23", targetEnd: "2026-04-30", timeInStateDays: 44, description: "Mejora proceso gestión externos.", history: [{ status: 'Backlog', days: 15 }] },
  { id: "GDI-RHC", summary: "Rediseño RRHH Connect", status: "Priorizado", originalStatus: "PORTFOLIO BACKLOG", priority: "High", journeyStage: "Fundamentos Corporativos", microJourney: "Fundamentos", country: "Corporativo", assignee: "TBD", createdDate: "2026-01-15", updatedDate: "2026-02-23", targetEnd: "2026-03-31", timeInStateDays: 39, description: "Cambiar diseño solución RRHH Connect.", history: [{ status: 'Backlog', days: 10 }] }
];
