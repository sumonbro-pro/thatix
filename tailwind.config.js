/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");
module.exports = {
    content: ["*.html"],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui')
    ],
}

