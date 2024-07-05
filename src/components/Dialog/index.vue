<script setup lang="ts">
const dialogVisibleStore = useDialogVisibleStore()
const { dialogVisible } = storeToRefs(dialogVisibleStore)

defineProps<{
    title?: string
}>()
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="title" class="!w-11/12 md:!w-2/6" align-center>
        <slot />
    </el-dialog>
</template>
<style>
.dark .el-dialog__headerbtn:hover {
    --el-color-primary: #facc15;
}
</style>