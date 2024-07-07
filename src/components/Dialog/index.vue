<script setup lang="ts">
const dialogVisibleStore = useDialogVisibleStore()
const { dialogVisible } = storeToRefs(dialogVisibleStore)

defineProps<{
    title?: string
}>()

const handleDialogOpen = () => {
    document.body.classList.add('dialog-open');
}

const handleDialogClose = () => {
    document.body.classList.remove('dialog-open');
}
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="title" class="!w-11/12 md:!w-2/6" align-center :lock-scroll="false"
        @open="handleDialogOpen" @close="handleDialogClose">
        <slot></slot>
    </el-dialog>
</template>
<style>
.dark .el-dialog__headerbtn:hover {
    --el-color-primary: #facc15;
}

.el-overlay {
    position: absolute
}

.dialog-open {
    touch-action: none;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: auto;
    overflow: hidden;
}
</style>