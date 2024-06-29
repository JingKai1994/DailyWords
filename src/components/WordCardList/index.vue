<script setup lang="ts">
const listData = defineModel('listData', {
    type: Object,
    default: '{}'
})
const currentPage = defineModel('currentPage', {
    type: Number,
    default: 1
})
const loadTotalPage = defineModel('loadTotalPage', {
    type: Number,
    default: 1
})

//採用IntersectionObserver 檢測是否接近底部繼續加載數據
const scrollElement: Ref<HTMLElement | null> = ref(null)
const lastItemRef: Ref<HTMLLIElement | null> = ref(null)

const setItemRef = (el: Element | ComponentPublicInstance | null, idx: number) => {
    if (idx === listData.value.length - 1) {
        if (el instanceof HTMLLIElement) {
            lastItemRef.value = el
        } else {
            lastItemRef.value = null
        }
    }
}
let observer: IntersectionObserver | null = null
const observerCallback: IntersectionObserverCallback = (entries) => {
    const lastItem = entries[0]
    if (lastItem.isIntersecting && currentPage.value < loadTotalPage.value) {
        currentPage.value++
    }
}

watch(lastItemRef, (el) => {
    if (observer) {
        observer.disconnect()
    }
    if (el) {
        observer = new IntersectionObserver(observerCallback, {
            root: scrollElement.value,
            threshold: 0.1
        })
        observer.observe(el)
    }
})
onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})

const dialogVisibleStore = useDialogVisibleStore()
const { dialogVisibleToogle } = dialogVisibleStore

const wordListStore = useWordListStore()
const { wordMap } = storeToRefs(wordListStore)

const wordNo = ref("")
const wordItem = computed(() => {
    return wordMap.value.get(wordNo.value)
})
const openDialog = (word: string) => {
    wordNo.value = word
    dialogVisibleToogle()
}
</script>

<template>
    <ul v-if="listData.length" class="w-5/6 md:w-4/6 flex flex-wrap mx-auto">
        <li v-for="(word, idx) in listData" :key="word[0]" v-memo="[word]" :ref="(el) => setItemRef(el, idx)"
            @click="openDialog(word[0])"
            class="w-full mb-3 md:w-[calc((100%-3rem)/3)] md:mr-6 md:[&:nth-child(3n)]:mr-0">
            <div class="el-card h-full p-3 block rounded-lg cursor-pointer shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] dark:shadow-[rgba(51,51,51,0.8)]"
                aria-hidden="true">
                <div class="relative">
                    <p class="text-lg font-bold text-red-900 dark:text-red-500 break-all">{{ word[1] }}</p>
                    <div class="text-sm leading-6">
                        <span class="mr-2.5 font-bold">( {{ word[2] }}. )</span>
                        <span>{{ word[3] }}</span>
                    </div>
                    <FavoriteIcon v-model:isFavorite="word.isFavorite" v-model:number="word[0]" class="-top-1 right-0">
                    </FavoriteIcon>
                </div>
            </div>
        </li>
    </ul>
    <p v-else class="w-5/6 md:w-4/6 mt-10 py-10 text-xl text-center">
        目前沒有任何單字
    </p>

    <Dialog>
        <WordCard :wordItem="wordItem"></WordCard>
    </Dialog>
</template>