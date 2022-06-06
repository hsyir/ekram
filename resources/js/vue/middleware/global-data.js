import store from '@v/store'

/**
 * This is middleware to check the current user role.
 *
 * middleware: 'role:admin,manager',
 */

export default async (to, from, next, roles) => {
  // store.dispatch("offices/updateList")
  // store.dispatch("units/updateList")
  // store.dispatch("resources/updateList")
  // store.dispatch("activities/updateList")
  await store.dispatch("lists/updateLists")
  // store.dispatch("moeins/updateList")
  next()
}
