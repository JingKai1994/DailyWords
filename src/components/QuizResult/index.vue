<script setup lang="ts">
const wordListStore = useWordListStore()
const { wordMap } = storeToRefs(wordListStore)
import type { RecordItem } from "~/types/database";
const data = defineProps<{
    recordData: RecordItem
}>()
//從props拿到的資料處理成table要的資訊
const handleAnswerList = data.recordData.answerList.map(item => {
    const word = wordMap.value.get(item.id)
    if (word) {
        return {
            result: item.answer === word[1],
            question: `(${word[2]}.) ${word[3]}`,
            answer: item.answer ? item.answer : '-',
            correct: `${word[1]}`
        }
    } else {
        return {
            result: false,
            question: '',
            answer: '-',
            correct: ''
        }
    }
})
//尋找對應的標題
import { quizOptionsData } from '~/const'
const title = quizOptionsData
    .flatMap(item => item.group)
    .find(item => item.type === data.recordData.type) || null;

//計算分數
const score = Math.round(handleAnswerList.filter(item => item.result === true).length * (100 / handleAnswerList.length))

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
    <h2 class="text-red-900 dark:text-red-500 mb-6 text-2xl text-center" v-if="title">{{ title.name }}</h2>
    <div class="w-full mb-2 text-lg text-green-dark flex items-center justify-center">
        <Icon name="mdi:shield-check" class="mr-1.5"></Icon>
        我的分數：{{ score }}分
    </div>
    <div class="mb-8 text-lg flex items-center justify-center">
        <Icon name="teenyicons:stopwatch-solid" class="mr-1.5"></Icon>
        作答時間：{{ takeTime }}
    </div>
    <div class="w-full overflow-x-auto overflow-y-hidden rounded-lg">
        <el-table :data="handleAnswerList" style="width: 100%" size="large" class="!text-base">
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