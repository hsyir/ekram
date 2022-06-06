<template>
  <v-container>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </v-container>
</template>

<script>
export default {
  computed: {},
};
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
.page-enter-active,
.page-leave-active {
  transition: opacity .5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .35s
}
.fade-enter,
.fade-leave-to {
  opacity: 0
}

</style>
