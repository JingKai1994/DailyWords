<script setup lang="ts">
const sentinel = inject<Ref<HTMLElement | null>>('sentinel');
const showScrollTop = ref(false)

const scrollToTop = () => {
	const target = document.body || window
	target.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}

onMounted(() => {
	if (sentinel && sentinel.value) {
		const observer = new IntersectionObserver(
			([entry]) => {
				// 當 sentinel 不可見時，顯示回到頂部按鈕
				showScrollTop.value = !entry.isIntersecting
			},
			{
				root: null,
				threshold: 0,
			}
		)

		observer.observe(sentinel.value)
	}
})

onUnmounted(() => {
	if (sentinel && sentinel.value) {
		sentinel.value.remove()
	}
})
</script>

<template>
	<div v-show="showScrollTop" @click="scrollToTop" aria-label="Scroll to top"
		class="w-11 h-11 p-2 fixed right-5 bottom-5 rounded-full shadow-lg bg-black dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-400 transition-all duration-300">
		<Icon class="w-full h-full" name="material-symbols:arrow-upward" />
	</div>
</template>