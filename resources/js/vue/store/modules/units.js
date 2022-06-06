import axios from 'axios'
import _ from 'lodash'
import * as types from '@v/store/mutation-types'

// state
export const state = {
  list: [],
}

// getters
export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootGetters["lists/units"];
  },
}

// mutations
export const mutations = {
  [types.UPDATE_UNITS_LIST](state, list) {
    state.list = list
  },
}

// actions
export const actions = {
    getName({ commit, state,getters }, {code}) {
      return getters.list[code].name
    },
  async getUnitReport({ rootGetters, commit, state, getters, dispatch }, unitCode) {
    // getters('activities/getName', {code:unitCode}, { root: true })
    let response = await axios.get(`/api/units/${unitCode}/report`)
    let records = response.data;
    let offices = summarize(records, "office_code");
    Object.keys(offices.groups).map(async function (officeKey, index) {
      let name = await dispatch("offices/getName", { code: officeKey }, { root: true });
      offices.groups[officeKey]["name"] = name;
      offices.groups[officeKey]["activities"] = {};
      offices.groups[officeKey]["activities"] = summarize(
        offices.groups[officeKey]["records"],
        "activity_code"
      );

     let unitActivites = offices.groups[officeKey]["activities"].groups;

      Object.keys(unitActivites).map(async function (activityCode, index) {
        let name = await dispatch("activities/getName", { code: activityCode }, { root: true });
        unitActivites[activityCode]["name"] = name
        let activityRecords = JSON.parse(JSON.stringify(unitActivites[activityCode]["records"]))
        unitActivites[activityCode]["resources"] = summarize(activityRecords, "resource_code")

        let activityResources = unitActivites[activityCode]["resources"].groups;

        Object.keys(activityResources).map(async function (resourceCode, index) {
          let name = await dispatch("resources/getName", { code: resourceCode }, { root: true });
          activityResources[resourceCode]["name"] = name
        });
      });

      offices.groups[officeKey]["resources"] = {};
      offices.groups[officeKey]["resources"] = summarize(
        offices.groups[officeKey]["records"],
        "resource_code"
      );
      let officesResources = offices.groups[officeKey]["resources"].groups;
      Object.keys(officesResources).map(async function (resourceCode, index) {
        let name = await dispatch("resources/getName", { code: resourceCode }, { root: true });
        officesResources[resourceCode]["name"] = name
      });



    });


    console.log("offf",offices);
    return offices;

  },
}




function summarize(records, groupBy, indexBy) {
  let rep = _.groupBy(records, groupBy);
  let report = {
    groups: {},
  };
  Object.keys(rep).map(function (key, index) {
    report.groups[key] = [];
    report.groups[key]["records"] = rep[key];
    report.groups[key]["sum_remain_amount"] = _.sumBy(
      rep[key],
      "remain_amount"
    );
  });
  return report;
}