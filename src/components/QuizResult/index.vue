<script setup lang="ts">
const wordListStore = useWordListStore()
const { wordMap } = storeToRefs(wordListStore)
import type { RecordItem } from "~/types/record";
const data = defineProps<{
    recordData: RecordItem,
    setFlexStart?: boolean
}>()
//從props拿到的資料處理成table要的資訊
const handleAnswerList = data.recordData.answerList.map(item => {
    const word = wordMap.value.get(item.id)
    if (word) {
        return {
            result: item.result,
            question: `(${word[2]}.) ${word[3]}`,
            answer: item.answer ? item.answer : '-',
            correct: `${word[1]}`
        }
    } else {
        return {
            result: false,
            question: 'error',
            answer: '-',
            correct: 'error'
        }
    }
})
const title = getTitle(data.recordData)
const score = getScore(handleAnswerList)
//計時(未達到兩位數補0)
const day = useDayjs()
import duration from 'dayjs/plugin/duration'
day.extend(duration)

const padZero = (num: number) => num.toString().padStart(2, '0');
const takeTime = computed(() => {
    const start = day(data.recordData.startTime)
    const end = day(data.recordData.endTime)

    const diff = end.diff(start)
    const duration = day.duration(diff)

    const hours = padZero(duration.hours())
    const minutes = padZero(duration.minutes())
    const seconds = padZero(duration.seconds())

    return `${hours}:${minutes}:${seconds}`
})
</script>

<template>
    <h2 class="text-red-900 dark:text-red-500 mb-6 text-2xl text-center" v-if="title">{{ title }}</h2>
    <div class="px-2">
        <div class="w-full mb-2 text-lg flex items-center" :class="{ 'justify-center': !setFlexStart }">
            <Icon name="mdi:shield-check" class="mr-1.5"></Icon>
            我的分數：{{ score }}分
        </div>
        <slot />
        <div class="w-full mb-8 text-lg flex items-center" :class="{ 'justify-center': !setFlexStart }">
            <Icon name="teenyicons:stopwatch-solid" class="mr-1.5"></Icon>
            作答時間：{{ takeTime }}
        </div>
    </div>
    <div class="w-full overflow-x-auto overflow-y-hidden rounded-lg">
        <el-table :data="handleAnswerList" size="large" class="!text-base min-w-96">
            <el-table-column fixed prop="result" label="成績">
                <template #default="scope">
                    <Icon :name="scope.row.result ? 'oui:check-in-circle-filled' : 'oui:cross-in-circle-filled'"
                        class="w-5 h-5" :class="scope.row.result ? 'text-green-600' : 'text-red-600'"></Icon>
                    <span>{{ scope.result }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="question" label="題目" />
            <el-table-column prop="answer" label="你的答案" />
            <el-table-column prop="correct" label="正確答案" />
        </el-table>
    </div>
</template>

<style>
.el-table .cell {
    text-align: center;
}
</style>