<script setup lang="ts">
//獲取今日單字列表
const dailyWordListStore = useDailyWordListStore()
const { dailyWordList } = storeToRefs(dailyWordListStore)
const { getDailyWordList } = dailyWordListStore

onMounted(() => {
    getDailyWordList()
})
//判斷是否閱讀完今日單字跳出測驗按鈕
const readFinish = ref(false)
const handleChange = (currentIndex: Number) => {
    const lastIndex = dailyWordList.value.length - 1
    if (currentIndex === lastIndex) {
        readFinish.value = true
    }
}

const dialogVisibleStore = useDialogVisibleStore()
const { dialogVisibleToogle } = dialogVisibleStore
</script>

<template>
    <div class="w-full text-center">
        <p class="text-xl mb-5 font-Unica tracking-[1em]"> {{ $dayjs().format('dddd. MMM D. YYYY') }}</p>
        <h1 class="w-full text-5xl text-center mb-10 font-Unica">
            <!-- <Icon name="fluent:book-letter-24-filled" class="w-8 h-8"></Icon> -->
            DAILY WORDS
        </h1>
        <el-card class="mx-auto w-11/12 md:w-2/3 lg:w-5/12 mb-12 bg-mix" :body-style="{ padding: 0 }">
            <el-carousel arrow="always" :autoplay="false" :indicator-position="'none'" :loop="false"
                @change="handleChange">
                <el-carousel-item v-for="(item, idx) in dailyWordList" :key="item[0]">
                    <WordCard :wordItem="item" :dailyPage="true"></WordCard>
                    <div class="absolute right-5 top-3 z-50">
                        <span class="text-brown/80 text-sm font-bold">{{ idx + 1 }} / {{
                            Object.keys(dailyWordList).length
                            }}</span>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <template #footer v-if="readFinish">
                <div class="w-full flex justify-center">
                    <el-button type="success" size="large" round @click="dialogVisibleToogle">
                        <Icon name="healthicons:i-exam-qualification-outline" class="w-6 h-6 mr-1"></Icon>
                        <span class="text-base font-bold">測驗今日單字</span>
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>
<style lang="scss">
.dark .el-carousel__arrow {
    color: #ffffff;
}

.el-carousel__arrow {
    line-height: 3rem;
    width: 3rem;
    height: 3rem;
    font-size: 1.875rem;
    color: #000000;
    background-color: transparent;

    &--left {
        left: 0.1rem;
    }

    &--right {
        right: 0.1rem;
    }
}
</style>