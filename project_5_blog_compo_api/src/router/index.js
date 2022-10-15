import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RefDemo from "@/views/RefDemo.vue";
import ReactiveDemo from "@/views/ReactiveDemo.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/refDemo",
    name: "refDemo",
    component: RefDemo,
  },
  {
    path: "/reactiveDemo",
    name: "reactiveDemo",
    component: ReactiveDemo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
