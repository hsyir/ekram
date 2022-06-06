<template>
  <div>
    <v-data-table
      class="elevation-5"
      dense
      :headers="headers"
      :items="officesReport"
      item-key="name"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn x-small @click="showOffice(item)">مشاهده جزییات</v-btn>
      </template>
      
    <template slot="body.append">
      <tr class="purple--text">
        <td class="">جمع مانده اعتبارات </td>
        <td class="">{{ sumRemain.toLocaleString() }}</td>
        <td class=""></td>
      </tr>
    </template>
    </v-data-table>

    <div class="text-center">
      <v-dialog v-model="showOfficeAcctivities" max-width="700">
              <v-card>
                <v-card-title>{{ selectedOffice.name }}</v-card-title>
                <office-activities :office="selectedOffice"></office-activities>
              </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import OfficeActivities from "./OfficeActivities.vue";
export default {
  components: { OfficeActivities },
  name: "OfficesTable",
  props: ["offices"],
  data: () => {
    return {
      sumRemain:0,
      showOfficeAcctivities: false,
      expanded: [],
      selectedOffice: {},
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
        { text: "عملیات", value: "actions" },
      ],
    };
  },
  methods: {
    showOffice(office) {
      this.selectedOffice = office;
      this.showOfficeAcctivities = true;
    },
  },
  computed: {
    officesReport() {
      let data = [];
      const offices = this.offices.groups;
      Object.keys(offices).forEach((officeCode) => {
        let item = offices[officeCode];
        data.push({
          name: item.name,
          remainAmount: item.sum_remain_amount,
          remainAmountSep: item.sum_remain_amount.toLocaleString(),
          officeCode,
          activities: item.activities,
        });
      });
      this.sumRemain = _.sumBy(data,"remainAmount")
      return data;
    },
  },
};
</script>
