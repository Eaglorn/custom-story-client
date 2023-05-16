import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: "",
    socket: "",
    auth: false,
    type: "",
  }),
});
