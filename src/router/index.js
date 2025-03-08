import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/login/sign-in",
  },
  {
    path: "/login",
    component: () => import("../views/login/LoginMain.vue"),
    children: [
      {
        path: "",
        redirect: { name: "sign-in" },
      },
      {
        path: "sign-in",
        name: "sign-in",
        component: () => import("../views/login/components/SignIn.vue"),
        meta: {
          title: "SIGN IN",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
