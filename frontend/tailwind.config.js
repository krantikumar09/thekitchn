/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shadcn/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        main: {
          primary: "#FF5733", // Bright Red for CTAs
          accent: "#FFC300", // Warm Yellow for highlights
          success: "#28A745", // Fresh Green for positive states
        },
        neutral: {
          default: "#2C3E50",
          light: "#E5E5E5",
        },
        background: "hsl(var(--background))",
        textColor: {
          default: "#2C3E50",
          heading: "#2C3E50",
          subheading: "#415b76",
          body: "#6C757D",
          link: "#FF5733",
          muted: "#ADB5BD",
          highlight: "#FFC300",
          contrast: "#FFFFFF",
        },
        warning: "#FF9F43",
        error: "#FF4D4F",
        info: "#17A2B8",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        fontMont: ["Montserrat", "serif"],
        fontOpenSans: ["Open Sans", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
