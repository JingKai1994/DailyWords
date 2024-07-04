<script setup lang="ts">
const wordListStore = useWordListStore()
const { wordList } = storeToRefs(wordListStore)

//字母，詞性
import { alphabetOptionsData, partsOptionsData } from '@/const'
const alphabetSelect = ref('')
const partstSelect = ref('')
const filterWordList = computed(() => {
    const filterList = wordList.value.filter(word => {
        const matchAlphabet = !alphabetSelect.value || word[1].toLowerCase().startsWith(alphabetSelect.value.toLowerCase())
        const matchParts = !partstSelect.value || word[2].split('/').indexOf(partstSelect.value) > -1
        return matchAlphabet && matchParts
    })
    return reverse.value ? filterList.reverse() : filterList
})
watch([alphabetSelect, partstSelect], () => {
    currentPage.value = 1
})
//載入數量(1次50個). 總頁數. 當前頁數的數據
const currentPage = ref(1)
const itemsPerPage = 50
const loadTotalPage = computed(() => Math.ceil(filterWordList.value.length / itemsPerPage))

const currentPageData = computed(() => {
    if (currentPage.value > 0 && filterWordList.value.length > 0) {
        const start: number = 0
        const end: number = currentPage.value * itemsPerPage
        return filterWordList.value.slice(start, end)
    }
    return []
})

//顛倒列表
const reverse = ref(false)
const reverseList = () => {
    if (filterWordList.value.length === 0) {
        return
    }
    reverse.value = !reverse.value
}
</script>

<template>
    <div class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 rounded-lg bg-darkbg">
        <h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Vocabulary Lists</h1>
        <div class="w-2/3 p-0">
            <div class="w-full flex items-center justify-between flex-col md:flex-row mb-4">
                <div class="text-base mb-2 md:mb-0">共<span class="mx-1">{{ filterWordList.length }}</span>筆資料</div>
                <div class="flex items-center justify-end">
                    <div class="w-1/2 mr-2">
                        <div class="min-w-36 relative border border-gray-200 rounded-lg">
                            <select v-model="alphabetSelect"
                                class="w-full p-2 rounded-lg text-sm cursor-pointer bg-white dark:bg-black/60">
                                <option value="">
                                    全部字母
                                </option>
                                <option v-for="alphabet in alphabetOptionsData" :key="alphabet.id" :value="alphabet.id">
                                    {{ alphabet.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="w-1/2 mr-2">
                        <div class="min-w-36 relative border border-gray-200 rounded-lg">
                            <select v-model="partstSelect"
                                class="w-full p-2 rounded-lg text-sm cursor-pointer bg-white dark:bg-black/60">
                                <option value="">
                                    全部類別
                                </option>
                                <option v-for="parts in partsOptionsData" :key="parts.id" :value="parts.id">
                                    {{ parts.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full">
                        <button type="button"
                            class="w-10 h-9 border-gray-200 rounded-lg flex justify-center items-center bg-white dark:bg-black/60 border"
                            @click="reverseList" aria-label="sort-alpha-button">
                            <Icon :name="reverse ? 'fa6-solid:arrow-down-z-a' : 'fa6-solid:arrow-down-a-z'"></Icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <WordCardList v-model:listData="currentPageData" v-model:currentPage="currentPage"
            v-model:loadTotalPage="loadTotalPage"></WordCardList>
    </div>
</template>