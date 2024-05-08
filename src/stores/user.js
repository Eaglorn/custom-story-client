import { defineStore } from "pinia";
import { SessionStorage, Loading, Notify } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useGlobalStore } from "./global";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: "",
    password: "",
    auth: false,
    type: "",
  }),
  actions: {
    onAuthorization() {
      const $router = useRouter();
      const storeGlobal = useGlobalStore();
      if (SessionStorage.has("email") && SessionStorage.has("password")) {
        Loading.show();
        api({
          method: "post",
          url: storeGlobal.getAjaxUri("user/authorization"),
          data: {
            email: SessionStorage.getItem("email"),
            password: SessionStorage.getItem("password"),
          },
          timeout: storeGlobal.timeout.api.response,
          responseType: "json",
        })
          .then((response) => {
            if (response.data.success) {
              if (response.data.registration) {
                this.$patch({
                  email: SessionStorage.getItem("email"),
                  password: SessionStorage.getItem("password"),
                });
                switch (response.data.type) {
                  case "code_write": {
                    $router.push("UserRegistrationCode");
                    break;
                  }
                  case "history_read": {
                    $router.push("UserRegistrationTimeHistory");
                    break;
                  }
                  case "hero_create": {
                    $router.push("UserRegistrationHeroCreate");
                    break;
                  }
                }
              } else {
                this.$patch({
                  auth: true,
                  email: SessionStorage.getItem("email"),
                  password: SessionStorage.getItem("password"),
                  type: response.data.type,
                });
                $router.push("UserProfile");
                this.setSocket();
              }
            }
            Loading.hide();
          })
          .catch(function (err) {
            Notify.create({
              color: "negative",
              position: "top",
              message: "Нет соединения с сервером.",
              icon: "fa-solid fa-circle-exclamation",
              timeout: storeGlobal.timeout.api.error.high,
              textColor: "black",
            });
            Loading.hide();
            if (storeGlobal.app.type == "dev") {
              console.log(err);
            }
          });
      }
    },
    onSocket() {
      const storeGlobal = useGlobalStore();
      const socket = io(storeGlobal.server.address, {
        query: {
          email: this.email,
          password: this.password,
        },
      });
      storeGlobal.socket = socket;

      storeGlobal.socket.on("connect", () => {});

      storeGlobal.socket.on("GetPlayersCount", (data) => {
        storeGlobal.playersCount = data.value;
      });

      storeGlobal.socket.on("AddPlayersCount", (data) => {
        storeGlobal.playersCount++;
      });

      storeGlobal.socket.on("RemovePlayersCount", (data) => {
        storeGlobal.playersCount--;
      });
    },
  },
});
