<script lang="ts" setup>
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
import { menuOptionsData } from '~/const'

const closeMenu = () => {
    collapse.value = true
}
</script>
<template>
    <el-menu :default-active="$route.path" class="w-full md:w-36 lg:w-52 z-50 !fixed top-[61px] bottom-0"
        :collapse="collapse" :close-on-click-outside="true" router>
        <el-menu-item v-for="menu in menuOptionsData" :key="menu.route" :index="menu.route" @click="closeMenu">
            <Icon :name="menu.icon" class="w-5 h-5 mr-1.5"></Icon>
            <template #title>
                <span class="text-lg">{{ menu.name }}</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>
<style lang="scss">
@media (max-width: 768px) {
    .el-menu--collapse {
        width: 0;

        .el-menu-item {
            display: none;
        }
    }
}

.dark .el-menu {
    --el-menu-active-color: #fde68a;
    --el-menu-bg-color: #1a1b23;
    --el-menu-hover-bg-color: #374151;
}

.el-menu-item {
    .el-menu-tooltip__trigger {
        justify-content: center;
        padding: 0;
    }
}
</style>