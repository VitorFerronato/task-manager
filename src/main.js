import { createApp } from "vue";
import App from "./App.vue";

import vuetify from "./configs/vuetify";

import router from "./router";
import { createPinia } from "pinia";

import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");
