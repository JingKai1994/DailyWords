<script setup lang="ts">
const favoriteListStore = useFavoriteWordListStore()
const { favoriteWordList } = storeToRefs(favoriteListStore)
const { getFavoriteWordList, deleteFavoriteList } = favoriteListStore
onMounted(() => {
	getFavoriteWordList()
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
const checkClear = () => {
	ElMessageBox.confirm(
		'此動作將無法復原',
		'確定要清除全部單字？',
		{
			confirmButtonText: '確認',
			cancelButtonText: '取消',
			type: 'warning',
		}
	)
		.then(() => {
			deleteFavoriteList()
			ElMessage({
				type: 'success',
				message: '刪除成功',
			})
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '刪除取消',
			})
		})
}
</script>

<template>
	<div class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 rounded-lg bg-darkbg">
		<h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Favorites Lists</h1>
		<div class="w-2/3">
			<div class="w-full flex items-center justify-between flex-col md:flex-row mb-4">
				<div class="text-base mb-2 md:mb-0">共<span class="mx-1">{{ favoriteWordList.length }}</span>筆資料</div>
				<div class="flex items-center justify-end">
					<div class="w-full">
						<button type="button" v-if="currentPageData.length"
							class="w-36 h-10 border-gray-200 rounded-lg flex justify-center items-center bg-white dark:bg-black/60 border clear"
							@click="checkClear" aria-label="sort-alpha-button">
							<div class="w-5 h-1/2 mr-2">
								<div class="w-full h-[15%] overflow-hidden hover">
									<div class="w-[15%] h-[30%] mx-auto rounded-t-[1%] bg-black dark:bg-white"></div>
									<div class="w-[80%] h-[70%] mx-auto mt-[1%] rounded-t-[3px] bg-black dark:bg-white">
									</div>
								</div>
								<div class="w-full h-[85%] overflow-hidden">
									<div
										class="w-[60%] h-[98%] mt-[2%] mx-auto bg-black dark:bg-white rounded-b-[3px] flex justify-around">
										<div v-for="i in 3" :key="i"
											class="w-[2%] h-[70%] my-auto bg-white dark:bg-black"></div>
									</div>
								</div>
							</div>
							清除所有單字
						</button>
					</div>
				</div>
			</div>
		</div>
		<WordCardList v-model:listData="currentPageData" v-model:currentPage="currentPage"
			v-model:loadTotalPage="loadTotalPage"></WordCardList>
	</div>
</template>