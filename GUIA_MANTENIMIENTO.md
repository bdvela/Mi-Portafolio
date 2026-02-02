# Guía de Mantenimiento del Portafolio

¡Hola! Esta guía te ayudará a mantener y actualizar tu portafolio ahora que ha sido refactorizado con buenas prácticas.

## 📂 Estructura Clave

*   **`src/components/ui/`**: Aquí están las piezas reutilizables (Tarjetas de proyecto, ítems de experiencia). No necesitas tocarlos a menos que quieras cambiar el *diseño* de la tarjeta.
*   **`src/types/index.ts`**: Aquí definimos qué datos necesita un Proyecto o un Trabajo. Si quieres agregar un campo nuevo (ej. "fecha de fin"), primero agrégalo aquí.
*   **`src/styles/global.css`**: Todos tus estilos globales están aquí.

---

## 🚀 Cómo Agregar un Nuevo Proyecto

1.  **Textos (Traducciones):**
    *   Abre `src/i18n/es.json` y busca `"PROJECTS"`. Agrega una nueva clave (ej. `"PROJECT_7"`).
    *   Haz lo mismo en `src/i18n/en.json`.

2.  **Código:**
    *   Abre `src/components/Projects.astro`.
    *   Busca el arreglo `const PROJECTS`.
    *   Agrega un nuevo objeto al inicio (o final) siguiendo el formato:

```javascript
{
  title: i18n.PROJECTS.PROJECT_7.TITLE,        // Usa la clave que creaste
  subtitle: i18n.PROJECTS.PROJECT_7.SUBTITLE,
  description: i18n.PROJECTS.PROJECT_7.DESCRIPTION,
  link: "https://tuejempo.com",
  image: "/imagen-nueva.webp",                 // Asegúrate que la imagen esté en /public
  tags: ["NuevaTecnología", "Astro"],
  gradient: "from-color-500/20 to-color-500/20", // Elige colores de Tailwind
  // Opcionales:
  // github: "...",
  // featured: true,
  // new: true
},
```

¡Listo! El componente `ProjectCard` se encargará de renderizarlo automáticamente.

---

## 💼 Cómo Agregar Experiencia Laboral

1.  **Textos:**
    *   Igual que antes, agrega las claves en `src/i18n/es.json` y `en.json` bajo `"EXPERIENCE"`.

2.  **Código:**
    *   Abre `src/components/Experience.astro`.
    *   Busca el arreglo `const EXPERIENCE`.
    *   Agrega tu nuevo trabajo:

```javascript
{
  date: i18n.EXPERIENCE.JOB_NUEVO.TIME,
  title: i18n.EXPERIENCE.JOB_NUEVO.TITLE,
  company: i18n.EXPERIENCE.JOB_NUEVO.SUBTITLE,
  description: i18n.EXPERIENCE.JOB_NUEVO.DESCRIPTION,
  current: true, // Pon true si es tu trabajo actual
},
```

---

## 🎨 Cambiar Estilos Globales

Si quieres cambiar colores, fuentes o animaciones globales, no busques en `Layout.astro`.
Ahora ve directamente a:
👉 **`src/styles/global.css`**

Aquí puedes editar las variables CSS (colores accent) o las clases utilitarias como `.gradient-text`.

---

## ✅ Verificación

Siempre que hagas cambios, asegúrate de que tu terminal no muestre errores. Gracias a TypeScript, si te olvidas de un campo obligatorio (como el `title`), el editor te avisará con una línea roja antes de que rompas el sitio.
