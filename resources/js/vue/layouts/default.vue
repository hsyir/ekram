<template>
<v-app>

    <v-navigation-drawer
      app
      right
      v-model="drawer"
      dark
      color="primary"
      class="main-menu"
    >
      <v-list nav dense>
        <v-list-item link :to="{ name: 'home' }">
          <v-list-item-title>صفحه اصلی</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link :to="{ name: 'offices.index' }">
          <v-list-item-title>گزارش ادارات</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-office-building</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link :to="{ name: 'units.index' }">
          <v-list-item-title>گزارش حوزه ها</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>



    <v-app-bar
      app
      dense
      fixed
      color="primary"
      dark
      elevate-on-scroll
    >
     <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>رصد مانده اعتبارات</v-toolbar-title>
      
      <v-spacer></v-spacer>

    </v-app-bar>
    <v-main>
      
          <child />
    </v-main>

    <v-footer dark padless app  bottom :fixed="false" >
     <v-container fluid class="pa-0 ma-0">
        <v-card flat tile class="grey darken-3 white--text text-center ">
        <v-divider></v-divider>
        <v-card-text class="white--text ma-0 py-1">
          {{ new Date().getFullYear() }} — <span>HSY.IR</span>
        </v-card-text>
      </v-card>
     </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  data: () => {
    return {
      drawer: true,
    };
  },

  computed: mapGetters({
    user: "auth/user",
  }),

  components: {
    Navbar,
  },
  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");
      // Redirect to login.
      this.$router.push({ name: "login" });
    },
  },
};
</script>
