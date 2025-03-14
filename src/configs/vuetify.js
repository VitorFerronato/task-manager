import { createVuetify } from "vuetify";
import {
  VApp,
  VMain,
  VContainer,
  VBtn,
  VTextField,
  VForm,
  VIcon,
  VAppBar,
  VAppBarNavIcon,
  VToolbarTitle,
  VSpacer,
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VDivider,
  VListItemSubtitle,
  VListItemAction,
  VCard,
  VRow,
  VCol,
  VDialog,
  VTextarea,
} from "vuetify/components";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components: {
    VApp,
    VMain,
    VContainer,
    VBtn,
    VTextField,
    VForm,
    VIcon,
    VAppBar,
    VAppBarNavIcon,
    VToolbarTitle,
    VSpacer,
    VNavigationDrawer,
    VList,
    VListItem,
    VListItemTitle,
    VDivider,
    VListItemSubtitle,
    VListItemAction,
    VCard,
    VRow,
    VCol,
    VDialog,
    VTextarea,
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        dark: true,
        colors: {
          primary: "#00ca9d",
          secondary: "#253342",
          background: "#15222E",
          surface: "#1E1E2E",
          error: "#ec4c37",
          white: "#f2f2f2",
        },
      },
    },
  },
});

export default vuetify;
