import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: "",
    password: "",
    socket: "",
    auth: false,
    type: "",
  }),
});
