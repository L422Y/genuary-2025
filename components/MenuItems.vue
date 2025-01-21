<template>
  <nav class="p-4 w-full z-10">
    <template v-for="item in menuItems" :key="item.name">
      <nuxt-link :to="item.to">
        {{ item.linkText }}
      </nuxt-link>
    </template>
  </nav>
</template>
<script lang="ts" setup>
const passed = withDefaults(defineProps<{}>(), {})
const router = useRouter()
const routes = router.getRoutes()
const menuItems = [{
    linkText: "home",
    title: "Home",
    to: "/",
}]
// .concat(routes
// .filter((route) => route.meta?.disabled !== true)
// .map((route) => ( {
//     name: route.name,
//     title: route.meta.title,
//     linkText: route.meta.linkText,
//     to: route.path,
// } )))
</script>
<style lang="scss" scoped>

</style>
