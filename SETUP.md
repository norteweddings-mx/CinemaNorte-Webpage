# Cinema Norte — Sitio web

Sitio estático (HTML/CSS/JS sin frameworks). No necesita build ni servidor — se despliega tal cual.

## Pendientes antes de publicar

### 1. Licencia de la fuente Romie (importante)
Los archivos en `assets/fonts/romie/` se llaman **"RomieTrial-*"**. Eso normalmente
significa que son una versión de evaluación, no licenciada para uso comercial /
distribución pública en un sitio web. Antes de hacer público el sitio, confirma
con el type foundry (busca "Romie" — parece ser una fuente de Pangram Pangram u
otro foundry similar) que tienes una **licencia de web embedding**, y si es
necesario reemplaza los archivos en esa carpeta por la versión con licencia
(mismos nombres de archivo, o ajusta las rutas en `css/style.css`).

Mientras tanto, si la fuente no carga, el sitio cae automáticamente a una serif
de respaldo (`--font-serif` en `css/style.css`) — no se rompe, solo se ve distinto.

### 2. Formulario de contacto (Web3Forms) — ya conectado
El formulario en `contacto.html` envía a [web3forms.com](https://web3forms.com)
usando tu access key (`d2425ae0-33de-4536-b093-91a961216e8b`, en un `<input type="hidden">`
dentro del form). Es normal y seguro que esa key esté visible en el HTML —
así funciona Web3Forms, no es una API key secreta.

- Las solicitudes llegan al correo con el que creaste la cuenta en Web3Forms.
- Si quieres cambiar a qué correo llegan, o ver el historial de envíos, entra
  a tu dashboard en web3forms.com.
- El campo oculto `botcheck` es protección anti-spam (honeypot) — no lo quites.
- Si alguna vez quieres rotar la key (por ejemplo si se filtró y te llega spam),
  genera una nueva en el dashboard y reemplázala en `contacto.html`.

### 3. Video del hero
`index.html` tiene un fondo con textura a modo de placeholder (línea con
`<!-- TODO -->` dentro de `.hero`). Cuando tengas el clip de boda para el
fondo, agrega algo así dentro de `<section class="hero">`, antes de `.hero-content`:

```html
<video autoplay muted loop playsinline poster="assets/hero-poster.jpg">
  <source src="assets/hero-clip.mp4" type="video/mp4">
</video>
```

El video debe pesar poco (idealmente <8MB, sin audio, 1080p máx) para no
matar el tiempo de carga en celular.

### 4. Miniaturas de video
Las tarjetas de `index.html` y `portafolio.html` usan las imágenes de portada
que ya están alojadas en vidflow.co (las mismas que usan tus galerías). Si
cambias o agregas videos, actualiza el `href` (link a la galería) y el `src`
de la imagen en la tarjeta correspondiente — o avísame y las saco de nuevo.

## Desplegar: GitHub + Vercel

1. **Crear el repo en GitHub** (en github.com, botón "New repository" — o dime
   y te doy los comandos exactos de `gh` si lo instalas).
2. Desde esta carpeta:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git branch -M main
   git push -u origin main
   ```
3. **Conectar a Vercel**: entra a [vercel.com](https://vercel.com), "Add New Project",
   importa el repo de GitHub. Vercel detecta que es un sitio estático — no
   necesitas configurar ningún build command ni output directory, déjalo
   default y dale "Deploy".
4. Cada `git push` a `main` vuelve a desplegar automáticamente.

## Estructura

```
index.html         Inicio
portafolio.html     Portafolio completo
preguntas.html      FAQ
contacto.html        Formulario
css/style.css        Todo el diseño (tokens, breakpoints)
js/main.js            Nav móvil, acordeón FAQ, carrusel testimonios, envío de form
assets/logos/          SVGs reales del logo (negro y blanco)
assets/fonts/inter/     Inter (variable, licencia libre — ya incluida)
assets/fonts/romie/     Romie (ver punto 1 arriba)
```
