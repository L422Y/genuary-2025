<template>
  <div class="gen-wrapper">
    <Title> {{ pageMeta?.title }}</Title>
    <div ref="meta" class="meta">
      <header>
        <h1>{{ pageMeta?.linkText }}</h1>
        <p>{{ pageMeta?.description }}</p>
      </header>
    </div>
    <div ref="content" class="content">
      <slot/>
    </div>
    <div class="params-tool" @mousedown="emit('interact:params')">
      <div v-for="(value, key) in params" :key="key">
        <p>{{ key }}: {{ value }}</p>
        <div>
          <input v-model="params[key]" max="10" min="0.01" step="0.05" type="range"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const meta = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const emit = defineEmits(["update:params","interact:params"])

const params = defineModel("params")
const pageMeta = useRoute().meta

const contentSize = ref({
    width: 500,
    height: 500
})

const handleResize = () => {
    if (!content.value) {
        return
    }
    contentSize.value.width = window?.innerWidth
    contentSize.value.height = content.value?.clientHeight || window?.innerHeight
}

onMounted(() => {
    window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize)
})

defineExpose({
    contentSize,
    params
})

watch(content, handleResize, { immediate: true })


</script>
<style lang="scss" scoped>
.gen-wrapper {
  width: 100%;
  display: grid;
  height: 100%;
  overflow: hidden;
  grid-template-rows: 4rem 1fr;

  .meta {
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    padding: 1rem;
    color: white;

    h1 {
      font-size: 2rem;
      margin: 0;
    }

    p {
      margin: 0;
    }
  }

  .content {
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .params-tool {
    z-index: 1000;
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    color: white;
    background: black;
  }
}
</style>
