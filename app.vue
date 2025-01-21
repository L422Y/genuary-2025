<template>
  <NuxtLayout name="default">
    <NuxtPage/>
  </NuxtLayout>
</template>
<script lang="ts" setup>
useHead({
    titleTemplate: (title) => title ? `${title} | GENUARY'25` : "GENUARY'25",
})

if (import.meta.client) {
    window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            navigateTo("/")
        }
    })
}
</script>
<style>
html, body, #__nuxt {
    height: 90%;
    font-family: 'Satoshi', 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    color: white;
    background-color: #000;
    margin: 0;
    padding: 0;
}

</style>
