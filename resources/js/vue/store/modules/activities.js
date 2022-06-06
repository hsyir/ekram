import axios from 'axios'
import _ from 'lodash'
import * as types from '@v/store/mutation-types'
import { Store } from 'vuex'

// state
export const state = {
  list: [],
}

// getters
export const getters = {
  list:(state, getters, rootState, rootGetters) => {
    return rootGetters["lists/activities"];
  },

}

// mutations
export const mutations = {
  [types.UPDATE_ACTIVITIES_LIST](state, list) {
    state.list = list
  },
}

// actions
export const actions = {
  getName({ commit, state,getters }, {code}) {
    return getters.list[code].name
  },
}
