import { createApp } from "vue";
import App from "./App.vue";

import vuetify from "./configs/vuetify";

import router from "./router";

import "./style.css";

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount("#app");
