import axios from 'axios'
import _ from 'lodash'
import * as types from '../mutation-types'

// state
export const state = {
  list: [],
}

// getters
export const getters = {
  list:(state, getters, rootState, rootGetters) => {
    return rootGetters["lists/resources"];
  },
 
}

// mutations
export const mutations = {
  [types.UPDATE_RESOURCES_LIST](state, list) {
    state.list = list
  },
}

// actions
export const actions = {
  getName({ commit, state,getters }, {code}) {
    return getters.list[code].name
  },
}
