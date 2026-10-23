/**
 * DATOS FICTICIOS DEL PROTOTIPO DEL PANEL (/admin y /e/...)
 * ---------------------------------------------------------------
 * Todo lo que hay aquí es inventado para mostrar cómo se vería el sistema.
 * No hay base de datos: los resultados se generan de forma determinista
 * (mismos números en cada build) a partir de una semilla.
 *
 * Los nombres de barrios y las formas de las zonas del mapa son
 * ilustrativos, no límites oficiales.
 */

// ---------- Utilidades ----------

/** Generador pseudoaleatorio con semilla (mulberry32). */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted(r: () => number, weights: number[]) {
  const total = weights.reduce((a, b) => a + b, 0);
  let x = r() * total;
  for (let i = 0; i < weights.length; i++) {
    x -= weights[i];
    if (x <= 0) return i;
  }
  return weights.length - 1;
}

/** Umbral de anonimato: grupos con menos respuestas no se desglosan. */
export const ANON_THRESHOLD = 10;

export const AGE_RANGES = ['16–24', '25–34', '35–49', '50–64', '65+'];
const AGE_WEIGHTS = [0.22, 0.25, 0.27, 0.17, 0.09];

// ---------- Sectores (parroquias y barrios) ----------

export type Parroquia = {
  id: string;
  nombre: string;
  tipo: 'urbana' | 'rural';
  centro: [number, number];
  radio: number;
  barrios: Array<{ id: string; nombre: string; peso: number }>;
};

export const parroquias: Parroquia[] = [
  {
    id: 'santa-rosa', nombre: 'Santa Rosa (centro)', tipo: 'urbana', centro: [-3.4505, -79.9585], radio: 0.012,
    barrios: [
      { id: 'centro', nombre: 'Centro', peso: 9 },
      { id: 'las-orquideas', nombre: 'Las Orquídeas', peso: 6 },
      { id: '9-de-octubre', nombre: '9 de Octubre', peso: 5 },
      { id: 'los-ceibos', nombre: 'Los Ceibos', peso: 4 },
      { id: 'el-paraiso', nombre: 'El Paraíso', peso: 3 },
    ],
  },
  {
    id: 'nuevo-santa-rosa', nombre: 'Nuevo Santa Rosa', tipo: 'urbana', centro: [-3.4275, -79.9765], radio: 0.011,
    barrios: [
      { id: 'ciudadela-nueva', nombre: 'Ciudadela Nueva', peso: 5 },
      { id: 'los-laureles', nombre: 'Los Laureles', peso: 4 },
      { id: 'brisas-del-mar', nombre: 'Brisas del Mar', peso: 3 },
    ],
  },
  {
    id: 'puerto-jeli', nombre: 'Puerto Jelí', tipo: 'urbana', centro: [-3.4085, -80.0045], radio: 0.012,
    barrios: [
      { id: 'malecon', nombre: 'Malecón', peso: 3 },
      { id: 'los-pescadores', nombre: 'Los Pescadores', peso: 2 },
    ],
  },
  {
    id: 'jambeli', nombre: 'Jambelí', tipo: 'rural', centro: [-3.2985, -80.0385], radio: 0.022,
    barrios: [
      { id: 'isla-jambeli', nombre: 'Isla Jambelí', peso: 1.2 },
      { id: 'costa-rica', nombre: 'Costa Rica', peso: 0.35 },
    ],
  },
  {
    id: 'bellavista', nombre: 'Bellavista', tipo: 'rural', centro: [-3.5085, -79.8805], radio: 0.026,
    barrios: [
      { id: 'centro-bellavista', nombre: 'Centro Bellavista', peso: 4 },
      { id: 'la-florida', nombre: 'La Florida', peso: 2 },
      { id: 'el-recreo', nombre: 'El Recreo', peso: 1.4 },
    ],
  },
  {
    id: 'la-avanzada', nombre: 'La Avanzada', tipo: 'rural', centro: [-3.4905, -79.9355], radio: 0.022,
    barrios: [
      { id: 'centro-la-avanzada', nombre: 'Centro La Avanzada', peso: 2.5 },
      { id: 'san-vicente', nombre: 'San Vicente', peso: 1.1 },
    ],
  },
  {
    id: 'bellamaria', nombre: 'Bellamaría', tipo: 'rural', centro: [-3.5545, -79.9555], radio: 0.024,
    barrios: [
      { id: 'centro-bellamaria', nombre: 'Centro Bellamaría', peso: 1.8 },
      { id: 'el-guayacan', nombre: 'El Guayacán', peso: 0.3 },
    ],
  },
  {
    id: 'torata', nombre: 'Torata', tipo: 'rural', centro: [-3.6185, -79.9705], radio: 0.025,
    barrios: [
      { id: 'centro-torata', nombre: 'Centro Torata', peso: 1.6 },
      { id: 'las-palmas', nombre: 'Las Palmas', peso: 0.9 },
    ],
  },
  {
    id: 'san-antonio', nombre: 'San Antonio', tipo: 'rural', centro: [-3.4645, -79.8655], radio: 0.022,
    barrios: [
      { id: 'centro-san-antonio', nombre: 'Centro San Antonio', peso: 1.9 },
      { id: 'la-union', nombre: 'La Unión', peso: 0.8 },
    ],
  },
  {
    id: 'victoria', nombre: 'Victoria', tipo: 'rural', centro: [-3.5885, -79.8705], radio: 0.026,
    barrios: [
      { id: 'centro-victoria', nombre: 'Centro Victoria', peso: 1.5 },
      { id: 'el-porvenir', nombre: 'El Porvenir', peso: 0.4 },
    ],
  },
];

/** Lista plana de barrios con su parroquia (índice = id numérico de sector). */
export const sectores = parroquias.flatMap((p) =>
  p.barrios.map((b) => ({ id: `${p.id}/${b.id}`, parroquiaId: p.id, parroquia: p.nombre, barrio: b.nombre, peso: b.peso })),
);

/** Polígono irregular ilustrativo alrededor del centro de cada parroquia (GeoJSON). */
export function parroquiaGeoJSON() {
  return {
    type: 'FeatureCollection' as const,
    features: parroquias.map((p, i) => {
      const r = rng(1000 + i);
      const n = 9;
      const coords: [number, number][] = [];
      for (let k = 0; k < n; k++) {
        const ang = (k / n) * Math.PI * 2;
        const rad = p.radio * (0.78 + r() * 0.4);
        coords.push([p.centro[1] + Math.cos(ang) * rad * 1.15, p.centro[0] + Math.sin(ang) * rad]);
      }
      coords.push(coords[0]);
      return {
        type: 'Feature' as const,
        properties: { id: p.id, nombre: p.nombre },
        geometry: { type: 'Polygon' as const, coordinates: [coords] },
      };
    }),
  };
}

// ---------- Encuestas ----------

export type QType = 'unica' | 'multiple' | 'escala' | 'sino' | 'texto';
export const Q_TYPE_LABEL: Record<QType, string> = {
  unica: 'Opción única',
  multiple: 'Opción múltiple',
  escala: 'Escala 1–5',
  sino: 'Sí / No',
  texto: 'Texto abierto',
};

export type Question = {
  id: string;
  tipo: QType;
  enunciado: string;
  opciones?: string[];
  /** Preferencias base para generar resultados ficticios. */
  pesos?: number[];
  obligatoria: boolean;
};

export type SurveyStatus = 'borrador' | 'activa' | 'pausada' | 'cerrada';
export const STATUS_LABEL: Record<SurveyStatus, string> = {
  borrador: 'Borrador',
  activa: 'Activa',
  pausada: 'Pausada',
  cerrada: 'Cerrada',
};

export type Survey = {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  estado: SurveyStatus;
  abre: string;
  cierra: string;
  creadaPor: string;
  actualizada: string;
  conPassword: boolean;
  mensajeFinal: string;
  preguntas: Question[];
  /** Tamaño aproximado de la muestra ficticia (0 = sin respuestas). */
  escala: number;
  seed: number;
};

export function optionsOf(q: Question) {
  if (q.tipo === 'sino') return ['Sí', 'No'];
  if (q.tipo === 'escala') return ['1', '2', '3', '4', '5'];
  return q.opciones ?? [];
}

export const surveys: Survey[] = [
  {
    id: 'enc-001',
    slug: 'prioridades-barrio',
    titulo: 'Prioridades de tu barrio',
    descripcion: 'Cuéntanos qué es lo más urgente en tu barrio para construir juntos las propuestas.',
    estado: 'activa',
    abre: '2026-10-08',
    cierra: '2026-11-15',
    creadaPor: 'María Fernanda Ruiz',
    actualizada: '2026-10-21',
    conPassword: false,
    mensajeFinal: '¡Gracias! Tu respuesta nos ayuda a conocer mejor las necesidades de Santa Rosa.',
    escala: 1650,
    seed: 11,
    preguntas: [
      {
        id: 'p1', tipo: 'unica', obligatoria: true,
        enunciado: '¿Cuál es el principal problema de tu barrio?',
        opciones: ['Agua potable', 'Vías y calles', 'Seguridad', 'Empleo', 'Alumbrado público', 'Recolección de basura'],
        pesos: [24, 22, 21, 15, 10, 8],
      },
      {
        id: 'p2', tipo: 'escala', obligatoria: true,
        enunciado: '¿Cómo calificas el estado de las calles de tu sector?',
        pesos: [26, 30, 25, 13, 6],
      },
      {
        id: 'p3', tipo: 'texto', obligatoria: false,
        enunciado: '¿Qué obra le pedirías a la próxima administración para tu barrio?',
      },
    ],
  },
  {
    id: 'enc-002',
    slug: 'ejes-plan',
    titulo: '¿Qué propuesta es más urgente?',
    descripcion: 'Ayúdanos a priorizar los cuatro ejes del plan de gobierno.',
    estado: 'activa',
    abre: '2026-10-14',
    cierra: '2026-11-30',
    creadaPor: 'Carlos Aguilar',
    actualizada: '2026-10-22',
    conPassword: false,
    mensajeFinal: 'Gracias por ayudarnos a priorizar. ¡Seguimos escuchando!',
    escala: 980,
    seed: 23,
    preguntas: [
      {
        id: 'p1', tipo: 'unica', obligatoria: true,
        enunciado: '¿Cuál de estos ejes debería ser la prioridad número uno?',
        opciones: ['Santa Rosa segura', 'Empleo y producción', 'Servicios básicos y obras', 'Familia, juventud y bienestar'],
        pesos: [31, 27, 29, 13],
      },
      {
        id: 'p2', tipo: 'multiple', obligatoria: true,
        enunciado: '¿Qué acciones te gustaría ver primero? (elige hasta 3)',
        opciones: ['Más iluminación', 'Ferias de emprendimiento', 'Agua potable', 'Escuelas deportivas', 'Asfaltado de vías', 'Atención a adultos mayores'],
        pesos: [22, 14, 24, 12, 20, 8],
      },
      {
        id: 'p3', tipo: 'escala', obligatoria: true,
        enunciado: '¿Qué tan optimista te sientes sobre el futuro de Santa Rosa?',
        pesos: [8, 14, 30, 30, 18],
      },
    ],
  },
  {
    id: 'enc-003',
    slug: 'bienestar-animal',
    titulo: 'Jornadas de bienestar animal',
    descripcion: '¿Quieres más jornadas de vacunación, esterilización y adopción en tu sector?',
    estado: 'cerrada',
    abre: '2026-09-20',
    cierra: '2026-10-17',
    creadaPor: 'María Fernanda Ruiz',
    actualizada: '2026-10-17',
    conPassword: false,
    mensajeFinal: '¡Gracias! Pronto anunciaremos las próximas jornadas.',
    escala: 720,
    seed: 37,
    preguntas: [
      {
        id: 'p1', tipo: 'sino', obligatoria: true,
        enunciado: '¿Asistirías a una jornada de bienestar animal en tu sector?',
        pesos: [86, 14],
      },
      {
        id: 'p2', tipo: 'multiple', obligatoria: true,
        enunciado: '¿Qué servicios necesitas para tus mascotas?',
        opciones: ['Vacunación', 'Esterilización', 'Desparasitación', 'Adopción', 'Consulta general'],
        pesos: [30, 26, 20, 10, 14],
      },
    ],
  },
  {
    id: 'enc-004',
    slug: 'seguridad-sector',
    titulo: 'Seguridad en tu sector',
    descripcion: 'Percepción de seguridad por barrio.',
    estado: 'pausada',
    abre: '2026-10-01',
    cierra: '2026-11-05',
    creadaPor: 'Carlos Aguilar',
    actualizada: '2026-10-19',
    conPassword: true,
    mensajeFinal: 'Gracias por tu respuesta.',
    escala: 410,
    seed: 41,
    preguntas: [
      {
        id: 'p1', tipo: 'escala', obligatoria: true,
        enunciado: '¿Qué tan seguro te sientes caminando de noche por tu barrio?',
        pesos: [28, 31, 24, 12, 5],
      },
      {
        id: 'p2', tipo: 'unica', obligatoria: true,
        enunciado: '¿Qué ayudaría más a la seguridad de tu sector?',
        opciones: ['Más iluminación', 'Patrullaje', 'Cámaras', 'Brigadas barriales', 'Recuperar espacios públicos'],
        pesos: [30, 26, 18, 14, 12],
      },
    ],
  },
  {
    id: 'enc-005',
    slug: 'juventud-deporte',
    titulo: 'Juventud y deporte',
    descripcion: 'Ideas de las y los jóvenes para canchas, escuelas deportivas y cultura.',
    estado: 'borrador',
    abre: '2026-11-01',
    cierra: '2026-11-30',
    creadaPor: 'Andrea Molina',
    actualizada: '2026-10-22',
    conPassword: false,
    mensajeFinal: '¡Gracias por participar!',
    escala: 0,
    seed: 53,
    preguntas: [
      {
        id: 'p1', tipo: 'multiple', obligatoria: true,
        enunciado: '¿Qué disciplinas te gustaría que se enseñen en tu barrio?',
        opciones: ['Fútbol', 'Vóley', 'Básquet', 'Danza', 'Música', 'Artes marciales'],
      },
      { id: 'p2', tipo: 'texto', obligatoria: false, enunciado: '¿Qué espacio necesita tu barrio para los jóvenes?' },
    ],
  },
];

// ---------- Resultados ficticios ----------

/** Fila agregada: [índice de sector, índice de edad, índice de opción, conteo]. */
export type Agg = [number, number, number, number];

export type SurveyResults = {
  total: number;
  byQuestion: Record<string, Agg[]>;
  /** Participaciones por [sector, edad]. */
  participacion: Agg[];
  texts: Array<{ q: string; sector: number; texto: string; hora: string }>;
  timeline: Array<{ fecha: string; n: number }>;
};

const TEXT_POOL = [
  'Asfaltar la calle principal, en invierno se hace lodo.',
  'Un parque con juegos para los niños.',
  'Arreglar el alcantarillado, se inunda cuando llueve.',
  'Más luminarias en la entrada del barrio.',
  'Un dispensario médico cerca.',
  'Que pase el recolector de basura más seguido.',
  'Una cancha techada para los jóvenes.',
  'Agua potable todos los días, no solo dos veces por semana.',
  'Un UPC o más patrullaje en las noches.',
  'Reparar el puente peatonal.',
  'Veredas para que los adultos mayores puedan caminar.',
  'Capacitaciones para emprendedores.',
];

const resultsCache = new Map<string, SurveyResults>();

export function surveyResults(s: Survey): SurveyResults {
  const cached = resultsCache.get(s.id);
  if (cached) return cached;

  const r = rng(s.seed);
  const totalPeso = sectores.reduce((a, b) => a + b.peso, 0);
  const participacion: Agg[] = [];
  const byQuestion: Record<string, Agg[]> = {};
  const texts: SurveyResults['texts'] = [];
  s.preguntas.forEach((q) => (byQuestion[q.id] = []));

  let total = 0;
  sectores.forEach((sec, si) => {
    // Sesgo por sector para que el mapa tenga variación
    const bias = optionsBias(r, s.preguntas);
    AGE_RANGES.forEach((_, ai) => {
      if (!s.escala) return;
      const n = Math.round((s.escala * sec.peso * AGE_WEIGHTS[ai] * (0.75 + r() * 0.5)) / totalPeso);
      if (n <= 0) return;
      total += n;
      participacion.push([si, ai, 0, n]);

      s.preguntas.forEach((q, qi) => {
        if (q.tipo === 'texto') {
          // Pocas respuestas abiertas por barrio, repartidas entre sectores
          const already = texts.filter((t) => t.sector === si).length;
          const k = Math.min(4 - already, Math.round(n * 0.08));
          for (let t = 0; t < k && texts.length < 60; t++) {
            texts.push({ q: q.id, sector: si, texto: TEXT_POOL[Math.floor(r() * TEXT_POOL.length)], hora: randomHour(r) });
          }
          return;
        }
        const opts = optionsOf(q);
        const weights = opts.map((_, oi) => (q.pesos?.[oi] ?? 10) * bias[qi][oi]);
        const counts = new Array(opts.length).fill(0);
        const picks = q.tipo === 'multiple' ? 2 : 1;
        for (let v = 0; v < n; v++) {
          const chosen = new Set<number>();
          for (let p = 0; p < picks; p++) chosen.add(pickWeighted(r, weights));
          chosen.forEach((c) => counts[c]++);
        }
        counts.forEach((c, oi) => c > 0 && byQuestion[q.id].push([si, ai, oi, c]));
      });
    });
  });

  const timeline: SurveyResults['timeline'] = [];
  if (total) {
    const start = new Date(`${s.abre}T00:00:00Z`);
    const endIso = s.estado === 'activa' ? '2026-10-23' : s.estado === 'pausada' ? s.actualizada : s.cierra;
    const end = new Date(`${endIso}T00:00:00Z`);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
    const w = Array.from({ length: days }, (_, i) => 0.6 + r() + (i < 3 ? 1.2 : 0) + Math.sin(i / 2) * 0.3);
    const sum = w.reduce((a, b) => a + b, 0);
    let acc = 0;
    w.forEach((x, i) => {
      const n = i === days - 1 ? total - acc : Math.round((x / sum) * total);
      acc += n;
      const d = new Date(start.getTime() + i * 86400000);
      timeline.push({ fecha: d.toISOString().slice(0, 10), n: Math.max(0, n) });
    });
  }

  const result = { total, byQuestion, participacion, texts, timeline };
  resultsCache.set(s.id, result);
  return result;
}

function optionsBias(r: () => number, qs: Question[]) {
  return qs.map((q) => optionsOf(q).map(() => 0.6 + r() * 0.8));
}

function randomHour(r: () => number) {
  const d = 10 + Math.floor(r() * 13);
  const h = 7 + Math.floor(r() * 14);
  return `2026-10-${String(d).padStart(2, '0')} ${String(h).padStart(2, '0')}:00`;
}

// ---------- Reportes de campo ----------

export type FieldType = 'visita' | 'problema' | 'queja' | 'apoyo' | 'otro';
export const FIELD_TYPE_LABEL: Record<FieldType, string> = {
  visita: 'Visita',
  problema: 'Problema comunitario',
  queja: 'Queja',
  apoyo: 'Apoyo',
  otro: 'Otro',
};
export const FIELD_TYPE_COLOR: Record<FieldType, string> = {
  visita: '#2563eb',
  problema: '#d97706',
  queja: '#dc2626',
  apoyo: '#16a34a',
  otro: '#6b7280',
};

const NOTAS: Record<FieldType, string[]> = {
  visita: ['Recorrido casa por casa, buena acogida.', 'Conversación con la directiva barrial.', 'Visita a comerciantes del mercado.'],
  problema: ['Calle sin asfaltar, se inunda con la lluvia.', 'Falta de alumbrado en la esquina del parque.', 'Alcantarilla tapada frente a la escuela.'],
  queja: ['El recolector no pasa hace una semana.', 'Cortes de agua frecuentes.', 'Inseguridad en la parada de buses.'],
  apoyo: ['Vecinos ofrecen su casa para reunión.', 'Grupo de jóvenes quiere sumarse como voluntarios.', 'Comerciantes interesados en la feria.'],
  otro: ['Solicitan información sobre la jornada de mascotas.', 'Piden calendario de actividades.'],
};

export type FieldReport = {
  id: string;
  fecha: string;
  usuario: string;
  sector: number;
  tipo: FieldType;
  receptividad: number;
  nota: string;
  lat: number | null;
  lng: number | null;
  foto: boolean;
};

export const fieldReports: FieldReport[] = (() => {
  const r = rng(77);
  const brigadistas = ['Luis Pacheco', 'Diana Cevallos', 'Jorge Ordóñez', 'Karla Romero'];
  const tipos = Object.keys(FIELD_TYPE_LABEL) as FieldType[];
  const list: FieldReport[] = [];
  for (let i = 0; i < 64; i++) {
    const si = pickWeighted(r, sectores.map((s) => s.peso));
    const par = parroquias.find((p) => p.id === sectores[si].parroquiaId)!;
    const tipo = tipos[pickWeighted(r, [34, 22, 14, 22, 8])];
    const sinGps = r() < 0.08;
    const day = 23 - Math.floor(r() * 21);
    list.push({
      id: `rc-${String(i + 1).padStart(3, '0')}`,
      fecha: `2026-10-${String(day).padStart(2, '0')} ${String(8 + Math.floor(r() * 10)).padStart(2, '0')}:${String(Math.floor(r() * 60)).padStart(2, '0')}`,
      usuario: brigadistas[Math.floor(r() * brigadistas.length)],
      sector: si,
      tipo,
      receptividad: Math.min(5, Math.max(1, Math.round(2.6 + r() * 2.6 + (tipo === 'apoyo' ? 0.8 : tipo === 'queja' ? -1 : 0)))),
      nota: NOTAS[tipo][Math.floor(r() * NOTAS[tipo].length)],
      lat: sinGps ? null : par.centro[0] + (r() - 0.5) * par.radio * 1.2,
      lng: sinGps ? null : par.centro[1] + (r() - 0.5) * par.radio * 1.4,
      foto: r() < 0.4,
    });
  }
  return list.sort((a, b) => b.fecha.localeCompare(a.fecha));
})();

// ---------- Usuarios ----------

export type Role = 'admin' | 'analista' | 'campo' | 'lector';
export const ROLE_LABEL: Record<Role, string> = { admin: 'Administrador', analista: 'Analista', campo: 'Campo', lector: 'Lector' };
export const ROLE_DESC: Record<Role, string> = {
  admin: 'Todo, incluidos usuarios y ajustes',
  analista: 'Crea encuestas y ve resultados',
  campo: 'Solo crea y ve sus reportes de campo',
  lector: 'Solo ve resultados y mapa',
};

export const users = [
  { nombre: 'Andrea Molina', correo: 'andrea.molina@ejemplo.ec', rol: 'admin' as Role, mfa: true, ultimo: '2026-10-23 09:12', activo: true },
  { nombre: 'María Fernanda Ruiz', correo: 'mf.ruiz@ejemplo.ec', rol: 'analista' as Role, mfa: true, ultimo: '2026-10-23 08:40', activo: true },
  { nombre: 'Carlos Aguilar', correo: 'c.aguilar@ejemplo.ec', rol: 'analista' as Role, mfa: true, ultimo: '2026-10-22 18:05', activo: true },
  { nombre: 'Luis Pacheco', correo: 'luis.pacheco@ejemplo.ec', rol: 'campo' as Role, mfa: true, ultimo: '2026-10-23 10:31', activo: true },
  { nombre: 'Diana Cevallos', correo: 'diana.c@ejemplo.ec', rol: 'campo' as Role, mfa: false, ultimo: '2026-10-22 16:22', activo: true },
  { nombre: 'Jorge Ordóñez', correo: 'jordonez@ejemplo.ec', rol: 'campo' as Role, mfa: true, ultimo: '2026-10-21 11:47', activo: true },
  { nombre: 'Karla Romero', correo: 'karla.romero@ejemplo.ec', rol: 'campo' as Role, mfa: true, ultimo: '2026-10-23 07:58', activo: true },
  { nombre: 'Pedro Zambrano', correo: 'p.zambrano@ejemplo.ec', rol: 'lector' as Role, mfa: false, ultimo: '2026-10-15 12:10', activo: false },
];

/** Usuario que "ha iniciado sesión" en el prototipo. */
export const currentUser = users[0];

export const audit = [
  { fecha: '2026-10-23 10:31', usuario: 'Luis Pacheco', accion: 'creó un reporte de campo', entidad: 'Centro Bellavista' },
  { fecha: '2026-10-23 09:20', usuario: 'Andrea Molina', accion: 'exportó resultados', entidad: 'Prioridades de tu barrio' },
  { fecha: '2026-10-22 18:05', usuario: 'Carlos Aguilar', accion: 'editó la encuesta', entidad: '¿Qué propuesta es más urgente?' },
  { fecha: '2026-10-22 16:22', usuario: 'Diana Cevallos', accion: 'importó 18 reportes', entidad: 'reportes_campo.xlsx' },
  { fecha: '2026-10-22 11:02', usuario: 'Andrea Molina', accion: 'invitó a', entidad: 'Karla Romero (Campo)' },
  { fecha: '2026-10-19 09:44', usuario: 'Carlos Aguilar', accion: 'pausó la encuesta', entidad: 'Seguridad en tu sector' },
];

// ---------- Ajustes ----------

export const settings = {
  silencioActivo: false,
  silencioDesde: '2027-02-12T00:00',
  silencioHasta: '2027-02-16T17:00',
  zona: 'America/Guayaquil',
};

// ---------- Helpers ----------

export function formatNum(n: number) {
  return n.toLocaleString('es-EC');
}

export function formatShortDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', timeZone: 'UTC' });
}
