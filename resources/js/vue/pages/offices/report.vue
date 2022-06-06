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
    <div v-if="loading" class="text-center">
      <v-container style="height: 300px" v-if="loading">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            در حال دریافت داده از سرور
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="primary"
              indeterminate
              rounded
              height="10"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container v-if="!loading">
      <v-container>
        <v-row justify="center" class="pb-10">
          <v-col cols="12" sm="8" md="6">
            <units-chart :units="report"></units-chart>
          </v-col>
        </v-row>
      </v-container>
      <v-card>
        <v-card-title
          :style="{ backgroundColor: officeColor(officeName) }"
          class="white--text pa-3"
          >{{ officeName }}
        </v-card-title>
        <units-table :units="report"></units-table>
      </v-card>
      <v-card
        class="mt-15 elevation-5"
        v-for="(unit, key) in report.groups"
        :key="key"
      >
        <v-card-title class="primary--text">
          {{ unit.name }}
        </v-card-title>
        <unit-table :unit="unit"> </unit-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import UnitsTable from "./partials/UnitsTable.vue";
import UnitTable from "./partials/UnitTable.vue";
import UnitsChart from "./partials/unitsChart.vue";
export default {
  metaInfo() {
    return { title: "گزارش اداره ها" };
  },
  components: { UnitsTable, UnitTable, UnitsChart },
  props: ["code"],
  data: () => {
    return {
      source_report: [],
      report: {},
      loading: false,
    };
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
  },
  computed: {
    ...mapGetters({
      unitsList: "lists/units",
      officesList: "lists/offices",
      activitiesList: "lists/activities",
      resourcesList: "lists/resources",
    }),
    breads() {
      return [
        {
          text: "صفحه اصلی",
          disabled: false,
          to: { name: "home" },
        },

        {
          text: "مانده اعتبار ادارات",
          to: { name: "offices.index" },
          exact: true,
        },

        {
          text: this.officeName,
          disabled: true,
        },
      ];
    },
    officeName() {
      try {
        return this.officesList[this.code].name;
      } catch {
        return "لطفا منتظر باشید ...  ";
      }
    },
  },
  async created() {
    this.loading = true;
    this.report = await this.$store.dispatch(
      "offices/getOfficeReport",
      this.code
    );
    this.loading = false;
  },
};
</script>
<style>
.clear {
  clear: both;
}
</style>