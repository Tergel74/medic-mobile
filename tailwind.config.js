/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#097947",
                secondary: {
                    DEFAULT: "#F19920",
                },
                white: {
                    DEFAULT: "#FFFFFF",
                },
                black: {
                    DEFAULT: "#000",
                    100: "#1E1E2D",
                    200: "#232533",
                },
                gray: {
                    100: "#CDCDE0",
                },
            },
        },
    },
    plugins: [],
};