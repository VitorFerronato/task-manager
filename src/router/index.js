import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
        meta: { title: "SIGN IN", requiresAuth: false },
      },
      {
        path: "sign-up",
        name: "sign-up",
        component: () => import("../views/login/components/SignUp.vue"),
        meta: { title: "SIGN UP", requiresAuth: false },
      },
      {
        path: "password-recovery",
        name: "password-recovery",
        component: () =>
          import("../views/login/components/PasswordRecovery.vue"),
        meta: { title: "PASSWORD RECOVERY", requiresAuth: false },
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("../views/main/Dashboard.vue"),
    meta: { title: "DASHBOARD", requiresAuth: true },
  },
  {
    path: "/sign-out",
    name: "sign-out",
    component: () => import("../views/login/components/SignOut.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Task manager";

  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      next({ name: "sign-in" });
    } else if (!to.meta.requiresAuth && user) {
      next({ path: "/dashboard" });
    } else {
      next();
    }
  });
});

export default router;
