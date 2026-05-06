/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F7F4EF",
        porcelain: "#FFFDF8",
        ink: "#10100F",
        graphite: "#121416",
        graphite2: "#1A1D1F",
        muted: "#6F6A62",
        line: "#DED5C6",
        orange: "#FF6819",
        orangeSoft: "#FFEADC",
        pass: "#15824E",
        passSoft: "#DCF4E7",
        fail: "#D83A2F",
        failSoft: "#FAE2DF"
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(61, 47, 31, 0.12)",
        dark: "0 32px 80px rgba(16, 16, 15, 0.26)"
      },
      transitionTimingFunction: {
        mass: "cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
