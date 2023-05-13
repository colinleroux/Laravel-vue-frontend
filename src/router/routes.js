import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import middleware from "./middleware";
export default [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: middleware.guest,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    beforeEnter: middleware.guest,
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: middleware.user,
  },
  {
    path: "/testpage",
    name: "testpage",
    beforeEnter: middleware.user,
  },
];
