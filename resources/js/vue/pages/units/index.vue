<template>
  <div>
   
    <v-container class="pa-0">
      <v-row>
        <v-col class="">
          <v-breadcrumbs
            :items="breads"
            divider="/"
            class="deep-purple lighten-5 px-5 py-2 rounded"
          ></v-breadcrumbs
        ></v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-overlay :absolute="true" :value="overlay"> </v-overlay>
        <v-col class="border" v-for="unit in units" :key="unit.code">
          <v-hover v-slot="{ hover }">
            <v-btn
              class="ma-1"
              block
              dark
              @click="toOffice(unit)"
              :color="hover ? 'blue darken-4' : officeColor(unit.name)"
              >{{ unit.name }}</v-btn
            >
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  metaInfo() {
    return { title: "گزارش حوزه ها" };
  },
  data: () => ({
    overlay: false,
    breads: [
      {
        text: "صفحه اصلی",
        disabled: false,
        to: { name: "home" },
      },

      {
        text: "لیست حوزه ها",
        disabled: true,
        exact: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({ units: "lists/units" }),
  },
  methods: {
    officeColor(officeName) {
      var hash = 0;
      for (var i = 0; i < officeName.length; i++) {
        hash = officeName.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0x86;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
    toOffice(unit) {
      this.overlay = true;
      this.$router.push({
        name: "units.report",
        params: { code: unit.code },
      });
    },
  },
  created() {
    console.log("created");
  },
};
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
