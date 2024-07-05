<script setup lang="ts">
const favoriteListStore = useFavoriteWordListStore()
const { favoriteWordList } = storeToRefs(favoriteListStore)
const { getFavoriteWordList, deleteFavoriteList } = favoriteListStore
onMounted(async () => {
	await getFavoriteWordList()
})
//載入數量(1次50個). 總頁數. 當前頁數的數據
const currentPage = ref(1)
const itemsPerPage = 50
const loadTotalPage = computed(() => Math.ceil(favoriteWordList.value.length / itemsPerPage))

const currentPageData = computed(() => {
	if (currentPage.value > 0 && favoriteWordList.value.length > 0) {
		const start: number = 0
		const end: number = currentPage.value * itemsPerPage
		return favoriteWordList.value.slice(start, end)
	}
	return []
})
</script>

<template>
	<div class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 rounded-lg bg-darkbg">
		<h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Favorites Lists</h1>
		<div class="w-2/3" v-if="currentPageData.length > 0">
			<div class="w-full flex items-center justify-between flex-col md:flex-row mb-4">
				<div class="text-base mb-2 md:mb-0">共<span class="mx-1">{{ favoriteWordList.length }}</span>筆資料</div>
				<div class="flex items-center justify-end">
					<div class="w-full">
						<ClearBtn :clear-word="'清除所有單字'" :call-fn="deleteFavoriteList"></ClearBtn>
					</div>
				</div>
			</div>
		</div>
		<WordCardList v-model:listData="currentPageData" v-model:currentPage="currentPage"
			v-model:loadTotalPage="loadTotalPage"></WordCardList>
	</div>
</template>