import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Autenticacion/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/Recuperacion",
      name: "Recuperacion",
      component: () => import("../views/Autenticacion/Recuperar_Clave.vue"),
    },
    {
      path: "/Reseteo",
      name: "Resetear_Clave",
      component: () => import("../views/Autenticacion/Resetear_Clave.vue"),
    },
    {
      path: "/Menu",
      name: "Menu",
      component: () => import("../views/Autenticacion/Menu.vue"),
    },
    {
      path: "/Clientes",
      name: "Clientes",
      component: () => import("../views/Clientes/Clientes.vue"),
    },
    {
      path: "/Pedidos",
      name: "Pedidos",
      component: () => import("../views/Pedidos/Pedidos.vue"),
    },
    {
      path: "/Menu_Productos",
      name: "Menu_Productos",
      component: () => import("../views/Productos/Menu_Productos.vue"),
    },
    {
      path: "/Cajas",
      name: "Cajas",
      component: () => import("../views/Productos/Cajas.vue"),
    },
    {
      path: "/Materiales",
      name: "Materiales",
      component: () => import("../views/Productos/Materiales.vue"),
    },
  ],
});

export default router;
