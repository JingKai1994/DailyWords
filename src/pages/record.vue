<script setup lang="ts">
const records = ref([])
</script>
<template>
    <div class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 rounded-lg bg-darkbg">
        <h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Records</h1>
        <div class="w-1/3">
            <div class="w-full flex items-center justify-between flex-col md:flex-row mb-4" v-if="records.length">
                <div class="text-base mb-2 md:mb-0">共<span class="mx-1">1</span>筆紀錄</div>
                <div class="flex items-center justify-end">
                    <div class="w-full">
                        <button type="button"
                            class="w-36 h-10 border-gray-200 rounded-lg flex justify-center items-center bg-white dark:bg-black/60 border clear"
                            @click="checkClear" aria-label="sort-alpha-button">
                            <div class="w-5 h-1/2 mr-2">
                                <div class="w-full h-[15%] overflow-hidden hover">
                                    <div class="w-[15%] h-[30%] mx-auto rounded-t-[1%] bg-black"></div>
                                    <div class="w-[80%] h-[70%] mx-auto mt-[1%] rounded-t-[3px] bg-black"></div>
                                </div>
                                <div class="w-full h-[85%] overflow-hidden">
                                    <div
                                        class="w-[60%] h-[98%] mt-[2%] mx-auto bg-black rounded-b-[3px] flex justify-around">
                                        <div v-for="i in 3" :key="i" class="my-auto bg-white h-[70%] w-[2%]"></div>
                                    </div>
                                </div>
                            </div>
                            清除全部紀錄
                        </button>
                    </div>
                </div>
            </div>
            <p v-else class="w-full mt-10 text-xl text-center text-red-950 dark:text-red-500">
                目前沒有任何紀錄
            </p>
        </div>
    </div>
</template>