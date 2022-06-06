/* import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  message429: false,
  searchTerm: "asdasdasd",
}

// getters
export const getters = {
  message429: state => state.message429,
  searchTerm: state => state.searchTerm,
}

// mutations
export const mutations = {
  [types.UPDATE_USER](state, { user }) {
    state.user = user
  },
  [types.UPDATE_MESSAGE_429](state, status) {
    state.message429 = status
  },
  [types.UPDATE_SEARCH_TERM](state, term) {
    state.searchTerm = term
  }
}

// actions
export const actions = {
  searchDomain({ commit }, params) {
    return new Promise(function (resolve, reject) {
      axios.post("/api/search", params)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          if (error.response.status == 429) {
            commit(types.UPDATE_MESSAGE_429, true)
          }
          reject(Error("It broke"));
        })
    });
  },
  message429off({ commit }) {
    commit(types.UPDATE_MESSAGE_429, false)
  },
  updateSearchTerm({ commit }, term) {
    commit(types.UPDATE_SEARCH_TERM, term)
  }
}
 */