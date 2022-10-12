import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Note: Here's an example of how these frameworks auto-import any file named index.js (like @ Agrograph)

import "./assets/global.css";

createApp(App).use(router).mount("#app");
