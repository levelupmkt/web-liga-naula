# Prompt: módulo de encuestas, login y mapa de calor

> Pega este texto completo en tu asistente de IA de programación, dentro del repositorio de la web de la candidata.

---

## Contexto

Eres un desarrollador full-stack senior trabajando en el repositorio existente de la página web de una candidata. Vas a agregar un **módulo nuevo** dentro de esa web, sin romper lo que ya funciona.

El módulo tiene tres partes:
1. Un **área privada con login** para crear encuestas y ver resultados.
2. **Encuestas públicas** que se comparten por enlace (similar a pollie.app), con control de un voto por persona.
3. Un **mapa de calor** por parroquia y barrio que cruza las respuestas de las encuestas con reportes del equipo de campo.

## Cómo trabajar

1. Primero inspecciona el repositorio: framework, base de datos, autenticación existente y estructura de carpetas. Luego propón dónde y cómo encaja el módulo, y espera aprobación antes de escribir código.
2. Respeta las convenciones del proyecto. Si no hay backend ni base de datos, propone Supabase (Postgres con Row Level Security y Auth).
3. No modifiques páginas ni estilos de la web pública salvo para agregar enlaces al módulo.
4. Secretos solo en variables de entorno, documentadas en `.env.example`.
5. Si algo es ambiguo o choca con el stack, pregunta.

## Estructura del módulo dentro de la web

```
/                         Web pública existente (no se toca)
├── /e/[slug]             Página pública de votación de cada encuesta
├── /privacidad           Política de privacidad
└── /admin                Área privada (requiere login)
    ├── /login            Acceso con correo, contraseña y segundo factor
    ├── /encuestas        Listado de encuestas
    │   ├── /nueva        Creador de encuestas
    │   └── /[id]         Editar, ver enlace y QR, ver resultados
    ├── /mapa             Mapa de calor
    ├── /campo            Formulario de reportes del equipo de campo
    │   └── /importar     Carga masiva desde CSV o Excel
    ├── /usuarios         Gestión de usuarios y roles (solo admin)
    └── /ajustes          Silencio electoral y configuración (solo admin)
```

Roles y acceso:

| Rol | Encuestas | Resultados y mapa | Reportes de campo | Usuarios y ajustes |
|---|---|---|---|---|
| `admin` | Crear y editar | Ver y exportar | Ver todos | Sí |
| `analista` | Crear y editar | Ver y exportar | Ver todos | No |
| `campo` | No | No | Crear y ver los suyos | No |
| `lector` | No | Ver | Ver todos | No |

Los permisos se validan en el servidor y en la base de datos (RLS), no solo en la interfaz.

## Qué hace cada parte

### Login `/admin/login`
- Correo y contraseña, más segundo factor (TOTP o código por correo).
- Registro de auditoría: usuario, acción, entidad y fecha.

### Creador de encuestas `/admin/encuestas`
- Tipos de pregunta: opción única, opción múltiple, escala 1–5, sí/no y texto abierto.
- Una o varias preguntas, con orden editable.
- Imagen por pregunta y por opción, fecha de apertura y cierre, contraseña opcional, mensaje de agradecimiento y URL de redirección.
- Estados: borrador, activa, pausada y cerrada. Acción de duplicar.
- Cada encuesta genera un slug corto (`/e/[slug]`), un código QR descargable y metadatos Open Graph para que el enlace se vea bien en WhatsApp y Facebook.

### Votación `/e/[slug]`
- Mobile-first, sin crear cuenta, con la identidad visual de la web.
- Campo obligatorio: **parroquia y barrio**, con selects dependientes de la tabla `sectores`. Nunca texto libre.
- Campo opcional: rango de edad (16–24, 25–34, 35–49, 50–64, 65+).
- Casilla de **consentimiento obligatoria**, con enlace a `/privacidad`.
- Verificación con código de un solo uso de 6 dígitos enviado por correo; vence en 10 minutos y admite máximo 5 intentos. Deja una interfaz `OtpProvider` para agregar SMS después.
- **Un voto por persona:** guarda `HMAC-SHA256(correo_normalizado, SECRET)` y rechaza un segundo voto con el mismo hash en la misma encuesta. Suma captcha invisible (Cloudflare Turnstile), límite de solicitudes por IP y una señal de dispositivo.
- **No uses la API de WhatsApp Business**: Meta no la permite para candidatos ni campañas.
- Si la encuesta está pausada, cerrada o fuera de fecha, o si el silencio electoral está activo, muestra un aviso y no permite votar.

### Resultados `/admin/encuestas/[id]`
- Totales, porcentajes y gráficos por pregunta, actualizados automáticamente.
- Filtros por parroquia, barrio, rango de edad y fechas.
- Respuestas abiertas listadas sin datos del votante.
- Exportar a CSV y Excel, respetando los filtros.
- **Umbral de anonimato:** cualquier grupo con menos de 10 respuestas se muestra como "menos de 10" y no se desglosa, también en el mapa y en la exportación.

### Mapa de calor `/admin/mapa`
- Leaflet o MapLibre GL, con polígonos GeoJSON de parroquias y barrios desde la tabla `sectores`.
- **Coropleta por zona, no puntos de ciudadanos.** A los votantes nunca se les pide GPS.
- Selector de métrica: número de respuestas, porcentaje de una opción de una pregunta elegida, o promedio de escala.
- Capas que se encienden y apagan:
  1. Resultados de encuestas (coropleta).
  2. Reportes de campo: puntos con el GPS del brigadista, agrupados en clusters y coloreados por tipo, más una coropleta opcional de receptividad promedio.
- Leyenda y tooltip por zona, con el umbral de anonimato aplicado.
- Script `seed` que carga los sectores desde `/data/sectores.geojson`. Si no existe, genera uno de ejemplo con 3 polígonos ficticios y deja un TODO.

### Reportes de campo `/admin/campo`
- Formulario mobile para el rol `campo`.
- Campos: fecha y hora (automática), parroquia y barrio, tipo (visita, problema comunitario, queja, apoyo, otro), receptividad 1–5, nota (máximo 500 caracteres) y foto opcional (comprimida a 1600 px, máximo 2 MB).
- GPS automático del dispositivo del brigadista, con permiso; si lo rechaza, se guarda sin coordenadas.
- `/admin/campo/importar`: carga desde CSV o Excel con plantilla descargable, validación por fila y vista previa de errores antes de guardar.

### Ajustes `/admin/ajustes`
- Interruptor de **silencio electoral** que pausa todas las encuestas públicas a la vez, con opción de programarlo por fecha y hora (zona `America/Guayaquil`).

## Reglas de privacidad (obligatorias)

La opinión política es un dato sensible según la Ley Orgánica de Protección de Datos Personales del Ecuador.

1. **Identidad y voto separados.**
   - `participaciones` guarda solo `encuesta_id`, `votante_hash`, `sector_id` y fecha, para evitar duplicados.
   - `respuestas` **no tiene ningún identificador del votante** ni relación con `participaciones`. Su fecha se redondea a la hora.
   - Nadie, ni siquiera el administrador, puede saber qué respondió una persona.
2. El correo no se guarda en texto plano después de verificar. Los códigos se purgan cada 24 horas.
3. Botón para **borrar los datos de verificación** de una encuesta cerrada.
4. Ninguna ruta pública muestra resultados ni conteos.
5. `/privacidad` con texto placeholder marcado `[REVISIÓN LEGAL PENDIENTE]`.
6. HTTPS, cabeceras de seguridad (CSP, HSTS), cookies `httpOnly` y `secure`, y validación de entradas en el servidor (por ejemplo con Zod).
7. No implementar importación de padrones electorales ni bases de contactos externas.

## Modelo de datos

```
usuarios(id, correo, nombre, rol, mfa_activo, creado_en)
sectores(id, parroquia, barrio, geojson)
encuestas(id, slug, titulo, descripcion, imagen_url, estado, abre_en, cierra_en,
          password_hash, mensaje_final, url_redireccion, creado_por, creado_en)
preguntas(id, encuesta_id, tipo, enunciado, imagen_url, orden, obligatoria)
opciones(id, pregunta_id, texto, imagen_url, orden)
participaciones(id, encuesta_id, votante_hash, sector_id, creado_en)   -- UNIQUE(encuesta_id, votante_hash)
respuestas(id, encuesta_id, pregunta_id, opcion_id, texto, valor_escala,
           sector_id, rango_edad, creado_en_hora)                      -- sin votante
codigos_otp(id, destino_hash, codigo_hash, intentos, vence_en)
reportes_campo(id, usuario_id, sector_id, tipo, receptividad, nota, foto_url, lat, lng, creado_en)
ajustes(clave, valor)
auditoria(id, usuario_id, accion, entidad, entidad_id, creado_en)
```

RLS: `respuestas` y `participaciones` sin lectura pública, con inserción solo desde el servidor; el rol `campo` solo lee sus propios `reportes_campo`.

## Orden de construcción

1. Inspección y propuesta de encaje en el proyecto.
2. Migraciones, RLS y seed de `sectores`.
3. Login, roles y auditoría.
4. Creador de encuestas, slug, QR y Open Graph.
5. Votación con consentimiento, código por correo, antibots y deduplicación.
6. Resultados, filtros, umbral de anonimato y exportación.
7. Mapa con la capa de encuestas.
8. Reportes de campo, importación y su capa en el mapa.
9. Ajustes y silencio electoral.

## Pruebas que deben pasar

- [ ] Sin sesión no se puede entrar a `/admin` ni a ninguna API de resultados.
- [ ] El rol `campo` no puede ver resultados.
- [ ] Un mismo correo no vota dos veces en la misma encuesta, pero sí en otra.
- [ ] Un código vencido o con más de 5 intentos se rechaza.
- [ ] Sin consentimiento no se envía el voto.
- [ ] No existe forma de unir una fila de `respuestas` con una de `participaciones`.
- [ ] Un barrio con 9 respuestas aparece como "menos de 10" en resultados, mapa y exportación.
- [ ] Con el silencio electoral activo, `/e/[slug]` muestra el aviso y rechaza votos, también vía API.
- [ ] La vista previa Open Graph muestra el título y la imagen de la encuesta.

Empieza inspeccionando el repositorio y propón cómo encaja el módulo.
