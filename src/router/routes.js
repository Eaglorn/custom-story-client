const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "UserSignInUp",
        component: () => import("pages/user/registration/SignInUpPage.vue"),
      },
      {
        path: "UserRegistrationCode",
        component: () => import("pages/user/registration/CodePage.vue"),
      },
      {
        path: "UserRegistrationHero",
        component: () => import("pages/user/registration/HeroPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFoundPage.vue"),
  },
];

export default routes;
