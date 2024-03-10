import { boot } from "quasar/wrappers";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:3000");

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
