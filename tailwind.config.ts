import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#6366f1", // Indigo 500
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#ec4899", // Pink 500
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#14b8a6", // Teal 500
                    foreground: "#ffffff",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-outfit)", "sans-serif"],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)', // Indigo to Purple to Pink
                'gradient-secondary': 'linear-gradient(to right, #14b8a6, #3b82f6, #6366f1)', // Teal to Blue to Indigo
                'gradient-dark': 'linear-gradient(to bottom right, #1e1b4b, #312e81, #4c1d95)', // Dark Indigo/Purple
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
