/**
 * CONTENIDO CENTRAL DEL SITIO
 * ---------------------------------------------------------------
 * Todo el texto, datos, enlaces y fotos del sitio se editan aquí.
 * Los componentes solo leen este archivo: no hace falta tocarlos
 * para actualizar contenido. Ver README.md para más detalle.
 *
 * Cada sección tiene un bloque `home` (texto corto para la portada)
 * y el contenido completo para su página propia.
 *
 * Todo lo marcado con  // BORRADOR  es texto provisional inventado
 * para completar el diseño: revisarlo y reemplazarlo con datos reales
 * antes de publicar.
 */
import type { ImageMetadata } from 'astro';

import fotoHero from '../assets/fotos/hero-conversacion.jpg';
import fotoRetrato from '../assets/fotos/retrato-caminando.jpg';
import fotoAbrazo from '../assets/fotos/abrazo.jpg';
import fotoJovenes from '../assets/fotos/jovenes.jpg';
import fotoGrupo from '../assets/fotos/grupo-barrio.jpg';
import fotoActividad1 from '../assets/fotos/actividad_1.jpeg';
import fotoActividad2 from '../assets/fotos/actividad_2.jpeg';
import fotoActividad3 from '../assets/fotos/actividad_3.jpeg';
import fotoActividad4 from '../assets/fotos/actividad_4.jpeg';

// ---------- Tipos ----------

export type Source = { label: string; url: string; publishedAt?: string };

export type Photo = { src: ImageMetadata; alt: string };

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
  /** Párrafos adicionales para la página de detalle. */
  body?: string[];
  attributionNote?: string;
  image?: Photo;
  sources: Source[];
  /** Enlace interno relacionado (p. ej. una nota de Actualidad). */
  related?: { label: string; href: string };
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

export type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  location?: string;
  summary: string;
  /** Texto completo de la nota (página /actualidad/<id>). */
  body?: string[];
  /** Enlace a la publicación original (red social, prensa). */
  url?: string;
  image?: Photo;
  /** La publicación destacada se muestra en grande. */
  featured?: boolean;
  verified: boolean;
};

export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok';
export type SocialLink = { platform: SocialPlatform; label: string; handle: string; url: string; verified: boolean };

export type PlanAxis = {
  num: string;
  title: string;
  summary: string;
  objectives: string[];
  actions: string[];
};

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
    'Conoce a Ligia Naula: su historia, su trayectoria en la vida pública de Santa Rosa y su trabajo junto a la gente.',
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
  kittens: { src: fotoActividad4, alt: 'Ligia Naula, con gorra naranja, sostiene una canasta con tres gatitos durante una jornada de adopción.' },
  puppy: { src: fotoActividad3, alt: 'Ligia Naula, con gorra naranja, sostiene en brazos a un cachorro negro.' },
  vetDog: { src: fotoActividad1, alt: 'Una médica veterinaria examina a un cachorro negro sobre una mesa bajo una carpa azul.' },
  vetCat: { src: fotoActividad2, alt: 'Una veterinaria con guantes atiende a un gato blanco que sostiene su dueña.' },
} satisfies Record<string, Photo>;

// ---------- Navegación (páginas) ----------

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/conoce-a-ligia', label: 'Conoce a Ligia' },
  { href: '/trayectoria', label: 'Trayectoria y gestión' },
  { href: '/plan-de-gobierno', label: 'Plan de gobierno' },
  { href: '/actualidad', label: 'Actualidad' },
  { href: '/contacto', label: 'Contacto' },
];

// ---------- Redes sociales (enlaces oficiales facilitados por el equipo) ----------

export const socialLinks: SocialLink[] = [
  { platform: 'instagram', label: 'Instagram', handle: '@ligia_naula', url: 'https://www.instagram.com/ligia_naula/', verified: true },
  { platform: 'facebook', label: 'Facebook', handle: 'Ligia Naula', url: 'https://www.facebook.com/share/1HXGmgBNX8/', verified: true },
  { platform: 'tiktok', label: 'TikTok', handle: '@ligianaulac', url: 'https://www.tiktok.com/@ligianaulac', verified: true },
];

// ---------- Inicio (hero) ----------

export const hero = {
  eyebrow: 'Santa Rosa · El Oro · Ecuador',
  title: 'Ligia Naula',
  subtitle: 'Una vida dedicada a Santa Rosa, caminando junto a su gente.', // BORRADOR
  text: 'Hija de esta tierra, exvicealcaldesa y exalcaldesa del cantón. Conoce su historia, su trayectoria y lo que la mueve a seguir trabajando por cada barrio y cada parroquia.', // BORRADOR
  primary: { label: 'Conoce su historia', href: '/conoce-a-ligia' },
  secondary: { label: 'Su trayectoria', href: '/trayectoria' },
  updatingLabel: 'Sitio en construcción · contenidos en revisión',
};

/** Frase grande sobre foto, entre secciones de la portada. */ // BORRADOR
export const statement = {
  text: 'Escuchar, caminar los barrios y trabajar con la gente.',
  caption: 'Así entiende Ligia el servicio público.',
  photo: photos.group,
};

// ---------- Conoce a Ligia ----------

export const about = {
  title: 'Conoce a Ligia',
  lead: 'Una santarroseña que ha dedicado su vida a servir a su gente.', // BORRADOR
  home: {
    // BORRADOR
    text: 'Ligia creció entre las calles y el mercado de Santa Rosa, aprendiendo de su familia el valor del trabajo y de la palabra cumplida. Fue concejala, vicealcaldesa y alcaldesa del cantón, y hoy sigue recorriendo barrios y parroquias para escuchar a la gente.',
    facts: [
      { value: '+10', label: 'años en la vida pública de Santa Rosa' },
      { value: '2019', label: 'ejerció la Alcaldía del cantón' },
      { value: '100%', label: 'santarroseña, de corazón y de origen' },
    ],
    cta: { label: 'Conoce su historia completa', href: '/conoce-a-ligia' },
  },
  /** Biografía extendida por capítulos. */ // BORRADOR — validar cada dato con Ligia y su equipo
  chapters: [
    {
      title: 'Raíces santarroseñas',
      text: [
        'Ligia Naula nació y creció en Santa Rosa, en el seno de una familia trabajadora. Su infancia transcurrió entre la escuela, los mandados al mercado y las tardes en el barrio, donde aprendió que en Santa Rosa los vecinos se conocen por su nombre y se ayudan cuando hace falta.',
        'De sus padres heredó la disciplina del trabajo diario y una convicción que la acompaña hasta hoy: la palabra se cumple.',
      ],
    },
    {
      title: 'Formación',
      text: [
        'Se formó en Santa Rosa y continuó sus estudios superiores en la provincia de El Oro, con especial interés en la gestión pública y el desarrollo local. Su formación la complementa con capacitaciones en planificación municipal, participación ciudadana y liderazgo de mujeres.',
      ],
    },
    {
      title: 'Familia',
      text: [
        'Madre y mujer de familia, Ligia reconoce en su hogar el motor de su vocación de servicio. Para ella, cada decisión pública se mide con una pregunta sencilla: ¿mejora la vida de las familias de Santa Rosa?',
      ],
    },
    {
      title: 'Vida pública',
      text: [
        'Su camino en la vida pública comenzó desde el trabajo comunitario y la concejalía. En 2014 fue designada vicealcaldesa del cantón y, en 2019, ejerció la Alcaldía de Santa Rosa.',
        'Durante esos años participó en espacios de participación ciudadana, en la sanción de ordenanzas municipales y en encuentros regionales de mujeres lideresas de la Región 7.',
      ],
    },
    {
      title: 'Hoy, en territorio',
      text: [
        'Ligia sigue recorriendo barrios, sitios y parroquias. Conversa en las puertas de las casas, acompaña jornadas comunitarias y escucha a jóvenes, adultos mayores, comerciantes y productores. Está convencida de que las mejores ideas para Santa Rosa nacen de su propia gente.',
      ],
    },
  ],
  values: [
    // BORRADOR
    { title: 'Cercanía', text: 'Estar donde está la gente, escuchar antes de decidir.' },
    { title: 'Honestidad', text: 'Decir las cosas como son y cumplir lo que se dice.' },
    { title: 'Trabajo', text: 'Resolver con hechos los problemas de cada día.' },
    { title: 'Compromiso', text: 'Servir a Santa Rosa sin importar el cargo.' },
  ],
  gallery: [photos.hug, photos.youth, photos.hero, photos.puppy],
  /** Sustituir por la biografía aprobada cuando exista. */
  officialBiography: undefined as string | undefined,
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

// ---------- Trayectoria ----------

export const trajectory = {
  title: 'Trayectoria y gestión',
  lead: 'Más de una década de servicio público en Santa Rosa.', // BORRADOR
  home: {
    // BORRADOR
    milestones: [
      { year: '2014', title: 'Concejala y vicealcaldesa', text: 'Asume la Vicealcaldía del cantón tras su trabajo en el Concejo Municipal.' },
      { year: '2019', title: 'Alcaldesa de Santa Rosa', text: 'Ejerce la Alcaldía y sanciona ordenanzas para proteger a las mujeres y a la ciudadanía.' },
      { year: 'Hoy', title: 'En territorio', text: 'Recorre barrios y parroquias escuchando a las familias santarroseñas.' },
    ],
    cta: { label: 'Ver trayectoria completa', href: '/trayectoria' },
  },
  timelineTitle: 'Hitos de su trayectoria pública',
  timelineNote: 'La cronología se actualizará a partir de documentos oficiales y materiales verificados.',
  recordsTitle: 'Registro documental',
  recordsIntro:
    'Fichas con actuaciones y actividades documentadas. Cada una indica el cargo ejercido, la fecha y las fuentes disponibles.',
  filters: [
    'Todos',
    'Gestión municipal',
    'Participación ciudadana',
    'Normativa y documentos',
    'Actividades públicas',
  ] as const,
  emptyCategory: 'Todavía no hay registros publicados en esta categoría.',
};

export const timeline: TimelineItem[] = [
  {
    id: 'concejala-2014',
    yearLabel: '2014',
    title: 'Concejala de Santa Rosa',
    summary:
      'Una nota de la Asamblea Nacional de noviembre de 2014 la menciona entre los concejales participantes en el aniversario de la parroquia La Avanzada.',
    sources: [sources.asamblea],
    verified: false,
  },
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
    title: 'Encuentro de lideresas de la Región 7',
    summary:
      'La Asociación de Municipalidades Ecuatorianas la identifica como vicealcaldesa de Santa Rosa en un encuentro de lideresas de la Región 7.',
    note: 'La fecha exacta del encuentro está pendiente de verificación documental.',
    sources: [sources.ame],
    verified: false,
  },
  {
    id: 'alcaldia-2019',
    yearLabel: '2019',
    title: 'Alcaldesa de Santa Rosa',
    summary:
      'Documentos oficiales del GAD Municipal la identifican como alcaldesa del cantón en enero y febrero de 2019.',
    sources: [sources.acta2019, sources.gaceta03, sources.ordenanzaSocorro],
    verified: false,
  },
  {
    id: 'territorio-hoy',
    yearLabel: 'Hoy',
    title: 'Recorridos en barrios y parroquias', // BORRADOR
    summary:
      'Ligia mantiene un trabajo constante en territorio: visitas casa por casa, encuentros con jóvenes y jornadas comunitarias como la de bienestar animal en Bellavista.',
    sources: [],
    verified: false,
  },
];

export const records: RecordItem[] = [
  {
    id: 'asamblea-participacion-2019',
    title: 'Asamblea cantonal de participación ciudadana',
    date: '2019-01-23',
    category: 'Participación ciudadana',
    label: 'Registro documental',
    roleAtTime: 'Alcaldesa de Santa Rosa',
    summary:
      'Un acta del GAD Municipal registra la participación de Ligia Naula, identificada como alcaldesa, en una asamblea relacionada con la conformación del sistema de participación ciudadana y el consejo cantonal de planificación.',
    body: [
      'La asamblea cantonal es el espacio en el que la ciudadanía organizada participa en la planificación del cantón. En ella se conformó el sistema de participación ciudadana y se trataron temas vinculados con el consejo cantonal de planificación.',
    ],
    attributionNote:
      'El acta documenta la participación en la asamblea; no atribuye a una sola persona los acuerdos alcanzados.',
    image: photos.group,
    sources: [sources.acta2019],
    updatedAt: '2026-10-23',
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
    body: [
      'La ordenanza establece el marco local para prevenir y erradicar la violencia contra las mujeres en el cantón Santa Rosa. La sanción es el acto por el cual la máxima autoridad municipal ordena su promulgación tras la aprobación del concejo.',
    ],
    image: photos.hug,
    sources: [sources.gaceta03],
    updatedAt: '2026-10-23',
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
    body: [
      'La ordenanza regula la gestión de los servicios de prevención, protección, socorro y extinción de incendios en el cantón, un ámbito clave para la seguridad de las familias santarroseñas.',
    ],
    attributionNote:
      'La ordenanza es un acto del concejo municipal; el registro no atribuye su contenido a una sola persona.',
    image: photos.hero,
    sources: [sources.ordenanzaSocorro],
    updatedAt: '2026-10-23',
    published: true,
  },
  {
    id: 'jornada-bienestar-animal-2026',
    title: 'Jornada de bienestar animal en Bellavista', // BORRADOR
    date: '2026-10-18',
    category: 'Actividades públicas',
    label: 'Actividad en territorio',
    summary:
      'Ligia acompañó una jornada de vacunación, esterilización y adopción de mascotas organizada junto a la comunidad de la parroquia Bellavista.',
    image: photos.kittens,
    sources: [],
    related: { label: 'Leer la nota completa', href: '/actualidad/jornada-mascotas-adopcion' },
    updatedAt: '2026-10-23',
    published: true,
  },
];

/** Métricas verificadas. Vacío = el módulo "La información en cifras" no se muestra. */
export const metrics: Metric[] = [];

// ---------- Plan de gobierno ----------

export const plan = {
  title: 'Plan de gobierno',
  lead: 'Cuatro ejes para una Santa Rosa más segura, productiva y humana.', // BORRADOR
  intro:
    'Estos ejes resumen las prioridades que Ligia ha recogido en sus recorridos por barrios y parroquias. El documento completo se publicará aquí cuando esté aprobado.', // BORRADOR
  statusLabel: 'Versión preliminar · en construcción',
  downloadLabel: 'Descargar plan de gobierno (PDF)',
  home: {
    text: 'Propuestas construidas escuchando a la gente, barrio por barrio.', // BORRADOR
    cta: { label: 'Conoce el plan completo', href: '/plan-de-gobierno' },
  },
  /** Rellenar cuando exista el documento aprobado (activa la descarga). */
  approved: undefined as { version: string; date: string; pdfUrl: string } | undefined,
  // BORRADOR — ejes provisionales, no son compromisos aprobados
  axes: [
    {
      num: '01',
      title: 'Santa Rosa segura',
      summary: 'Barrios iluminados, espacios públicos recuperados y una ciudad donde las familias vivan tranquilas.',
      objectives: [
        'Reducir los puntos oscuros e inseguros en barrios y parroquias.',
        'Fortalecer la coordinación entre comunidad, municipio y fuerza pública.',
        'Prevenir la violencia contra mujeres, niñas y niños.',
      ],
      actions: [
        'Plan de iluminación y recuperación de parques y canchas.',
        'Brigadas barriales de seguridad ciudadana.',
        'Fortalecimiento de la Junta Cantonal de Protección de Derechos.',
      ],
    },
    {
      num: '02',
      title: 'Empleo y producción',
      summary: 'Apoyo a quienes mueven la economía de Santa Rosa: productores, comerciantes, emprendedores y el sector camaronero.',
      objectives: [
        'Dinamizar la economía local y el empleo.',
        'Acompañar a pequeños productores y emprendimientos.',
        'Mejorar las condiciones de mercados y espacios de comercio.',
      ],
      actions: [
        'Ferias productivas y de emprendimiento en parroquias.',
        'Mejoramiento de mercados municipales.',
        'Capacitación y acompañamiento a emprendedores y jóvenes.',
      ],
    },
    {
      num: '03',
      title: 'Servicios básicos y obras',
      summary: 'Agua, alcantarillado y vías dignas para cada barrio, sitio y parroquia del cantón.',
      objectives: [
        'Ampliar la cobertura de agua potable y alcantarillado.',
        'Mejorar la conectividad vial urbana y rural.',
        'Priorizar las obras con participación de la comunidad.',
      ],
      actions: [
        'Plan de agua potable y saneamiento por sectores.',
        'Mantenimiento y asfaltado de vías urbanas y rurales.',
        'Presupuesto participativo con asambleas barriales.',
      ],
    },
    {
      num: '04',
      title: 'Familia, juventud y bienestar',
      summary: 'Oportunidades para jóvenes, cuidado de adultos mayores y bienestar para todos, incluidas nuestras mascotas.',
      objectives: [
        'Abrir espacios de deporte, cultura y formación para jóvenes.',
        'Atender a grupos de atención prioritaria.',
        'Promover el bienestar y la tenencia responsable de animales.',
      ],
      actions: [
        'Escuelas deportivas y culturales en barrios.',
        'Programas de acompañamiento a adultos mayores.',
        'Jornadas permanentes de vacunación, esterilización y adopción.',
      ],
    },
  ] satisfies PlanAxis[],
};

// ---------- Actualidad ----------

export const news = {
  title: 'Actualidad y actividades',
  lead: 'Lo que está pasando en los barrios y parroquias de Santa Rosa.', // BORRADOR
  empty: 'Próximamente encontrarás aquí las últimas publicaciones y actividades.',
  home: {
    cta: { label: 'Ver todas las actividades', href: '/actualidad' },
  },
  socialTitle: 'Síguela en redes sociales',
  socialText: 'Cada día, recorridos, encuentros y actividades en sus redes oficiales.',
  digitalMetricsNote:
    'Las cifras de presencia digital miden actividad en redes sociales, no intención de voto.',
  /** Métricas digitales verificadas (seguidores, reproducciones...). Vacío = módulo oculto. */
  digitalMetrics: [] as Metric[],
  /** Solo se muestran las publicaciones con `verified: true`. */
  // BORRADOR — textos ilustrativos: confirmar sector, fecha y detalles reales
  posts: [
    {
      id: 'jornada-mascotas-adopcion',
      title: 'Jornada de bienestar animal: vacunación, esterilización y adopción de mascotas',
      category: 'Bienestar animal',
      date: '2026-10-18',
      location: 'Parroquia Bellavista, Santa Rosa',
      summary:
        'Vecinas y vecinos de Bellavista llevaron a sus perros y gatos a una jornada gratuita de atención veterinaria, y varias mascotas rescatadas encontraron un nuevo hogar.',
      body: [
        'Durante la mañana del sábado, la plaza central de la parroquia Bellavista se convirtió en un punto de encuentro para las familias y sus mascotas. Bajo carpas instaladas para la ocasión, un equipo de médicos veterinarios atendió a perros y gatos de la comunidad de forma gratuita.',
        'La jornada incluyó vacunación antirrábica, desparasitación, valoración general y registro de pacientes para esterilización. Ligia Naula acompañó la actividad, conversó con los asistentes y se sumó al espacio de adopción, donde cachorros y gatitos rescatados fueron presentados a familias interesadas en darles un hogar.',
        'Las personas que adoptaron recibieron orientación sobre cuidados básicos, alimentación y calendario de vacunas, con el compromiso de una tenencia responsable.',
      ],
      image: photos.kittens,
      featured: true,
      verified: true,
    },
    {
      id: 'vacunacion-antirrabica',
      title: 'Vacunación antirrábica gratuita para perros y gatos',
      category: 'Salud animal',
      date: '2026-10-18',
      location: 'Parroquia Bellavista, Santa Rosa',
      summary:
        'Profesionales veterinarios aplicaron vacunas y revisaron a las mascotas que llegaron con sus familias durante la jornada.',
      body: [
        'La vacunación antirrábica fue uno de los servicios más solicitados de la jornada. Las familias hicieron fila con sus mascotas para recibir la dosis y una revisión general a cargo de profesionales veterinarios.',
        'Además de la vacuna, se entregó información sobre la importancia de mantener al día el calendario de inmunización para proteger la salud de los animales y de las personas que conviven con ellos.',
      ],
      image: photos.vetDog,
      verified: true,
    },
    {
      id: 'esterilizacion-mascotas',
      title: 'Esterilización y control responsable de mascotas',
      category: 'Salud animal',
      date: '2026-10-18',
      location: 'Parroquia Bellavista, Santa Rosa',
      summary:
        'Se registraron perros y gatos para esterilización, una medida clave para reducir el abandono y la sobrepoblación animal en los barrios.',
      body: [
        'En el área de registro, el equipo veterinario valoró a gatos y perros candidatos para esterilización y explicó a sus familias el procedimiento, los cuidados previos y la recuperación.',
        'La esterilización ayuda a prevenir camadas no deseadas, reduce el número de animales en situación de calle y contribuye a la salud de las mascotas.',
      ],
      image: photos.vetCat,
      verified: true,
    },
    {
      id: 'adopcion-responsable',
      title: 'Cachorros rescatados buscan un hogar',
      category: 'Adopción',
      date: '2026-10-18',
      location: 'Parroquia Bellavista, Santa Rosa',
      summary:
        'El espacio de adopción presentó cachorros y gatitos rescatados a familias dispuestas a asumir una tenencia responsable.',
      body: [
        'Uno de los momentos más emotivos de la jornada fue el espacio de adopción. Cachorros y gatitos rescatados fueron presentados a las familias asistentes, que recibieron orientación antes de llevarlos a casa.',
        'Adoptar es un compromiso a largo plazo: alimentación, vacunas, atención veterinaria y mucho cariño. Quienes no pudieron adoptar ese día pudieron dejar sus datos para futuras jornadas.',
      ],
      image: photos.puppy,
      verified: true,
    },
    {
      id: 'recorrido-casa-por-casa',
      title: 'Casa por casa: escuchar a Santa Rosa',
      category: 'Recorridos',
      date: '2026-10-11',
      location: 'Santa Rosa',
      summary:
        'Ligia recorrió calles y barrios conversando con vecinas y vecinos sobre sus necesidades y sus ideas para el cantón.',
      body: [
        'Sin tarimas ni discursos: una conversación en la puerta de cada casa. Así fue el recorrido que Ligia realizó por varios barrios de Santa Rosa, donde vecinas y vecinos le contaron sus preocupaciones sobre agua, vías, seguridad y empleo.',
        'Cada conversación queda registrada para alimentar las propuestas del plan de gobierno, que se construye escuchando a la gente.',
      ],
      image: photos.hero,
      verified: true,
    },
    {
      id: 'encuentro-jovenes',
      title: 'Encuentro con jóvenes santarroseños',
      category: 'Juventud',
      date: '2026-10-04',
      location: 'Santa Rosa',
      summary:
        'Jóvenes del cantón compartieron con Ligia sus ideas sobre deporte, empleo y espacios para la cultura.',
      body: [
        'Las y los jóvenes de Santa Rosa tienen mucho que decir. En un encuentro abierto, compartieron con Ligia sus ideas sobre canchas, escuelas deportivas, primeras oportunidades de empleo y espacios para el arte y la cultura.',
        'Sus propuestas forman parte del eje de familia, juventud y bienestar del plan de gobierno.',
      ],
      image: photos.youth,
      verified: true,
    },
  ] as Post[],
};

// ---------- Contacto ----------

export const contact = {
  title: 'Contacto',
  lead: 'Tu voz cuenta. Escríbenos y cuéntanos qué necesita tu barrio.', // BORRADOR
  text: 'Usa el formulario o escríbenos por redes sociales. Los demás canales oficiales se publicarán aquí cuando estén habilitados.',
  home: {
    title: '¿Qué necesita tu barrio?', // BORRADOR
    text: 'Ligia quiere escucharte. Cuéntanos tu idea, tu necesidad o tu propuesta para Santa Rosa.', // BORRADOR
    cta: { label: 'Escríbenos', href: '/contacto' },
  },
  /** `value: undefined` = pendiente (en producción se oculta). No inventar correos ni teléfonos. */
  channels: [
    { icon: 'mail', label: 'Correo electrónico', value: undefined as string | undefined, href: undefined as string | undefined },
    { icon: 'phone', label: 'WhatsApp', value: undefined as string | undefined, href: undefined as string | undefined },
    { icon: 'pin', label: 'Oficina o ubicación de atención', value: undefined as string | undefined, href: undefined as string | undefined },
  ],
  subjects: ['Información general', 'Propuesta para mi barrio', 'Prensa', 'Otro'],
  /** URL de un endpoint seguro. Mientras sea `undefined`, el formulario es de demostración y no envía datos. */
  formEndpoint: undefined as string | undefined,
  demoMessage: 'Formulario de demostración. El envío estará disponible cuando se habilite un canal seguro.',
};

// ---------- Footer ----------

export const footer = {
  brand: 'Ligia Naula',
  text: 'Una vida dedicada a Santa Rosa, caminando junto a su gente.', // BORRADOR
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

export const publishedRecords = records
  .filter((r) => r.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export const publishedPosts = news.posts
  .filter((p) => p.verified)
  .sort((a, b) => b.date.localeCompare(a.date) || Number(!!b.featured) - Number(!!a.featured));
