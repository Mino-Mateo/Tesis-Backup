/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        primary: '#8568AD',   // Color principal
        secondary: '#8A8FB9', // Color secundario
        light: '#E0D3F5',     // Color claro (fondo suave)
        success: '#95CF68',   // Color para éxito
        danger: '#DA6B65',    // Color para error o peligro
        warning: '#EBBA53',   // Color de advertencia
        texto: '#585a5e',

        // Colores de texto
        'text-light': '#F7F7F7',       // Texto claro
        'text-dark': '#333333',        // Texto oscuro

        // Colores de fondo
        'bg-light': '#F5F5F5',         // Fondo claro

        // Colores de estados
        'hover-primary': '#A17EB3',    // Hover sobre el color primario
        'focus-primary': '#6F4A92',    // Focus en el color primario
        'active-primary': '#4C3D7C',   // Activo sobre el color primario
      },
      
      // Bordes redondeados
      borderRadius: {
        box: '20px',        // Borde de caja
        button: '50px',     // Borde de botones
        'card': '12px',     // Borde para tarjetas
        'input': '8px',     // Borde para inputs
      },
      
      // Sombras personalizadas
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.1)',  // Sombra ligera
        'md': '0 4px 8px rgba(0, 0, 0, 0.2)',  // Sombra media
        'lg': '0 6px 12px rgba(0, 0, 0, 0.3)',  // Sombra fuerte
      },
      
      // Fuentes personalizadas
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],  // Fuente para el texto general
        heading: ['Poppins', 'sans-serif'],   // Fuente para los encabezados
      },
    },
  },
  plugins: [],
}