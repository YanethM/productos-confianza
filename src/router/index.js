import { createRouter, createWebHistory } from "vue-router";

const routerOptions = [
  { path: "/:product", name: "Home", props: true },
  { path: "/:product/seleccionar-oficina", name: "Selection" },
  { path: "/:product/gracias", name: "Message" },
  { path: "/:product/solicitar", name: "Active" },
  { path: "/:product/solicitar/monto", name: "Amount" }
];

const routes = routerOptions.map((r) => {
  return {
    ...r,
    component: () => import(`./../views/${r.name}/IndexView.vue`),
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
