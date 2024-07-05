<script setup>
const wordListStore = useWordListStore()
const { wordList } = storeToRefs(wordListStore)
const { getWordList } = wordListStore
if (wordList.value.length === 0) {
    getWordList()
}
</script>

<template>
    <el-config-provider>
        <el-container direction="vertical" class="h-full">
            <!-- header -->
            <Header />
            <!-- main -->
            <el-main
                class="!flex flex-col h-[calc(100vh-60px-20px)] bg-[#f5f5f5] dark:bg-transparent !p-0 overflow-auto relative"
                id="scroll" ref="scrollElement">
                <Menu />
                <slot />
            </el-main>
            <!-- footer -->
            <!-- <Footer /> -->
            <ScollToTop />
        </el-container>
    </el-config-provider>
</template>
