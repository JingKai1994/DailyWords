<script setup lang="ts">
const favoriteWordListStore = useFavoriteWordListStore()
const { favoriteWordList } = storeToRefs(favoriteWordListStore)
const { getFavoriteWordList } = favoriteWordListStore
const isLoading = ref(true)
onMounted(async () => {
    await getFavoriteWordList()
    isLoading.value = false
})

import { quizOptionsData } from '~/const'
//處理group預先使用骨架 避免畫面跳動
const displayItems = computed(() => {
    return quizOptionsData.map(quiz => ({
        ...quiz,
        group: isLoading.value
            ? Array(quiz.group.length).fill({})
            : quiz.group.filter(item => !item.judge || (item.judge && favoriteWordList.value.length > 0))
    }))
})
</script>
<template>
    <div class="w-full h-[calc(100%-20px)] flex flex-col items-center py-5 rounded-lg bg-darkbg">
        <h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Vocabulary Test</h1>
        <div class="w-full">
            <div class="w-full flex items-center justify-between flex-col mb-4">
                <div class="w-11/12 md:w-1/3 flex flex-col mb-4" v-for="quiz in displayItems" :key="quiz.type">
                    <h2 class="text-2xl mb-5 flex items-center">
                        <Icon :name="quiz.icon" class="mr-1"></Icon>
                        {{ quiz.name }}
                    </h2>
                    <ul>
                        <li v-for="(item, index) in quiz.group" :key="isLoading ? index : item.type"
                            class="el-card h-full mb-5 p-5 flex flex-col items-center rounded-xl cursor-pointer shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] dark:shadow-[rgba(51,51,51,0.8)]">
                            <template v-if="isLoading">
                                <el-skeleton class="w-full">
                                    <template #template>
                                        <el-skeleton-item variant="h3" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 100%" />
                                        <el-skeleton-item variant="button" style="width: 100px" />
                                    </template>
                                </el-skeleton>
                            </template>
                            <template v-else>
                                <h3 class="text-xl mb-5 font-bold text-red-900 dark:text-red-500">
                                    {{ item.name }}
                                </h3>
                                <p class="text-base mb-5">{{ item.description }}</p>
                                <NuxtLink :to="`/quiz/${item.type}`">
                                    <el-button type="primary">
                                        開始測驗
                                    </el-button>
                                </NuxtLink>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>