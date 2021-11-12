import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Books from '@/views/Books.vue';
import Orders from '@/views/Orders.vue';
const routes = [
  {
    path: "/#",
    name: "Login",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
