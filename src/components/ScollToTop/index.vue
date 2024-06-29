<script setup lang="ts">

const showScrollTop = ref(false)
const scrollElement: Ref<HTMLElement | null> = ref(null)
const topSentinel = ref<HTMLElement | null>(null)

const scrollToTop = () => {
	const target = scrollElement.value || window
	target.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}

onMounted(() => {
	scrollElement.value = document.querySelector('#scroll') || document.documentElement || document.body

	if (scrollElement.value) {
		// 創建一個 sentinel 元素
		const sentinel = document.createElement('div')
		sentinel.style.position = 'absolute'
		sentinel.style.top = '0'
		sentinel.style.height = '1px'
		sentinel.style.width = '100%'
		sentinel.style.visibility = 'hidden'
		scrollElement.value.append(sentinel)
		topSentinel.value = sentinel

		const observer = new IntersectionObserver(
			([entry]) => {
				// 當 sentinel 不可見時，顯示回到頂部按鈕
				showScrollTop.value = !entry.isIntersecting
			},
			{
				root: scrollElement.value,
				threshold: 0,
			}
		)

		observer.observe(sentinel)
	}
})

onUnmounted(() => {
	if (topSentinel.value) {
		topSentinel.value.remove()
	}
})
</script>

<template>
	<div v-show="showScrollTop" @click="scrollToTop" aria-label="Scroll to top"
		class="w-11 h-11 p-2 fixed right-5 bottom-5 rounded-full shadow-lg bg-black dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-400 transition-all duration-300">
		<Icon class="w-full h-full" name="material-symbols:arrow-upward" />
	</div>
</template>