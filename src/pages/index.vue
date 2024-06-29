<template>
    <div class="w-full">
        <div class="w-full flex flex-col py-5">
            <DailyWords></DailyWords>
        </div>
        <Dialog :title="'請選擇測驗題型'">
            <button type="button"
                class="flex justify-center items-center w-full p-5 mb-8 text-lg text-gray-700 bg-white rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] hover:text-white hover:bg-blue-400 dark:hover:bg-yellow-400">
                <Icon name="material-symbols:edit-square-rounded" class="mr-1"></Icon>
                填空題
            </button>

            <button type="button"
                class="flex justify-center items-center w-full p-5 mb-3 text-lg text-gray-700 bg-white rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] hover:text-white hover:bg-blue-400 dark:hover:bg-yellow-400">
                <Icon name="fluent:select-all-24-filled" class="mr-1"></Icon>
                選擇題
            </button>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
</script>