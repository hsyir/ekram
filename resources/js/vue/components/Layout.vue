<template>
  <v-app>
    <v-app-bar
      app
      dense
      fixed
      color="primary"
      dark
      elevate-on-scroll
    >
      <v-toolbar-title>اسمینا</v-toolbar-title>
    </v-app-bar>
    <v-main>
      
      <slot></slot>
    </v-main>

    <v-footer dark padless app  bottom :fixed="false" >
     <v-container fluid class="pa-0 ma-0">
        <v-card flat tile class="primary white--text text-center ">
        <v-divider></v-divider>
        <v-card-text class="white--text ma-0 py-1">
          {{ new Date().getFullYear() }} — <strong>Esmina</strong>
        </v-card-text>
      </v-card>
     </v-container>
    </v-footer>
  </v-app>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  data: () => {
    return {icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],};
  },
  methods: {},
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
