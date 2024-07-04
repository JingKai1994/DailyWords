<script setup lang="ts">
const colorMode = useColorMode()

import type { ColorModeSvg } from '~/types/headerInfo'

defineProps<ColorModeSvg>()

// 判斷是否暗色模式
const isDark = colorMode.preference === 'dark'
</script>

<template>
    <nuxt-icon :name="name" :fill="isDark ? darkFill : lightFill" :class="className" />
</template>

<style>
.nuxt-icon svg {
    margin-bottom: 0 !important;
    width: auto !important;
    height: auto !important;
}
</style>