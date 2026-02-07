/**
 * Muted, near-white Tailwind palette for prototype.
 * Use these constants for consistent styling across components.
 * Avoid bright colors; use soft, shaded tones.
 */

export const colors = {
  // Backgrounds
  bg: {
    primary: "bg-zinc-50",
    secondary: "bg-stone-50",
    surface: "bg-white",
    surfaceAlt: "bg-stone-50",
  },
  bgDark: {
    primary: "dark:bg-zinc-900",
    secondary: "dark:bg-stone-900",
    surface: "dark:bg-zinc-800",
    surfaceAlt: "dark:bg-stone-800",
  },

  // Text
  text: {
    primary: "text-zinc-700",
    secondary: "text-stone-700",
    muted: "text-zinc-500",
    mutedAlt: "text-stone-500",
  },
  textDark: {
    primary: "dark:text-zinc-100",
    secondary: "dark:text-stone-100",
    muted: "dark:text-zinc-400",
    mutedAlt: "dark:text-stone-400",
  },

  // Borders
  border: {
    default: "border-zinc-200",
    muted: "border-stone-200",
  },
  borderDark: {
    default: "dark:border-zinc-700",
    muted: "dark:border-stone-700",
  },

  // Accents
  accent: {
    link: "text-slate-600 hover:text-slate-700",
    linkDark: "dark:text-slate-300 dark:hover:text-slate-200",
  },

  // Semantic
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-rose-600 dark:text-rose-400",
  warning: "text-amber-600 dark:text-amber-400",

  // Badges
  badge: {
    inStock: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    lowStock: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    outOfStock: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },

  // Buttons
  button: {
    primary:
      "bg-zinc-700 text-white hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-500",
    secondary:
      "bg-stone-100 text-zinc-700 hover:bg-stone-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
    ghost:
      "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
    danger:
      "bg-rose-600 text-white hover:bg-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400",
  },

  // Inputs
  input:
    "border-zinc-200 bg-white text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500",
} as const;
