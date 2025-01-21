<script lang="ts" setup>
import GenWrapper from "~/components/GenWrapper.vue"

definePageMeta({
    title: "01 - Horizontal/Vertical Lines",
    linkText: "01.horiz-vert-lines",
    description: "horizontal/vertical lines only",
})

const wrapper = ref<typeof GenWrapper | null>(null)
const canvasContainer = ref<HTMLDivElement | null>(null)

const params = reactive({
    frequency: (Math.random() * 0.1).toFixed(2),
})

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

// Function to create and setup canvas
const setupCanvas = () => {
    if (!wrapper.value?.contentSize || !canvasContainer.value) return

    // Get display size
    const displayWidth = wrapper.value.contentSize.width
    const displayHeight = wrapper.value.contentSize.height

    // Remove existing canvas
    while (canvasContainer.value.firstChild) {
        canvasContainer.value.removeChild(canvasContainer.value.firstChild)
    }

    // Create new canvas
    const newCanvas = document.createElement('canvas')
    newCanvas.width = displayWidth
    newCanvas.height = displayHeight

    canvasContainer.value.appendChild(newCanvas)

    // Store canvas reference and get context
    canvas.value = newCanvas
    ctx = newCanvas.getContext('2d')

    return ctx
}

// Function to render current state
const render = () => {
    if (!ctx || !canvas.value || !wrapper.value?.contentSize) return

    // Clear canvas
    ctx.clearRect(0, 0, wrapper.value.contentSize.width, wrapper.value.contentSize.height)

    // Render content
    gen01render(
       ctx,
       wrapper.value.contentSize.width,
       wrapper.value.contentSize.height,
       params
    )
}

// Watch for size changes only
watch(
   [
       () => wrapper.value?.contentSize.width,
       () => wrapper.value?.contentSize.height
   ],
   () => {
       setupCanvas()
       render()
   },
   { immediate: true }
)

// Watch for param changes only
watch(
   () => params,
   () => {
       render()
   },
   { deep: true }
)

// Auto render functionality
let autoRenderInterval: any = null
let autoRenderFrequency = 0.01

const startAutoRender = () => {
    stopAutoRender()
    autoRenderInterval = setTimeout(autoRender, 100)
}

const stopAutoRender = () => {
    if (autoRenderInterval) {
        clearTimeout(autoRenderInterval)
        autoRenderInterval = null
    }
}

const autoRender = () => {
    if (wrapper.value) {
        autoRenderFrequency += 0.01
        wrapper.value.params.frequency = autoRenderFrequency.toFixed(2)
    }
    autoRenderInterval = setTimeout(autoRender, 100)
}

onMounted(() => {
    startAutoRender()
})

onUnmounted(() => {
    stopAutoRender()
})
</script>

<template>
  <GenWrapper
      ref="wrapper"
      v-model:params="params"
      @interact:params="stopAutoRender"
  >
    <div
        class="gen"
        ref="canvasContainer"
    />
  </GenWrapper>
</template>

<style lang="scss" scoped>
.gen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: black;

  canvas {
    position: absolute;

    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
