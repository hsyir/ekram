<template>
  <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
export default {
  name: "UnitsChart",
  props: ["units"],
  data: () => {
    return {};
  },
  computed: {
    labels(){
      return ["Team A", "Team B", "Team C", "Team D", "Team E"];
    },
    series() {
      return this.unitsReport.series ;
    },
    chartOptions() {
      let vm =this;
      return {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: vm.unitsReport.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
    },
     unitsReport() {
      let data = {
        series:[],
        labels:[],
      };
      const units = this.units.groups;
      Object.keys(units).forEach((unitCode) => {
        let item = units[unitCode];
        data.labels.push(item.name)
        data.series.push(item.sum_remain_amount)
      });
      return data;
    },
  },
};
</script>
