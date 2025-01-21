<template>
  <main>
    <MenuItems/>
    <div class="template-default">
     <ClientOnly>
       <NuxtPage/>
     </ClientOnly>
    </div>
  </main>
</template>
<script lang="ts" setup>
</script>
<style lang="scss">
body, html {
  height: 100%;
}

main {
  display: grid;
  height: 100%;
  grid-template-rows: 4rem 1fr;
}

.template-default {
  display: flex;
  //align-items: center;
  flex-direction: column;
  //justify-content: center;
}
</style>
