<template>
  <div class="menu-items">
    <template v-for="item in items" :key="item.id" :to="item.id">
      <NuxtLink :to="item.id"  v-if="!item.meta.disabled">
      <button>
          {{ item.meta.linkText }}
        </button>
      </NuxtLink>
    </template>
  </div>
</template>
<script lang="ts" setup>
const routes = useRouter().getRoutes()
const items = routes.map((route) => ( {
    id: route.path,
    text: route.name,
    meta: route.meta
} )).filter((item) => item.id !== "/")
</script>
<style lang="postcss" scoped>
.menu-items {
    @apply flex flex-col gap-2;
}

button {
    font-size: 1rem;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: black;
    border: none;
    background-color: #f1f1f1;

    &:hover {
        background-color: #ddd;
    }
}
</style>
