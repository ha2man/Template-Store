/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/app/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      primary: 'Playfair Display',
      body: 'Work Sans',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '3rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      content: {
        about: 'url("/client/app/assets/img/outline-text/about.svg")',
        portfolio: 'url("/client/app/assets/img/outline-text/portfolio.svg")',
        services: 'url("/client/app/assets/img/outline-text/services.svg")',
        testimonials: 'url("/client/app/assets/img/outline-text/testimonials.svg")',
        contact: 'url("/client/app/assets/img/outline-text/contact.svg")',
      },
      colors: {
        primary: '#050402',
        secondary: '#1C1D24',
        tertiary: '#131419',
        accent: {
          DEFAULT: '#ac6b34',
          hover: '#925a2b',
        },
        paragraph: '#878e99',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}

