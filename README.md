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

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada resumida: hero, quién es Ligia, frase destacada, trayectoria (3 hitos), plan (4 ejes), actualidad (destacada + 3) y contacto |
| `/conoce-a-ligia` | Biografía por capítulos, valores y galería |
| `/trayectoria` | Línea de tiempo completa y registro documental con filtros |
| `/trayectoria/<id>` | Ficha de cada registro (se genera sola desde `records`) |
| `/plan-de-gobierno` | Los 4 ejes con objetivos y líneas de acción |
| `/actualidad` | Todas las publicaciones y redes sociales |
| `/actualidad/<id>` | Nota completa (se genera sola desde `news.posts`) |
| `/contacto` | Canales, redes sociales y formulario |

## Dónde se edita cada cosa

Casi todo está en **`src/content/site.ts`**. Cada sección tiene un bloque `home` (texto corto de la portada) y el contenido completo de su página. **Busca `// BORRADOR`** para encontrar todo el texto provisional inventado que hay que validar.

| Qué | Dónde |
| --- | --- |
| Modo borrador (noindex, etiquetas "pendiente", formulario demo) | `status.draft` |
| Menú | `nav` |
| Redes sociales (header, footer, actualidad, contacto) | `socialLinks` |
| Textos del hero y frase destacada | `hero`, `statement` |
| Biografía, valores y galería | `about` (`home`, `chapters`, `values`, `gallery`) |
| Hitos de la línea de tiempo | `timeline` |
| Fichas de trayectoria | `records` (`published: true` para mostrarlas) |
| Plan de gobierno | `plan.axes`; `plan.approved` activa la descarga del PDF |
| Noticias | `news.posts` (`verified: true` para mostrarlas, `featured: true` para destacar) |
| Contacto (correo, WhatsApp, oficina) | `contact.channels[].value` / `href` |
| Envío real del formulario | `contact.formEndpoint` |
| Fotos | archivos en `src/assets/fotos/` + `photos` |
| Fuentes documentales | `sources` |
| Colores | variables al inicio de `src/styles/global.css` |

### Plan de gobierno
Mientras `plan.approved` sea `undefined` el botón de descarga está deshabilitado.
Para publicarlo, coloca el PDF en `public/` (p. ej. `public/plan-de-gobierno.pdf`) y rellena:

```ts
approved: { version: '1.0', date: '2026-11-01', pdfUrl: '/plan-de-gobierno.pdf' },
```

## Antes de publicar

1. Revisar y reemplazar todo lo marcado con `// BORRADOR` en `site.ts`.
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
  components/            ← Header, Footer, PageHero, Timeline, Records, PostCard, Contact, SocialLinks…
  components/home/       ← bloques resumidos de la portada
  layouts/               ← BaseLayout, LegalLayout
  pages/                 ← index, conoce-a-ligia, trayectoria/, plan-de-gobierno, actualidad/, contacto, legales, 404
  styles/global.css      ← tokens de color, tipografía y utilidades
public/fonts/            ← Clash Grotesk y Gilroy
```

## Prototipo del panel de campaña (demo)

Maqueta navegable del módulo de encuestas, mapa de calor y reportes de campo. **No tiene backend:** los datos son ficticios (`src/content/admin-demo.ts`) y nada se guarda. No está enlazada desde la web pública y todas sus páginas llevan `noindex`.

| Ruta | Pantalla |
| --- | --- |
| `/admin/login` | Acceso con segundo factor (cualquier dato sirve) |
| `/admin` | Panel de inicio |
| `/admin/encuestas`, `/admin/encuestas/nueva`, `/admin/encuestas/<id>` | Listado, creador y resultados (filtros, umbral de anonimato, CSV y QR reales) |
| `/admin/mapa` | Mapa de calor por parroquia (zonas ilustrativas) |
| `/admin/campo`, `/admin/campo/importar` | Reportes de campo e importación CSV |
| `/admin/usuarios`, `/admin/ajustes` | Roles y silencio electoral |
| `/e/<slug>` | Votación pública (código de demo: `123456`) |

El selector **"Ver como"** de la barra superior simula cada rol. El silencio electoral y el "ya votaste" se guardan solo en el navegador para la demostración.
