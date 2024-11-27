<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
  <!-- Navbar -->
  <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">

      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg">
        <!-- Titulo-->
        <h3 class="text-2xl pb-4 font-bold text-center text-white">Lista de pedidos</h3>

        <!-- Lista de pedidos-->
        <div class="h-[750px] overflow-y-auto space-y-4 pr-4">
          <div v-for="(pedido, index) in filteredPedidos" :key="index" @click="selectPedido(pedido)"
            class="pedido-item flex items-center bg-light p-3 rounded-md shadow-md cursor-pointer text-texto">
            <!-- Indicador de estado del pedido -->
            <div :class="[
              'w-5 h-5 mr-4 rounded-full',
              pedido.estado === 'Pendiente' ? 'bg-warning' : 'bg-success',
            ]"></div>
            <span>{{ pedido.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg mb-5">
        <!-- Titulo -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[36px] font-bold text-white">
            Datos del pedido 
          </h2>
        </div>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary pl-10 pr-10 pt-6 pb-6 rounded-card text-texto">
          <!-- Texto antes de seleccionar el pedido -->
          <div v-if="!selectedPedido"
            class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona un pedido para ver sus datos
          </div>

          <!-- Datos del pedido -->
          <div v-if="selectedPedido" class="grid grid-cols-1 gap-6">
            <!-- Estado del pedido -->
            <div class="col-span-full">
              <div class="flex items-center justify-between p-3 rounded-md w-full" :class="estadoClassComputed">
                <!-- Indicador del estado -->
                <div :class="['w-5 h-5 rounded-full flex justify-center items-center', estadoClassComputed]"></div>
                <span class="text-2xl font-sans font-bold text-center flex-1 pl-10">{{ estadoTexto }}</span>
                
                <!-- Botón para cambiar estado -->
                <button @click="cambiarEstado" class="px-4 py-2 text-white bg-warning rounded-md hover:bg-[#FFBF38] focus:outline-none focus:ring-2 focus:ring-[#F2E984]">
                  Cambiar
                </button>
              </div>
            </div>

            <!-- Elementos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Dirección del cliente -->
              <InfoRow :label="'Dirección'" :value="selectedPedido.direccion" icon="direction-icon.svg" class="w-[450px]"/>

              <!-- Fecha del pedido -->
              <InfoRow :label="'Fecha'" :value="selectedPedido.fecha" icon="calendario-icon.svg" class="ml-20" />

              <!-- Nombre del cliente -->
              <InfoRow :label="'Cliente'" :value="selectedPedido.cliente" icon="namelast-icon.svg" class="w-[450px] pl-5" />

              <!-- Precio -->
              <InfoRow :label="'Precio'" :value="selectedPedido.precio" icon="dinero-icon.svg" isPrice  class="ml-20"/>
            </div>

            <!-- Foto de la caja -->
            <div class="flex justify-center items-center">
              <div class="bg-light w-[240px] h-[240px] flex justify-center items-center rounded-card p-3">
                <img 
                  :src="selectedPedido.foto" 
                  alt="Foto de la Caja" 
                  class="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>

            <!-- Lista de materiales -->
            <div class="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="(material, index) in selectedPedido.materiales" :key="index" class="flex items-center bg-light p-2 rounded-md shadow-md text-texto">
                <img src="../../assets/icons/Resaltado/Simbolo/flor2-icon.svg" alt="Icono Cliente"
                class="w-9 h-9 rounded-full mr-4" />
                <span class="font-medium text-10xl">{{ material }}</span>
              </div>
            </div>
          </div>

          <!-- Botón para eliminar pedido -->
          <div class="flex justify-center pt-6" v-if="selectedPedido">
            <button @click="openDeleteConfirm(selectedPedido)" class="bg-danger hover:bg-[#e95151] text-black py-3 px-12 rounded-md">
              Eliminar Pedido
            </button>
          </div>

          <!-- Ventana Emergente -->
          <ConfirmDeleteModal :visible="showDeleteConfirm" :mensaje="'¿Estás seguro de eliminar el pedido?'"
          @close="closeDeleteConfirm" @confirm="confirmDeletePedido" />

        </div>
      </section>
    </div>

    <!-- Historial de Pedidos -->
    <section class="flex flex-col w-ful bg-primary p-5 rounded-card shadow-pr m-9">
      <!-- Título -->
      <h2 class="text-2xl pb-4 font-bold text-center text-white"> Historial de Pedidos </h2>
      
      <!-- Contenedor de pedidos -->
      <div class="flex overflow-x-auto gap-4 w-full pt-2 pb-2">
        <div 
          v-for="(pedido, index) in entregadosPedidos" 
          :key="index" 
          @click="selectPedido(pedido)"
          class="pedido-item flex items-center bg-light p-3 rounded-md shadow-md cursor-pointer text-texto">

          <!-- Indicador de estado del pedido -->
          <div 
            :class="[ 
              'w-5 h-5 mr-2 flex-shrink-0 rounded-full',
              pedido.estado === 'Pendiente' ? 'bg-warning' : 'bg-success',
            ]"
          ></div>
          <!-- Nombre del pedido -->
          <span class="truncate flex-grow ml-5">{{ pedido.nombre }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, reactive, computed, watch } from "vue";
import Navbar from "../../components/Navbar.vue";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.vue";
import InfoRow from "../../components/InfoRow.vue";

// Variables reactivas
const selectedPedido = ref(null);
const showDeleteConfirm = ref(false);
const estadoTexto = ref('');
const estadoClass = ref('');
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

// Datos quemados materiales
const materiales = reactive([
  {
    nombre: "Papel de regalo",
    descripcion: "Rollo de papel decorativo con diseños festivos",
    precio: "3.50",
    stock: 200,
    foto: null,
  },
  {
    nombre: "Cinta de satén",
    descripcion: "Cinta de satén para envolver regalos, 10m",
    precio: "2.00",
    stock: 150,
    foto: null,
  },
  {
    nombre: "Flores artificiales",
    descripcion: "Ramo de flores decorativas para adornar",
    precio: "5.50",
    stock: 100,
    foto: null,
  },
  {
    nombre: "Tarjetas personalizables",
    descripcion: "Set de 10 tarjetas para mensajes",
    precio: "4.00",
    stock: 300,
    foto: null,
  },
  {
    nombre: "Brillantina",
    descripcion: "Frasco de brillantina dorada, 200g",
    precio: "3.00",
    stock: 80,
    foto: null,
  },
  {
    nombre: "Pegatinas decorativas",
    descripcion: "Pack de 50 pegatinas temáticas",
    precio: "1.50",
    stock: 400,
    foto: null,
  },
  {
    nombre: "Cintas de papel crepé",
    descripcion: "Rollo de papel crepé de colores",
    precio: "1.75",
    stock: 200,
    foto: null,
  },
  {
    nombre: "Cajas de luces LED",
    descripcion: "Mini luces LED para decorar regalos",
    precio: "6.00",
    stock: 50,
    foto: null,
  },
  {
    nombre: "Perlas decorativas",
    descripcion: "Bolsa de perlas para adornos",
    precio: "3.25",
    stock: 120,
    foto: null,
  },
  {
    nombre: "Rosas preservadas",
    descripcion: "Rosa natural tratada para durar años",
    precio: "10.00",
    stock: 30,
    foto: null,
  },
]);

// Datos quemados cajas
const cajas = reactive([
{
    nombre: "Caja romántica",
    descripcion: "Caja en forma de corazón, ideal para San Valentín",
    precio: 8.0,
    stock: 50,
    foto: obtenerRutaImagen(1),
  },
  {
    nombre: "Caja de lujo",
    descripcion: "Caja negra con acabado mate y lazo dorado",
    precio: 15.0,
    stock: 30,
    foto: obtenerRutaImagen(2),
  },
  {
    nombre: "Caja vintage",
    descripcion: "Caja de madera con detalles en hierro envejecido",
    precio: 12.0,
    stock: 20,
    foto: obtenerRutaImagen(3),
  },
  {
    nombre: "Caja minimalista",
    descripcion: "Caja blanca con líneas simples y elegante",
    precio: 10.0,
    stock: 40,
    foto: obtenerRutaImagen(4),
  },
  {
    nombre: "Caja de cumpleaños",
    descripcion: "Caja decorada con motivos festivos, perfecta para regalos",
    precio: 9.5,
    stock: 25,
    foto: obtenerRutaImagen(5),
  },
  {
    nombre: "Caja navideña",
    descripcion: "Caja roja con detalles dorados, ideal para la Navidad",
    precio: 14.0,
    stock: 15,
    foto: obtenerRutaImagen(6),
  },
  {
    nombre: "Caja para joyas",
    descripcion: "Caja de terciopelo azul, perfecta para guardar joyas y accesorios",
    precio: 20.0,
    stock: 10,
    foto: obtenerRutaImagen(7),
  },
  {
    nombre: "Caja eco-friendly",
    descripcion: "Caja de cartón reciclado con acabado natural y ecológico",
    precio: 6.5,
    stock: 60,
    foto: obtenerRutaImagen(8),
  },
  {
    nombre: "Caja de madera personalizada",
    descripcion: "Caja de madera con grabado personalizado para ocasiones especiales",
    precio: 18.0,
    stock: 12,
    foto: obtenerRutaImagen(9),
  },
  {
    nombre: "Caja de lujo dorada",
    descripcion: "Caja dorada con detalles en blanco y lazo de satén",
    precio: 25.0,
    stock: 8,
    foto: obtenerRutaImagen(10),
  },
  {
    nombre: "Caja de flores",
    descripcion: "Caja con decoración de flores secas, ideal para regalar en bodas",
    precio: 17.0,
    stock: 18,
    foto: obtenerRutaImagen(11),
  },
  {
    nombre: "Caja de madera rústica",
    descripcion: "Caja de madera con acabados rústicos, ideal para decorar espacios",
    precio: 13.0,
    stock: 22,
    foto: obtenerRutaImagen(12),
  },
]);

// Datos quemados pedidos
const pedidos = ref([
  {
    id: 1,
    nombre: "Pedido 1",
    estado: "Pendiente",
    cliente: `${clientes.value[0].nombre} ${clientes.value[0].apellido}`,
    direccion: "Retirar en Local",
    fecha: "2024-11-01",
    precio: 50,
    foto: obtenerRutaImagen(1),
    materiales: [materiales[0].nombre, materiales[2].nombre, materiales[4].nombre],
    caja: cajas[0].nombre,
  },
  {
    id: 2,
    nombre: "Pedido 2",
    estado: "Entregado",
    cliente: `${clientes.value[1].nombre} ${clientes.value[1].apellido}`,
    direccion: clientes.value[1].direccion,
    fecha: "2024-11-05",
    precio: 75,
    foto: obtenerRutaImagen(3),
    materiales: [materiales[1].nombre, materiales[3].nombre],
    caja: cajas[2].nombre,
  },
  {
    id: 3,
    nombre: "Pedido 3",
    estado: "Pendiente",
    cliente: `${clientes.value[2].nombre} ${clientes.value[2].apellido}`,
    direccion: "Retirar en Local",
    fecha: "2024-11-08",
    precio: 90,
    foto: obtenerRutaImagen(5),
    materiales: [
      materiales[3].nombre,
      materiales[4].nombre,
      materiales[5].nombre,
      materiales[6].nombre,
    ],
    caja: cajas[4].nombre,
  },
  {
    id: 4,
    nombre: "Pedido 4",
    estado: "Entregado",
    cliente: `${clientes.value[3].nombre} ${clientes.value[3].apellido}`,
    direccion: clientes.value[3].direccion,
    fecha: "2024-11-12",
    precio: 65,
    foto: obtenerRutaImagen(7),
    materiales: [materiales[0].nombre, materiales[2].nombre, materiales[5].nombre],
    caja: cajas[5].nombre,
  },
  {
    id: 5,
    nombre: "Pedido 5",
    estado: "Pendiente",
    cliente: `${clientes.value[4].nombre} ${clientes.value[4].apellido}`,
    direccion: clientes.value[4].direccion,
    fecha: "2024-11-15",
    precio: 120,
    foto: obtenerRutaImagen(8),
    materiales: [
      materiales[1].nombre,
      materiales[3].nombre,
      materiales[6].nombre,
    ],
    caja: cajas[7].nombre,
  },
  {
    id: 6,
    nombre: "Pedido 6",
    estado: "Entregado",
    cliente: `${clientes.value[5].nombre} ${clientes.value[5].apellido}`,
    direccion: "Retirar en Local",
    fecha: "2024-11-18",
    precio: 45,
    foto: obtenerRutaImagen(2),
    materiales: [
      materiales[4].nombre,
      materiales[6].nombre,
      materiales[7].nombre,
      materiales[8].nombre,
    ],
    caja: cajas[1].nombre,
  },
  {
    id: 7,
    nombre: "Pedido 7",
    estado: "Pendiente",
    cliente: `${clientes.value[6].nombre} ${clientes.value[6].apellido}`,
    direccion: clientes.value[6].direccion,
    fecha: "2024-11-20",
    precio: 70,
    foto: obtenerRutaImagen(9),
    materiales: [
      materiales[2].nombre,
      materiales[3].nombre,
      materiales[6].nombre,
    ],
    caja: cajas[6].nombre,
  },
  {
    id: 8,
    nombre: "Pedido 8",
    estado: "Entregado",
    cliente: `${clientes.value[7].nombre} ${clientes.value[7].apellido}`,
    direccion: "Retirar en Local",
    fecha: "2024-11-23",
    precio: 80,
    foto: obtenerRutaImagen(12),
    materiales: [
      materiales[0].nombre,
      materiales[4].nombre,
      materiales[8].nombre,
    ],
    caja: cajas[8].nombre,
  },
  {
    id: 9,
    nombre: "Pedido 9",
    estado: "Pendiente",
    cliente: `${clientes.value[8].nombre} ${clientes.value[8].apellido}`,
    direccion: clientes.value[8].direccion,
    fecha: "2024-11-27",
    precio: 65,
    foto: obtenerRutaImagen(4),
    materiales: [
      materiales[1].nombre,
      materiales[5].nombre,
      materiales[7].nombre,
    ],
    caja: cajas[3].nombre,
  },
  {
    id: 10,
    nombre: "Pedido 10",
    estado: "Entregado",
    cliente: `${clientes.value[9].nombre} ${clientes.value[9].apellido}`,
    direccion: clientes.value[9].direccion,
    fecha: "2024-11-30",
    precio: 95,
    foto: obtenerRutaImagen(11),
    materiales: [materiales[2].nombre, materiales[6].nombre],
    caja: cajas[10].nombre,
  },
]);

/* Computadas */
// Lista de pedidos pendientes
const filteredPedidos = computed(() => 
  pedidos.value.filter(pedido => pedido.estado === "Pendiente")
);

// Lista de pedidos entregados
const entregadosPedidos = computed(() => 
  pedidos.value.filter(pedido => pedido.estado === "Entregado")
);

// Clase computada del estado del pedido
const estadoClassComputed = computed(() =>
  selectedPedido.value?.estado === 'Pendiente' ? 'bg-[#F76C6C]' : 'bg-success'
);

/* Funciones generales */
// Selecciona un pedido y actualiza sus datos
const selectPedido = (pedido) => {
  selectedPedido.value = pedido;
  estadoTexto.value = pedido.estado;
  estadoClass.value = pedido.estado === 'Pendiente' ? 'bg-red-500' : 'bg-green-500';
};

// Cambia el estado del pedido seleccionado
const cambiarEstado = () => {
  if (!selectedPedido.value) return;

  // Alterna entre "Pendiente" y "Entregado"
  selectedPedido.value.estado = selectedPedido.value.estado === 'Pendiente' ? 'Entregado' : 'Pendiente';

  // Actualiza texto y clase
  estadoTexto.value = selectedPedido.value.estado;
  estadoClass.value = selectedPedido.value.estado === 'Pendiente' ? 'bg-[#F76C6C]' : 'bg-success';

  // Actualiza la lista de pedidos
  pedidos.value = pedidos.value.map((pedido) =>
  pedido.id === selectedPedido.value.id ? { ...selectedPedido.value } : pedido
  );

  // Limpia la selección
  selectedPedido.value = null;
};

// Elimina un pedido seleccionado
const confirmDeletePedido = () => {
  if (!selectedPedido.value) return;

  pedidos.value = pedidos.value.filter(pedido => pedido !== selectedPedido.value);
  closeDeleteConfirm();
};

// Abre el modal de confirmación
const openDeleteConfirm = (pedido) => {
  selectedPedido.value = pedido;
  showDeleteConfirm.value = true;
};

// Cierra el modal de confirmación
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
  selectedPedido.value = null;
};

// Función para obtener las imágenes de las cajas
function obtenerRutaImagen(cajaId) {
  return new URL(`../../assets/icons/Cajas/Caja_${cajaId}.jpg`, import.meta.url).href;
}

/* Observadores */
// Actualiza la lista de pedidos
watch(searchQuery, () => {
  filteredPedidos.value = pedidos.filter((pedido) =>
    pedido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Función para actualizar el estado cuando se cambia
watch(pedidos, (newPedidos) => {
  // Realiza cualquier acción necesaria cuando el estado de pedidos cambie
  console.log("Pedidos actualizados:", newPedidos);
});

// Inicializar la lista
filteredPedidos.value = pedidos;
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

/* Estilo para navegadores Webkit */
section>div::-webkit-scrollbar {
  width: 8px;
}

section>div::-webkit-scrollbar-thumb {
  background-color: #946ad8;
  border-radius: 4px;
}

section>div::-webkit-scrollbar-track {
  background-color: #E0D3F5;
}

/* Animación de Entrada */
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}

/* Estilos Responsivos */
@media (max-width: 768px) {
  .rounded-2xl {
    border-radius: 20px;
  }

  h2 {
    font-size: 1.5rem;
  }

  input,
  button {
    font-size: 0.875rem;
  }
}

/* Estilos para la imagen de la caja */
label[for="image-upload"] {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
}

label[for="image-upload"]:hover {
  transform: scale(1.05);
}
</style>