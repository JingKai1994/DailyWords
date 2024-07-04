<script setup lang="ts">
const nuxtApp = useNuxtApp()
//是否首次加載
const isLoading = ref(true)

const unsubPageStart = nuxtApp.hook('page:start', () => {
	if (import.meta.client) {
		isLoading.value = true
	}
})

const unsubPageFinish = nuxtApp.hook('page:finish', () => {
	if (import.meta.client) {
		isLoading.value = false
	}
})

onBeforeUnmount(() => {
	unsubPageStart()
	unsubPageFinish()
})

const router = useRouter()

router.afterEach(() => {
	const target = document.querySelector('#scroll') || document.documentElement || document.body || window
	target.scrollTo(0, 0)
})
</script>
<template>
	<NuxtLayout>
		<!-- 進度條 -->
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
	<!-- 首頁加載loading動畫 -->
	<Loading v-if="isLoading" />
</template>
<style>
.blur-enter-active,
.blur-leave-active {
	transition: all 0.4s;
}

.blur-enter-from,
.blur-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
