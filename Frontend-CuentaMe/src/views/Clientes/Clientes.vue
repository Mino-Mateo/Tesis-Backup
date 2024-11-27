<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">

      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg">
        <!-- Cuadro de búsqueda -->
        <div class="pb-6 text-texto">
          <input type="text" aria-label="Buscar clientes por nombre" placeholder="Buscar por nombre"
            v-model="searchQuery" @input="filterClientes"
            class="w-full bg-light p-3 rounded-md shadow-md text-center focus:outline-none" />
          <div v-if="filteredClientes.length === 0" class="text-center pt-5 text-xl text-white">
            No se encontraron resultados
          </div>
        </div>

        <!-- Lista de clientes -->
        <div class="h-[425px] overflow-y-auto space-y-4 pr-4">
          <div v-for="(cliente, index) in filteredClientes" :key="index" @click="selectCliente(cliente)"
            class="cliente-item flex items-center bg-light p-2 rounded-md shadow-md cursor-pointer text-texto">
            <img src="../../assets/icons/Resaltado/Simbolo/cliente-icon.svg" alt="Icono Cliente"
              class="w-10 h-10 rounded-full mr-4" />
            <span>{{ cliente.nombre }} {{ cliente.apellido }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg">
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">Datos del cliente</h2>

        <!-- Contenedor de datos del cliente -->
        <div class="w-full bg-secondary p-6 rounded-card text-texto">
          <!-- Texto antes de seleccionar al cliente -->
          <div v-if="!selectedCliente" class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona a un cliente para ver sus datos
          </div>

          <!-- Datos del cliente -->
          <div v-else>
            <div class="space-y-6 pr-2">
              <!-- Correo -->
              <InfoRow label="Correo" :value="selectedCliente.correo" icon="mail-icon.svg" />

              <!-- Nombre y Apellido -->
              <div class="grid grid-cols-2 gap-4">
                <InfoRow label="Nombre" :value="selectedCliente.nombre" icon="namelast-icon.svg" />
                <InfoRow label="Apellido" :value="selectedCliente.apellido" icon="namelast-icon.svg" />
              </div>

              <!-- Dirección y Teléfono -->
              <div class="grid grid-cols-2 gap-4">
                <InfoRow label="Dirección" :value="selectedCliente.direccion" icon="direction-icon.svg" />
                <InfoRow label="Teléfono" :value="selectedCliente.telefono" icon="phone-icon.svg" />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>

  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, computed } from 'vue';
import Navbar from '../../components/Navbar.vue';
import InfoRow from '../../components/InfoRow.vue';

// Variables reactivas
const selectedCliente = ref(null);
const searchQuery = ref('');

// Datos quemados clientes
const clientes = ref([
  { nombre: 'Ana', apellido: 'Martínez', correo: 'ana.martinez@gmail.com', telefono: '0987654321', direccion: 'Av. Siempre Viva 123' },
  { nombre: 'Carlos', apellido: 'Gómez', correo: 'carlos.gomez@hotmail.com', telefono: '0991234567', direccion: 'Calle Los Pinos 45' },
  { nombre: 'María', apellido: 'Fernández', correo: 'maria.fernandez@gmail.com', telefono: '0981234567', direccion: 'Av. Principal 678' },
  { nombre: 'Diego', apellido: 'Pérez', correo: 'diego.perez@hotmail.com', telefono: '0998765432', direccion: 'Calle Secundaria 9' },
  { nombre: 'Lucía', apellido: 'Ramírez', correo: 'lucia.ramirez@gmail.com', telefono: '0976543210', direccion: 'Calle Central 12' },
  { nombre: 'Jorge', apellido: 'Herrera', correo: 'jorge.herrera@hotmail.com', telefono: '0965432109', direccion: 'Av. La Paz 321' },
  { nombre: 'Elena', apellido: 'Lopez', correo: 'elena.lopez@gmail.com', telefono: '0954321098', direccion: 'Calle Esperanza 56' },
  { nombre: 'Pedro', apellido: 'García', correo: 'pedro.garcia@yahoo.com', telefono: '0943210987', direccion: 'Av. Las Flores 789' },
  { nombre: 'Sara', apellido: 'Ortiz', correo: 'sara.ortiz@yahoo.com', telefono: '0932109876', direccion: 'Calle Amanecer 101' },
  { nombre: 'Daniel', apellido: 'Castro', correo: 'daniel.castro@yahoo.com', telefono: '0921098765', direccion: 'Av. Montaña 202' },
  { nombre: 'Claudia', apellido: 'Mendoza', correo: 'claudia.mendoza@yahoo.com', telefono: '0910987654', direccion: 'Calle Del Sol 303' },
  { nombre: 'Luis', apellido: 'Silva', correo: 'luis.silva@gmail.com', telefono: '0999988776', direccion: 'Av. Horizonte 404' },
  { nombre: 'Gabriela', apellido: 'Rojas', correo: 'gabriela.rojas@gmail.com', telefono: '0988877665', direccion: 'Calle Luna 505' },
  { nombre: 'Ricardo', apellido: 'Cruz', correo: 'ricardo.cruz@gmail.com', telefono: '0977766554', direccion: 'Av. Río 606' },
  { nombre: 'Paola', apellido: 'Vargas', correo: 'paola.vargas@gmail.com', telefono: '0966655443', direccion: 'Calle Cascada 707' },
  { nombre: 'Andrés', apellido: 'Morales', correo: 'andres.morales@hotmail.com', telefono: '0955544332', direccion: 'Av. Serenidad 808' },
  { nombre: 'Diana', apellido: 'Navarro', correo: 'diana.navarro@yahoo.com', telefono: '0944433221', direccion: 'Calle Bosque 909' },
  { nombre: 'Rodrigo', apellido: 'Hernández', correo: 'rodrigo.hernandez@hotmail.com', telefono: '0933322110', direccion: 'Av. Valle 1010' },
  { nombre: 'Carmen', apellido: 'Torres', correo: 'carmen.torres@hotmail.com', telefono: '0922211009', direccion: 'Calle Jardines 1111' },
  { nombre: 'Sebastián', apellido: 'Álvarez', correo: 'sebastian.alvarez@onion.com', telefono: '0911100098', direccion: 'Av. Nevado 1212' },
]);

// Función para buscar clientes
const filteredClientes = computed(() =>
  clientes.value.filter(cliente =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Función para seleccionar cliente
function selectCliente(cliente) {
  selectedCliente.value = cliente;
};
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap');

/* Fondo de Pantalla */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
}

/* Barra de scroll */
section>div {
  scrollbar-width: auto;
  scrollbar-color: #946ad8 #E0D3F5;
}
</style>