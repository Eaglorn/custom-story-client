import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    api: "",
  }),
  actions: {
    getAjaxUri(response) {
      console.log(response);
      console.log(this.api + response);
      return this.api + response;
    },
    setAjaxUri(arg) {
      this.api = arg;
    },
  },
});
