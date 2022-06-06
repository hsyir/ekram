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
        <v-col>
          <v-data-table
            dense
            :items="officesList"
            :headers="headers"
            :options.sync="tableOptions"
          >
            <template v-slot:item.ind="{ item, index }">
              {{
                tableOptions.itemsPerPage * (tableOptions.page - 1) + index + 1
              }}
            </template>
            <template v-slot:item.remainAmount="{ item, index }">
              {{ parseInt(item.remainAmount).toLocaleString() }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn x-small dark @click="toOffice(item)" color="grey darken-2"> جزییات </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="false">
      <v-row>
        <v-overlay :absolute="true" :value="overlay"> </v-overlay>
        <v-col class="border" v-for="office in offices" :key="office.code">
          <v-hover v-slot="{ hover }">
            <v-btn
              class="ma-1"
              block
              dark
              @click="toOffice(office)"
              :color="hover ? 'blue darken-4' : officeColor(office.name)"
              >{{ office.name }}</v-btn
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
    return { title: "گزارش اداره ها" };
  },
  data: () => ({
    overlay: false,
    tableOptions: {},
    headers: [
      {
        text: "#",
        value: "ind",
        sortable: false,
      },
      {
        text: "اداره",
        value: "name",
      },
      {
        text: "مانده",
        value: "remainAmount",
      },
      {
        text: "",
        value: "actions",
        sortable: false,
      },
    ],
    breads: [
      {
        text: "صفحه اصلی",
        disabled: false,
        to: { name: "home" },
      },

      {
        text: "لیست ادارات",
        disabled: true,
        exact: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({ offices: "lists/offices" }),
    officesList() {
      let data = [];
      const offices = this.offices;
      Object.keys(offices).forEach((officeCode) => {
        let item = offices[officeCode];
        data.push({
          name: item.name,
          remainAmount: item.sum_remain_amount,
          remainAmountSep: item.sum_remain_amount.toLocaleString(),
          officeCode,
        });
      });
      console.log(data);
      return data;
    },
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
    toOffice(office) {
      this.overlay = true;
      this.$router.push({
        name: "offices.report",
        params: { code: office.officeCode },
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
