<script lang="ts" setup>
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
import { menuOptionsData } from '~/const'

const route = useRoute()
const getDefaultActive = computed(() => {
    const exactMatch = menuOptionsData.find(menu => route.path === menu.route);
    if (exactMatch) return exactMatch.route;

    //尋找最長的前綴匹配
    const matchingMenu = menuOptionsData
        .filter(menu => route.path.startsWith(menu.route))
        .sort((a, b) => b.route.length - a.route.length)[0];

    return matchingMenu ? matchingMenu.route : '/';
})
const closeMenu = () => {
    collapse.value = true
}
</script>
<template>
    <el-aside class="fixed top-16 bottom-0 z-20" width="auto">
        <el-menu :default-active="getDefaultActive" class="w-dvw md:w-36 lg:w-52 h-full z-50" :collapse="collapse"
            :close-on-click-outside="true" router>
            <el-menu-item v-for="menu in menuOptionsData" :key="menu.route" :index="menu.route" @click="closeMenu">
                <Icon :name="menu.icon" class="w-5 h-5 mr-1.5"></Icon>
                <template #title>
                    <span class="text-lg">{{ menu.name }}</span>
                </template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>
<style lang="scss">
@media (max-width: 768px) {
    .el-menu--collapse {
        width: 0;
        border-right: 0;

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