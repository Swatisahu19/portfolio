import type { Config } from "tailwindcss";

/**
 * Design tokens live as CSS variables in app/globals.css.
 * Tailwind only maps names onto them, so a token changes in one place.
 */
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-2": "rgb(var(--c-ink-2) / <alpha-value>)",
        mute: "rgb(var(--c-mute) / <alpha-value>)",
        night: "rgb(var(--c-night) / <alpha-value>)",
        "night-2": "rgb(var(--c-night-2) / <alpha-value>)",
        lime: "rgb(var(--c-lime) / <alpha-value>)",
        "lime-ink": "rgb(var(--c-lime-ink) / <alpha-value>)",
        cobalt: "rgb(var(--c-cobalt) / <alpha-value>)",
        "cobalt-soft": "rgb(var(--c-cobalt-soft) / <alpha-value>)",
        line: "rgb(var(--c-ink) / 0.1)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        // "mono" is kept as the label family name but now maps to Inter
        mono: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale
        "d-xl": ["clamp(3rem, 6.2vw, 7.25rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "d-lg": ["clamp(2.5rem, 5.4vw, 5.25rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "d-md": ["clamp(2rem, 3.6vw, 3.4rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "d-sm": ["clamp(1.5rem, 2.3vw, 2.05rem)", { lineHeight: "1.12", letterSpacing: "-0.005em" }],
        label: ["0.6875rem", { lineHeight: "1.1", letterSpacing: "0.12em", fontWeight: "500" }],
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        panel: "var(--shadow-panel)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      maxWidth: {
        shell: "88rem",
        prose: "40rem",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        drift: "drift 7s ease-in-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
