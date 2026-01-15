<template>
  <span class="decrypted-text" @mouseenter="trigger" @mouseleave="reset">
    {{ displayText }}
  </span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 50 },
  maxIterations: { type: Number, default: 10 },
  characters: { type: String, default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }
})

const displayText = ref('')
let interval = null

const trigger = () => {
  let iteration = 0
  clearInterval(interval)
  
  interval = setInterval(() => {
    displayText.value = props.text
      .split('')
      .map((char, index) => {
        if (index < iteration) return props.text[index]
        return props.characters[Math.floor(Math.random() * props.characters.length)]
      })
      .join('')

    if (iteration >= props.text.length) clearInterval(interval)
    iteration += 1 / props.maxIterations
  }, props.speed)
}

const reset = () => {
  displayText.value = props.text
}

onMounted(trigger)
watch(() => props.text, trigger)
</script>

<style scoped>
.decrypted-text {
  font-family: 'JetBrains Mono', monospace;
  display: inline-block;
}
</style>