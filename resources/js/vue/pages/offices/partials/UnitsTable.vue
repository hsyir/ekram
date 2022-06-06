<template>
  <div>
    <v-data-table
      class="elevation-5"
      dense
      :headers="headers"
      :items="unitsReport"
      show-expand
      :expanded.sync="expanded"
      item-key="name"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="pa-2 deep-purple lighten-5">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-right">منبع</th>
                  <th class="text-right">مانده اعتبار</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(res, key) in item.resources" :key="key">
                  <td>{{ res.name }}</td>
                  <td class="primary--text">
                    {{ res.sum_remain_amount.toLocaleString() }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
      <template slot="body.append">
        <tr class="pink--text">
          <td class="">جمع کل مانده اعتبارات</td>
          <td class="">{{ sumRemain.toLocaleString() }}</td>
          <td class=""></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import unitsChart from './unitsChart.vue';
export default {
  name: "UnitsTable",
  props: ["units"],
  data: () => {
    return {
      expanded: [],
      sumRemain: 0,
      headers: [
        {
          text: "عنوان واحد سازمانی",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "جمع مانده اعتبار",
          align: "start",
          sortable: false,
          value: "remainAmountSep",
        },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  computed: {
    unitsReport() {
      let data = [];
      const units = this.units.groups;
      Object.keys(units).forEach((unitCode) => {
        let item = units[unitCode];
        data.push({
          name: item.name,
          remainAmount: item.sum_remain_amount,
          remainAmountSep: item.sum_remain_amount.toLocaleString(),
          unitCode,
          resources: item.resources.groups,
        });
      });
      this.sumRemain = _.sumBy(data, "remainAmount");
      return data;
    },
  },
  watch: {
    units: function (val, newCal) {
      console.log("units", val);
    },
  },
};
</script>
