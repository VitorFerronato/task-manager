import { createVuetify } from "vuetify";
import { VApp, VMain, VContainer, VBtn } from "vuetify/components";
import "vuetify/styles";

import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
  components: {
    VApp,
    VMain,
    VContainer,
    VBtn,
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        colors: {
          error: "#EC4C37",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;
