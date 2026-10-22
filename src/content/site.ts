/**
 * CONTENIDO CENTRAL DEL SITIO
 * ---------------------------------------------------------------
 * Todo el texto, datos, enlaces y fotos del sitio se editan aquí.
 * Los componentes solo leen este archivo: no hace falta tocarlos
 * para actualizar contenido. Ver README.md para más detalle.
 *
 * Regla editorial: no publicar datos, cifras, enlaces o fotos
 * que no estén verificados y autorizados.
 */
import type { ImageMetadata } from 'astro';

import fotoHero from '../assets/fotos/hero-conversacion.jpg';
import fotoRetrato from '../assets/fotos/retrato-caminando.jpg';
import fotoAbrazo from '../assets/fotos/abrazo.jpg';
import fotoJovenes from '../assets/fotos/jovenes.jpg';
import fotoGrupo from '../assets/fotos/grupo-barrio.jpg';

// ---------- Tipos ----------

export type Source = { label: string; url: string; publishedAt?: string };

export type TimelineItem = {
  id: string;
  yearLabel: string;
  title: string;
  summary: string;
  note?: string;
  sources: Source[];
  verified: boolean;
};

export type RecordCategory =
  | 'Gestión municipal'
  | 'Participación ciudadana'
  | 'Normativa y documentos'
  | 'Actividades públicas';

export type RecordItem = {
  id: string;
  title: string;
  date: string;
  category: RecordCategory;
  label: string;
  roleAtTime?: string;
  summary: string;
  attributionNote?: string;
  image?: ImageMetadata;
  sources: Source[];
  updatedAt: string;
  published: boolean;
};

export type Metric = {
  label: string;
  value: number;
  unit?: string;
  platform?: string;
  periodStart?: string;
  periodEnd?: string;
  asOf: string;
  source: string;
  methodology?: string;
  verified: boolean;
};

export type Photo = { src: ImageMetadata; alt: string };

export type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  url: string;
  summary: string;
  image?: Photo;
  verified: boolean;
};

export type SocialLink = { platform: string; handle: string; url: string; verified: boolean };

// ---------- Estado editorial ----------

export const status = {
  /** Mientras sea `true`: noindex, etiquetas de "borrador" y formulario de demostración. */
  draft: true,
  identityConfirmed: false,
  candidatureConfirmed: false,
  brandApproved: false,
};

export const seo = {
  title: 'Ligia Naula · Santa Rosa, El Oro',
  description:
    'Trayectoria, participación y gestión pública de Ligia Naula en Santa Rosa, El Oro, Ecuador.',
};

// ---------- Fotografías ----------
// Reemplaza los archivos en src/assets/fotos/ o cambia los imports de arriba.
// Los textos alternativos deben describir lo que realmente se ve.

export const photos = {
  hero: { src: fotoHero, alt: 'Ligia Naula conversa con un vecino sentado a la puerta de su casa.' },
  portrait: { src: fotoRetrato, alt: 'Retrato de Ligia Naula caminando al aire libre, sonriente.' },
  hug: { src: fotoAbrazo, alt: 'Ligia Naula, de espaldas, recibe el abrazo de una vecina sonriente.' },
  youth: { src: fotoJovenes, alt: 'Ligia Naula junto a dos jóvenes con el pulgar arriba en una calle.' },
  group: { src: fotoGrupo, alt: 'Ligia Naula con un grupo numeroso de vecinas y vecinos en un barrio.' },
} satisfies Record<string, Photo>;

// ---------- Navegación ----------

export const nav = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'conoce-a-ligia', label: 'Conoce a Ligia' },
  { id: 'trayectoria', label: 'Trayectoria y gestión' },
  { id: 'plan-de-gobierno', label: 'Plan de gobierno' },
  { id: 'actualidad', label: 'Actualidad' },
  { id: 'contacto', label: 'Contacto' },
];

// ---------- Inicio ----------

export const hero = {
  eyebrow: 'Santa Rosa · El Oro · Ecuador',
  title: 'Ligia Naula',
  subtitle: 'Trayectoria, participación y gestión pública en Santa Rosa.',
  text: 'Un espacio para conocer la trayectoria de Ligia Naula, consultar información sobre su experiencia pública y acceder a novedades y documentos de interés para la ciudadanía.',
  primary: { label: 'Conoce su trayectoria', href: '#trayectoria' },
  secondary: { label: 'Sobre Ligia', href: '#conoce-a-ligia' },
  updatingLabel: 'Información en proceso de actualización',
};

export const intro = {
  title: 'Conoce la información de primera mano',
  text: 'Explora antecedentes públicos, materiales de gestión y actualizaciones organizadas para facilitar su consulta.',
  cards: [
    { num: '01', label: 'Trayectoria', href: '#trayectoria', photo: photos.group },
    { num: '02', label: 'Plan de gobierno', href: '#plan-de-gobierno', photo: photos.youth },
    { num: '03', label: 'Actualidad', href: '#actualidad', photo: photos.hug },
  ],
};

// ---------- Conoce a Ligia ----------

export const about = {
  title: 'Conoce a Ligia',
  lead: 'Un recorrido por su experiencia y participación en la vida pública de Santa Rosa.',
  /** Sustituir por la biografía aprobada cuando exista. */
  officialBiography: undefined as string | undefined,
  provisionalText:
    'Ligia Naula ha participado en la administración y la vida pública del cantón Santa Rosa. En este espacio reuniremos su perfil biográfico, formación, experiencia y principales hitos, respaldados con información verificable.',
  /** `value: undefined` = pendiente. En producción (draft=false) los pendientes se ocultan. */
  bioFields: [
    { label: 'Lugar de origen', value: undefined as string | undefined },
    { label: 'Formación académica', value: undefined as string | undefined },
    { label: 'Experiencia profesional', value: undefined as string | undefined },
    { label: 'Trayectoria comunitaria', value: undefined as string | undefined },
  ],
  timelineTitle: 'Hitos de su trayectoria pública',
  timelineNote: 'La cronología se actualizará a partir de documentos oficiales y materiales verificados.',
};

// ---------- Fuentes ----------

export const sources = {
  ame: {
    label: 'Asociación de Municipalidades Ecuatorianas (AME)',
    url: 'https://repositorio.ame.gob.ec/santa-rosa-recibio-la-lideresas-la-regional-7/',
  },
  asamblea: {
    label: 'Asamblea Nacional del Ecuador — nota del 16 de noviembre de 2014',
    url: 'https://www.asambleanacional.gob.ec/es/contenido/parroquia-la-avanzada-celebro-aniversario',
    publishedAt: '2014-11-16',
  },
  acta2019: {
    label: 'GAD Municipal de Santa Rosa — acta de asamblea ciudadana (PDF)',
    url: 'https://www.santarosa.gob.ec/FASES_RENDICION2020/3.%20ACTAS%20EQUIPO%20TECNICO%2C%20AUTORIDADES%20Y%20CIUDADANIA.pdf',
  },
  gaceta03: {
    label: 'Gaceta Municipal de Santa Rosa No. 03 (PDF)',
    url: 'https://www.santarosa.gob.ec/phocadownload/A%C3%B1o%204/Gaceta%20No.%2003.pdf',
  },
  ordenanzaSocorro: {
    label: 'GAD Municipal de Santa Rosa — ordenanza de prevención y socorro (PDF)',
    url: 'https://santarosa.gob.ec/phocadownload/Ordenanzas/2019/4.-%20ORDENANZA%20SUSTITUTIVA%20QUE%20REGULA%20LA%20GESTION%20DE%20LOS%20SERVICIOS%20DE%20PREVENCION.pdf',
  },
  notioro: {
    label: 'Notioro — referencia periodística (fuente secundaria)',
    url: 'https://notioro.blogspot.com/2014_05_16_archive.html?m=0',
  },
} satisfies Record<string, Source>;

export const timeline: TimelineItem[] = [
  {
    id: 'vicealcaldia-2014',
    yearLabel: '2014',
    title: 'Vicealcaldesa de Santa Rosa',
    summary: 'En 2014 se informó su designación como vicealcaldesa del cantón Santa Rosa.',
    note: 'Fuente secundaria; se cotejará con el acta oficial de designación.',
    sources: [sources.notioro, sources.ame],
    verified: false,
  },
  {
    id: 'lideresas-region-7',
    yearLabel: 'Durante su vicealcaldía',
    title: 'Participación como vicealcaldesa en espacios regionales',
    summary:
      'La Asociación de Municipalidades Ecuatorianas la identifica como vicealcaldesa de Santa Rosa en un encuentro de lideresas de la Región 7.',
    note: 'La fecha exacta del encuentro está pendiente de verificación documental.',
    sources: [sources.ame],
    verified: false,
  },
  {
    id: 'alcaldia-2019',
    yearLabel: '2019',
    title: 'Ejercicio de la Alcaldía de Santa Rosa',
    summary:
      'Documentos oficiales del GAD Municipal la identifican como alcaldesa del cantón en enero y febrero de 2019.',
    sources: [sources.acta2019, sources.gaceta03, sources.ordenanzaSocorro],
    verified: false,
  },
];

// ---------- Trayectoria y gestión ----------

export const records = {
  title: 'Trayectoria y gestión',
  lead: 'Información y documentos para conocer su participación pública.',
  intro:
    'Esta sección reúne hitos, actividades y actuaciones documentadas. Cada ficha distingue el cargo ejercido, el contexto, la fecha y las fuentes disponibles.',
  filters: [
    'Todos',
    'Gestión municipal',
    'Participación ciudadana',
    'Normativa y documentos',
    'Actividades públicas',
  ] as const,
  emptyCategory: 'Todavía no hay registros publicados en esta categoría.',
  items: [
    {
      id: 'asamblea-participacion-2019',
      title: 'Asamblea cantonal de participación ciudadana',
      date: '2019-01-23',
      category: 'Participación ciudadana',
      label: 'Registro documental',
      roleAtTime: 'Alcaldesa de Santa Rosa',
      summary:
        'Un acta del GAD Municipal registra la participación de Ligia Naula, identificada como alcaldesa, en una asamblea relacionada con la conformación del sistema de participación ciudadana y el consejo cantonal de planificación.',
      attributionNote:
        'El acta documenta la participación en la asamblea; no atribuye a una sola persona los acuerdos alcanzados.',
      sources: [sources.acta2019],
      updatedAt: '2026-10-22',
      published: true,
    },
    {
      id: 'ordenanza-violencia-mujeres-2019',
      title: 'Ordenanza para prevenir y erradicar la violencia contra las mujeres',
      date: '2019-01-09',
      category: 'Normativa y documentos',
      label: 'Documento oficial',
      roleAtTime: 'Alcaldesa de Santa Rosa',
      summary:
        'La gaceta municipal documenta la sanción y orden de promulgación de esta ordenanza por Ligia Naula, en calidad de alcaldesa. Este registro no implica atribuir individualmente la elaboración o aprobación de toda la normativa.',
      sources: [sources.gaceta03],
      updatedAt: '2026-10-22',
      published: true,
    },
    {
      id: 'ordenanza-prevencion-socorro-2019',
      title: 'Normativa para la gestión de servicios de prevención y socorro',
      date: '2019-02-15',
      category: 'Gestión municipal',
      label: 'Documento oficial',
      roleAtTime: 'Alcaldesa de Santa Rosa',
      summary:
        'Una ordenanza municipal de febrero de 2019 identifica a Ligia Naula como alcaldesa y documenta una regulación relacionada con los servicios de prevención, protección, socorro y extinción de incendios.',
      attributionNote:
        'La ordenanza es un acto del concejo municipal; el registro no atribuye su contenido a una sola persona.',
      sources: [sources.ordenanzaSocorro],
      updatedAt: '2026-10-22',
      published: true,
    },
  ] satisfies RecordItem[],
};

/** Métricas verificadas. Vacío = el módulo "La información en cifras" no se muestra. */
export const metrics: Metric[] = [];

// ---------- Plan de gobierno ----------

export const plan = {
  title: 'Plan de gobierno',
  lead: 'Un espacio para consultar el documento cuando se encuentre disponible.',
  text: 'El plan de gobierno aún no ha sido facilitado para su publicación en este sitio. Cuando exista una versión oficial aprobada, aquí podrás consultar sus ejes, objetivos, acciones y el documento completo.',
  statusLabel: 'Documento pendiente de publicación',
  downloadLabel: 'Descargar plan de gobierno (PDF)',
  /** Rellenar cuando exista el documento aprobado. Mientras sea `undefined`, se muestra el esquema pendiente. */
  approved: undefined as
    | { title: string; version: string; date: string; pdfUrl: string; axes: Array<{ title: string; summary: string }> }
    | undefined,
  placeholderAxes: ['Eje 01', 'Eje 02', 'Eje 03', 'Eje 04'],
};

// ---------- Actualidad ----------

export const news = {
  title: 'Actualidad y actividades',
  lead: 'Noticias, publicaciones y materiales recientes.',
  text: 'En esta sección se organizarán las novedades públicas y contenidos autorizados, con fecha, contexto y acceso a su fuente original.',
  empty: 'Próximamente encontrarás aquí las últimas publicaciones y actividades.',
  /** Solo se muestran las publicaciones con `verified: true`. */
  posts: [] as Post[],
  socialTitle: 'Redes sociales',
  socialEmpty: 'Las cuentas oficiales se publicarán aquí una vez verificadas.',
  /** Solo se muestran los enlaces con `verified: true`. */
  socialLinks: [] as SocialLink[],
  digitalMetricsNote:
    'Las cifras de presencia digital miden actividad en redes sociales, no intención de voto.',
  /** Métricas digitales verificadas (seguidores, reproducciones...). Vacío = módulo oculto. */
  digitalMetrics: [] as Metric[],
};

// ---------- Contacto ----------

export const contact = {
  title: 'Contacto y canales de información',
  lead: 'Consulta los canales verificados y envía tus consultas cuando estén disponibles.',
  text: 'Aquí se publicarán los medios oficiales habilitados para consultas y solicitudes de información.',
  channels: [
    { icon: 'mail', label: 'Correo electrónico', value: undefined as string | undefined, href: undefined as string | undefined },
    { icon: 'phone', label: 'WhatsApp', value: undefined as string | undefined, href: undefined as string | undefined },
    { icon: 'share', label: 'Redes sociales', value: undefined as string | undefined, href: undefined as string | undefined, pending: 'pendientes de verificación' },
    { icon: 'pin', label: 'Oficina o ubicación de atención', value: undefined as string | undefined, href: undefined as string | undefined },
  ],
  subjects: ['Información general', 'Consulta sobre contenidos', 'Prensa', 'Otro'],
  /** URL de un endpoint seguro. Mientras sea `undefined`, el formulario es de demostración y no envía datos. */
  formEndpoint: undefined as string | undefined,
  demoMessage: 'Formulario de demostración. El envío estará disponible cuando se habilite un canal seguro.',
};

// ---------- Footer ----------

export const footer = {
  brand: 'Ligia Naula',
  text: 'Información sobre trayectoria, gestión pública y actualidad.',
  note: 'Sitio informativo en desarrollo.',
};

// ---------- Utilidades ----------

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
