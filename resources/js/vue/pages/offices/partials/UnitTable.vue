<template>
  <div>
    <v-data-table
    show-expand
    single-expand
    :expanded.sync="expanded"
    dense
    :headers="headers"
    :items="activities"
    item-key="item.name"
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
              <tr v-for="(res, key) in item.resources.groups" :key="key">
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
      <tr class="purple--text">
        <td class="">جمع مانده اعتبارات حوزه</td>
        <td class="">{{ sumRemain.toLocaleString() }}</td>
        <td class=""></td>
      </tr>
    </template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  name: "UnitTable",
  props: ["unit"],
  data: () => {
    return {
      sumRemain: 0,
      refreshKey: true,
      expanded: [],
      activitiesDetails: {},
      activities: [],
      headers: [
        {
          text: "عنوان فعالیت",
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
  computed: {},
  methods: {
    getActivities(acs) {
      let data = [];
      let activities = acs;
      Object.keys(activities).forEach((code) => {
        let item = activities[code];
        let resources = item.resources;
        data.push({
          item,
          name: item.name,
          remainAmount: item.sum_remain_amount,
          remainAmountSep: item.sum_remain_amount.toLocaleString(),
          code,
          resources,
        });
      });

      this.sumRemain = _.sumBy(data, "remainAmount");
      return data;
    },
  },
  mounted() {
    setTimeout(() => {
      this.activities = this.getActivities(
        structuredClone(this.unit.activities.groups)
      );
    }, 1);
  },
  watch: {
    activities: {
      handler: function (newValue) {
        console.log("watched");
      },
      deep: true,
    },
  },
};
</script>
