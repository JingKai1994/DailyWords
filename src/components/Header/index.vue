<script setup lang="ts">
const CollapseStore = useCollapseStore()
const { collapse } = storeToRefs(CollapseStore)
const { toggleCollapse } = CollapseStore
</script>

<template>
    <el-header class="flex justify-between items-center fixed top-0 backdrop-blur transition-all w-full !h-16 z-50">
        <div class="flex items-center">
            <!-- logo -->
            <NuxtLink to="/">
                <div class="flex gap-2 items-center mr-4">
                    <NuxtImg src="/logo.png" alt="logo" class="w-10  h-10" />
                    <Client-only>
                        <ColorModeSvg v-show="!collapse" light-fill="#000" dark-fill="#fff" name="daily-words"
                            class-name="h-6 max-md:hidden" />
                    </Client-only>
                </div>
            </NuxtLink>

            <Icon :name='collapse ? "mdi:menu-close" : "mdi:menu-open"' @click="toggleCollapse"
                class="w-8 h-8 cursor-pointer"></Icon>
        </div>
        <!-- 右側 菜單 -->
        <div class="flex items-center">
            <!-- 主題模式 -->
            <ColorMode />
            <!-- github -->
            <GithubIcon url="https://github.com/JingKai1994/DailyWords" tip="Github" icon="i-simple-icons-github" />
        </div>
        <el-divider class="!absolute left-0 bottom-0 !m-0" />
    </el-header>
</template>
<style scoped>
:deep(.el-button + .el-button) {
    margin-left: 2px;
}
</style>