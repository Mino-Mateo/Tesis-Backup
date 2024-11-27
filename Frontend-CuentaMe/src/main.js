/* Importaciones */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

// Variables
const app = createApp(App);

// Exportaciones
app.use(router); 
app.mount('#app');
