import axios from 'axios'
import * as types from '@v/store/mutation-types'
import { Store } from 'vuex'
import Vue from 'vue'

// state
export const state = {
  lists: null
}

// getters
export const getters = {
  lists: state => state.lists,
  offices: state => {
    return state.lists.offices
  },
  activities: state => {
    return state.lists.activities
  },
  units: state => {
    return state.lists.units
  },
  resources: state => {
    return state.lists.resources
  },
  /* getOfficeReport: (state) => (officeCode) => {
    console.log(officeCode)
    return state.reports[officeCode];
  },
  keyList: state => {
    return _.keyBy(state.list, "code");
  }, */
}

// mutations
export const mutations = {
  [types.UPDATE_LISTS](state, lists) {
    state.lists = lists
  },
}

// actions
export const actions = {
  async updateLists({ commit, state }) {

    //check if lists fetched before
    if (state.lists != null) return;

    let { data } = await axios.get("/api/lists/all")
    console.log("Dartata",data)
    
    commit(types.UPDATE_LISTS, data);
    
    console.log("Lists loded")

  },
}
// Store.actions.dispatch("lists/updateLists")
// Store.dispatch("lists/updateLists")
// Store.dispatch("lists/updateLists")