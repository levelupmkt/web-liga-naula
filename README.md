# Sitio web — Ligia Naula (prototipo)

Sitio informativo one-page hecho con **Astro 7**. Sin backend ni servicios externos obligatorios.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en http://localhost:4321
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ para revisar el build
```

El contenido de `dist/` se puede subir a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, cPanel…).

## Dónde se edita cada cosa

Casi todo está en **`src/content/site.ts`**. Los componentes solo leen ese archivo.

| Qué | Dónde |
| --- | --- |
| Modo borrador (noindex, etiquetas "pendiente", formulario demo) | `status.draft` en `site.ts` |
| Título y descripción SEO | `seo` |
| Textos del hero y microsección | `hero`, `intro` |
| Fotos y sus textos alternativos | archivos en `src/assets/fotos/` + `photos` en `site.ts` |
| Biografía aprobada | `about.officialBiography` (y `about.bioFields[].value`) |
| Hitos de la línea de tiempo | `timeline` (marcar `verified: true` al validar) |
| Fichas de trayectoria y gestión | `records.items` (`published: true` para mostrarlas) |
| Cifras de gestión | `metrics` (vacío = módulo oculto) |
| Plan de gobierno | `plan.approved` (título, versión, fecha, PDF y ejes) |
| Noticias | `news.posts` (solo se muestran las `verified: true`) |
| Redes sociales | `news.socialLinks` (aparecen en header y Actualidad solo si `verified: true`) |
| Cifras de redes | `news.digitalMetrics` |
| Contacto (correo, WhatsApp, oficina) | `contact.channels[].value` / `href` |
| Envío real del formulario | `contact.formEndpoint` (URL de un endpoint seguro) |
| Fuentes documentales | `sources` |
| Colores | variables al inicio de `src/styles/global.css` |
| Tipografías | `public/fonts/` + `@font-face` en `global.css` |
| Dominio / URL canónica | `site` en `astro.config.mjs` |

### Plan de gobierno
Mientras `plan.approved` sea `undefined` se muestran los ejes vacíos y el botón de descarga deshabilitado.
Para publicarlo, coloca el PDF en `public/` (p. ej. `public/plan-de-gobierno.pdf`) y rellena:

```ts
approved: {
  title: 'Plan de gobierno 2027–2031',
  version: '1.0',
  date: '2026-11-01',
  pdfUrl: '/plan-de-gobierno.pdf',
  axes: [{ title: '…', summary: '…' }],
},
```

## Antes de publicar

1. Cambiar `status.draft` a `false` (quita `noindex` y oculta los campos pendientes).
2. Reemplazar `public/robots.txt` por uno que permita la indexación.
3. Configurar `site` en `astro.config.mjs` con el dominio real.
4. Revisar con asesoría jurídica `src/pages/privacidad.astro` y `src/pages/aviso-legal.astro`.
5. Confirmar la autorización de uso de las fotografías.
6. **Licencia tipográfica:** Clash Grotesk (Fontshare) es de uso libre; **Gilroy es una fuente comercial** — verificar que se tiene licencia web.

## Estructura

```
src/
  content/site.ts        ← contenido editable
  assets/fotos/          ← fotografías (Astro las optimiza a WebP)
  components/            ← Header, Hero, IntroCards, About, Records, GovernmentPlan, News, Contact, Footer…
  layouts/               ← BaseLayout, LegalLayout
  pages/                 ← index, privacidad, aviso-legal, 404
  styles/global.css      ← tokens de color, tipografía y utilidades
public/fonts/            ← Clash Grotesk y Gilroy
```
