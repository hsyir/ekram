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
      <v-card>
        <v-card-title
          :style="{ backgroundColor: unitColor(unitName) }"
          class="white--text pa-3"
          >{{ unitName }}
        </v-card-title>
        <offices-table :offices="report"></offices-table>
      </v-card>
    <!--   <unit-table v-for="(unit, key) in report.groups" :key="key" :unit="unit">
      </unit-table> -->
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import OfficesTable from "./partials/OfficesTable.vue";
// import UnitTable from "./partials/UnitTable.vue";
export default {
  metaInfo() {
    return { title: "گزارش حوزه ها" };
  },
  components: { OfficesTable },
  props: ["code"],
  data: () => {
    return {
      source_report: [],
      report: {},
      loading: false,
    };
  },
  methods: {
    unitColor(unitName) {
      var hash = 0;
      for (var i = 0; i < unitName.length; i++) {
        hash = unitName.charCodeAt(i) + ((hash << 5) - hash);
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
      officesList: "lists/offices",
      unitsList: "lists/units",
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
          text: "مانده اعتبار حوزه ها",
          to: { name: "units.index" },
          exact: true,
        },

        {
          text: this.unitName,
          disabled: true,
        },
      ];
    },
    unitName() {
      try {
        return this.unitsList[this.code].name;
      } catch {
        return "لطفا منتظر باشید ...  ";
      }
    },
  },
  async created() {
    this.loading = true;
    this.report = await this.$store.dispatch(
      "units/getUnitReport",
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