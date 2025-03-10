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
      {
        path: "sign-up",
        name: "sign-up",
        component: () => import("../views/login/components/SignUp.vue"),
        meta: {
          title: "SIGN UP",
        },
      },
      {
        path: "password-recovery",
        name: "password-recovery",
        component: () =>
          import("../views/login/components/PasswordRecovery.vue"),
        meta: {
          title: "PASSWORD RECOVERY",
        },
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("../views/main/Dashboard.vue"),
    meta: {
      title: "DASHBOARD",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta.title;
});

export default router;
