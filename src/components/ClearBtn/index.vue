<script setup lang="ts">
const props = defineProps<{
    clearWord: string,
    callFn: Function,
}>()
const checkClear = () => {
    ElMessageBox.confirm(
        '此動作將無法復原',
        `確定要${props.clearWord}？`,
        {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            props.callFn()
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
    <button type="button"
        class="w-36 h-10 border-gray-200 rounded-lg flex justify-center items-center bg-white dark:bg-black/60 border clear"
        @click="checkClear" aria-label="sort-alpha-button">
        <div class="w-5 h-1/2 mr-2">
            <div class="w-full h-[15%] overflow-hidden hover">
                <div class="w-[15%] h-[30%] mx-auto rounded-t-[1%] bg-black dark:bg-white"></div>
                <div class="w-[80%] h-[70%] mx-auto mt-[1%] rounded-t-[3px] bg-black dark:bg-white">
                </div>
            </div>
            <div class="w-full h-[85%] overflow-hidden">
                <div class="w-[60%] h-[98%] mt-[2%] mx-auto bg-black dark:bg-white rounded-b-[3px] flex justify-around">
                    <div v-for="i in 3" :key="i" class="w-[2%] h-[70%] my-auto bg-white dark:bg-black"></div>
                </div>
            </div>
        </div>
        {{ clearWord }}
    </button>
</template>
<style scoped>
.clear:hover .hover {
    transform: rotate(45deg) translateY(-200%);
    transition: transform 300ms;
}
</style>