import Vue from 'vue'
import Child from './Child.vue'
// Components that are registered globaly.
[
  Child,
].forEach(Component => {
  Vue.component(Component.name, Component)
})
