<script setup lang="ts">
const recordListStore = useRecordListStore()
const { recordList } = storeToRefs(recordListStore)
const { getRecordList, deleteRecordList } = recordListStore

onMounted(async () => {
    await getRecordList()
})

</script>
<template>
    <div class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 rounded-lg bg-darkbg">
        <h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Records</h1>
        <div class="w-full md:w-1/2">
            <div class="w-full flex items-center justify-between flex-col md:flex-row mb-4"
                v-if="recordList.length > 0">
                <div class="text-base mb-2 md:mb-0">共<span class="mx-1">{{ recordList.length }}</span>筆紀錄</div>
                <div class="flex items-center justify-end">
                    <div class="w-full">
                        <ClearBtn :clear-word="'清除全部紀錄'" :call-fn="deleteRecordList"></ClearBtn>
                    </div>
                </div>
            </div>
            <RecordList :record-list="recordList"></RecordList>
        </div>
    </div>
</template>