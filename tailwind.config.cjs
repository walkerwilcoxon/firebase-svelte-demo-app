/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],

  theme: {
    extend: {
      colors: {
        // gray
        primary: {
          DEFAULT: '#788F9B',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#EDF0F2',
          500: '#D6DDE0',
          600: '#BEC9CF',
          700: '#A7B6BE',
          800: '#8FA2AC',
          900: '#788F9B',
        },
        gray: '#788f9b',
      },
    },
  },

  plugins: [require('flowbite/plugin')],
}
