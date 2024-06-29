<script setup lang="ts">
const colorMode = useColorMode()
//設置主題模式
const isDark = computed({
    get() {
        return colorMode.value === 'dark';
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    }
});
// 判断是否支持 startViewTransition API
const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// 切换动画
async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
    if (!enableTransitions()) {
        isDark.value = !isDark.value
        return
    }

    // 获取到最远角的距离
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    );

    const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
    ]

    await document.startViewTransition?.(async () => {
        isDark.value = !isDark.value
        await nextTick()
    }).ready

    document.documentElement.animate(
        { clipPath: isDark.value ? clipPath.reverse() : clipPath },
        {
            duration: 300,
            easing: 'ease-in',
            pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
    )
}
</script>
<template>
    <ColorScheme placeholder="..." tag="span">
        <el-tooltip :content="`切换${isDark ? '亮色' : '暗色'}模式`" placement="bottom">
            <el-button circle text @click="toggleDark">
                <Icon :name="isDark ? 'heroicons:moon-solid' : 'heroicons:sun-solid'" class="h-5 w-5" />
            </el-button>
        </el-tooltip> 
    </ColorScheme>
</template>
<style>
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
    z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
    z-index: 9999;
}
</style>