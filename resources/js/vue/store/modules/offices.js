import axios from 'axios'
import * as types from '@v/store/mutation-types'
import Vue from "Vue"
import { stringify } from 'postcss'

// state
export const state = {
  list: [],
  reports: {},
}

// getters
export const getters = {
  list:(state, getters, rootState, rootGetters) => {
    return rootGetters["lists/offices"];
  },
  getOfficeReport: (state) => (officeCode) => {
    console.log(officeCode)
    return state.reports[officeCode];
  },
}

// mutations
export const mutations = {
  [types.UPDATE_OFFICE_REPORT](state, { officeCode, data }) {
    state.reports[officeCode] = data
  },
}

// actions
export const actions = {

  getName({ commit, state,getters }, {code}) {
    return getters.list[code].name
  },
  async getOfficeReport({ rootGetters, commit, state, getters, dispatch }, officeCode) {
    // getters('activities/getName', {code:officeCode}, { root: true })
    let response = await axios.get(`/api/offices/${officeCode}/report`)
    let records = response.data;
    let units = summarize(records, "unit_code");

    Object.keys(units.groups).map(async function (unitKey, index) {
      let name = await dispatch("units/getName", { code: unitKey }, { root: true });
      units.groups[unitKey]["name"] = name;
      units.groups[unitKey]["activities"] = {};
      units.groups[unitKey]["activities"] = summarize(
        units.groups[unitKey]["records"],
        "activity_code"
      );

      let unitActivites = units.groups[unitKey]["activities"].groups;

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

      units.groups[unitKey]["resources"] = {};
      units.groups[unitKey]["resources"] = summarize(
        units.groups[unitKey]["records"],
        "resource_code"
      );
      let unitResources = units.groups[unitKey]["resources"].groups;
      Object.keys(unitResources).map(async function (resourceCode, index) {
        let name = await dispatch("resources/getName", { code: resourceCode }, { root: true });
        unitResources[resourceCode]["name"] = name
      });



    });


    console.log(units)

    return units;

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

