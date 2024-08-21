/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#228b22",
                    100: "#d6f5d6",
                    200: "#adebad",
                },
                secondary: {
                    DEFAULT: "#F19920",
                },
                white: {
                    DEFAULT: "#FFFFFF",
                    100: "#FAFAFA",
                    200: "#D1D1D1",
                    400: "#494949",
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
