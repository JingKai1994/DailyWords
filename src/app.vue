<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
// 页面切换时滚动到顶部
const router = useRouter()
router.afterEach(() => {
	setTimeout(() => {
		document.body.scrollTop = 0; // 兼容某些浏览器
		document.body.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}, 100);
})

const wordListStore = useWordListStore()
const { wordList } = storeToRefs(wordListStore)
const { getWordList } = wordListStore
if (wordList.value.length === 0) {
	getWordList()
}
// 是否显示页面内容
const showPage = computed(() => wordList.value.length > 0)
</script>
<template>
	<NuxtLayout>
		<!-- 进度条 -->
		<NuxtLoadingIndicator />
		<template v-if="showPage">
			<NuxtPage />
		</template>
		<Loading v-else />
	</NuxtLayout>
	
	<SpeedInsights />

	<NuxtPwaManifest />
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
