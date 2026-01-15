<template>
  <span class="typewriter-text">
    {{ displayedText }}<span class="cursor" v-if="showCursor">_</span>
  </span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 50 }, // 每個字的打字速度（毫秒）
  delay: { type: Number, default: 0 },  // 開始前的延遲
  showCursor: { type: Boolean, default: true } // 是否顯示閃爍光標
})

const displayedText = ref('')
const currentIndex = ref(0)

const type = () => {
  if (currentIndex.value < props.text.length) {
    displayedText.value += props.text[currentIndex.value]
    currentIndex.value++
    setTimeout(type, props.speed)
  }
}

onMounted(() => {
  setTimeout(type, props.delay)
})

// 監聽文本變化，用於動態切換內容（如以後接後端數據）
watch(() => props.text, () => {
  displayedText.value = ''
  currentIndex.value = 0
  type()
})
</script>

<style scoped>
.typewriter-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  white-space: pre-wrap;
}

.cursor {
  display: inline-block;
  width: 10px;
  animation: blink 1s step-end infinite;
  color: inherit;
  font-weight: bold;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style>