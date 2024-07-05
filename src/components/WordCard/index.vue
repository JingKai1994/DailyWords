<script setup lang="ts">
import type { WordItem } from "~/types/wordItem";

defineProps<{
    dailyPage?: boolean,
    wordItem: WordItem,
}>()
</script>

<template>
    <!-- v-if="dailyPage" -->
    <FavoriteIcon v-model:isFavorite="wordItem.isFavorite" v-model:number="wordItem[0]" :dailyPage="dailyPage"
        class="top-3 left-5">
    </FavoriteIcon>
    <div class="w-full h-full flex justify-center flex-col" :class="{ 'pt-6': dailyPage }">
        <p class=" text-4xl text-center leading-relaxed break-all mb-2.5 text-red-900 dark:text-red-500">
            {{ wordItem[1] }}</p>
        <div class="leading-10 text-base">
            <div class="flex justify-center items-start mb-2">
                <SynthVoiceBtn :word="wordItem[1]" />
                <span class="mr-2.5 font-bold">({{ wordItem[2] }}.)</span>
                <span> {{ wordItem[3] }}</span>
            </div>
            <div class="w-full flex justify-center">
                <a :href="`https://dictionary.cambridge.org/zht/詞典/英語-漢語-繁體/${wordItem[1].split('（')[0]}`"
                    target="_blank" rel="noreferrer" title="劍橋辭典連結"
                    class="inline-flex items-center justify-center text-base hover:text-[#409eff] dark:hover:text-yellow-200">
                    <Icon name="material-symbols-light:dictionary" class="w-6 h-6 mr-1"></Icon>
                    劍橋辭典
                </a>
            </div>
        </div>
    </div>
</template>