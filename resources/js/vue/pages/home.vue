<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card color="indigo lighten-4">
          <v-card-title> به سامانه رصد اعتبارات خوش آمدید. </v-card-title>
          <v-card-text>
            <h3>این سامانه به زودی راه اندازی می شود</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="0" class="border" color="orange lighten-5">
          <v-card-text> برش ادارات </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'offices.index' }" color="orange darken-4" dark>مانده اعتبارات ادارات</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card  elevation="0" class="border" color="green lighten-5">
          <v-card-text> برش حوزه ها </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'units.index' }" color="green darken-4" dark>مشاهده مانده اعتبارات حوزه ها</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "default",

  metaInfo() {
    return { title: "صفحه نخست" };
  },

  data: () => ({
    settings: [],
  }),

  computed: {
    ...mapGetters({
      authenticated: "auth/check",
    }),
  },
};
</script>

<style scoped>
</style>
