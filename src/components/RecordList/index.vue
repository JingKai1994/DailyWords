<script setup lang="ts">
const dialogVisibleStore = useDialogVisibleStore()
const { dialogVisibleToogle, closeDialog } = dialogVisibleStore
import type { RecordItem } from '~/types/record'
const props = defineProps<{
    recordList: RecordItem[]
}>()

const getColor = (grade: number) => {
    if (grade >= 90) return 'text-yellow-600'
    if (grade >= 60) return 'text-green-600'
    if (grade >= 30) return 'text-orange-600'
    return 'text-red-600'
}
//指定數據
const curRecordIdx: Ref<number> = ref(-1)
const curRecordItem = computed(() => props.recordList[curRecordIdx.value])
const dialogOpen = (idx: number) => {
    curRecordIdx.value = idx
    dialogVisibleToogle()
}

const recordListState = useRecordListStore()
const { deleteRecordByIdx } = recordListState
const deleteRecord = () => {
    ElMessageBox.confirm(
        '此動作將無法復原',
        `確定要刪除這筆紀錄？`,
        {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            if (curRecordIdx.value !== -1) {
                await deleteRecordByIdx(curRecordIdx.value)
                curRecordIdx.value = -1
            }
            dialogVisibleToogle()
            ElMessage({
                type: 'success',
                message: '刪除成功',
            })
        })
}

onBeforeUnmount(() => {
    closeDialog()
})
</script>
<template>
    <ul class="mt-5" v-if="recordList.length > 0">
        <li v-for="(recordItem, idx) in recordList" :key="recordItem.startTime" @click="dialogOpen(idx)"
            class="el-card w-full my-2.5 flex items-center py-3 px-4 rounded-lg cursor-pointer shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] dark:shadow-[rgba(51,51,51,0.8)]">
            <div class="w-16 mr-1.5 flex justify-center items-baseline"
                :class="getColor(getScore(recordItem.answerList))">
                <span class="leading-relaxed text-3xl">{{ getScore(recordItem.answerList) }}</span>
                <span class="text-xs">分</span>
            </div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] overflow-hidden pl-1">
                <div class="truncate leading-relaxed text-red-950 dark:text-red-500">{{ getTitle(recordItem) }}</div>
                <p class="truncate leading-relaxed text-base">
                    {{ $dayjs(recordItem.startTime).format('YYYY年MM月DD日 HH:mm') }}
                </p>
            </div>
        </li>
    </ul>

    <el-empty class="w-full mt-10" v-else>
        <template #description>
            <span class="text-xl text-red-950 dark:text-red-500">目前沒有任何紀錄</span>
        </template>
    </el-empty>
    <ClientOnly>
        <Dialog :z-index="1900">
            <div v-if="curRecordItem" :key="curRecordItem.startTime">
                <QuizResult :recordData="curRecordItem" :setFlexStart=true>
                    <div class="w-full mb-2 text-lg flex items-center">
                        <Icon name="fluent:clipboard-number-123-16-filled" class="mr-1.5"></Icon>
                        題數：{{ curRecordItem.answerList.length }} 題
                    </div>
                    <div class="w-full mb-2 text-lg flex items-center">
                        <Icon name="material-symbols-light:calendar-clock-rounded" class="mr-1.5"></Icon>
                        測驗時間：{{ $dayjs(curRecordItem.startTime).format('YYYY年MM月DD日 HH:mm') }}
                    </div>
                </QuizResult>
                <div class="my-5 flex justify-center">
                    <NuxtLink :to="`/quiz/${curRecordItem.type}`">
                        <button type="button"
                            class="w-105 py-2 px-5 mx-5 text-lg text-center text-white bg-blue-400 rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] hover:text-white hover:bg-blue-600">
                            重新挑戰
                        </button>
                    </NuxtLink>
                    <button type="button" @click="deleteRecord"
                        class="w-105 py-2 px-5 mx-5 text-lg text-center text-white bg-red-600 rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] hover:text-white hover:bg-red-800">
                        刪除紀錄
                    </button>
                </div>
            </div>
            <div v-else>
                <el-empty class="w-full mt-10">
                    <template #description>
                        <span class="text-xl text-red-950 dark:text-red-500">目前沒有任何紀錄</span>
                    </template>
                </el-empty>
            </div>
        </Dialog>
    </ClientOnly>
</template>