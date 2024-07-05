<script setup lang="ts">
import type { QuizType } from '~/types/quiz'
import type { RecordItem, AnswerItem } from "~/types/record";
const route = useRoute()
const { quizWordList, loadQuizData } = useQuizData()

const isLoading = ref(true)

const type = route.params.type as QuizType
const time = ref({ startTime: 0, endTime: 0 })

//取得資料並開始計時
const startQuiz = async () => {
    isLoading.value = true
    try {
        await loadQuizData(type)
        time.value.startTime = Date.now()
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await startQuiz();
})

//當前題數
const index = ref(0)
const question = computed(() => quizWordList.value[index.value])
//總題數，是否完成
const quizLength = computed(() => quizWordList.value.length)
const complete = computed(() => index.value === quizLength.value)
//輸入資訊
const input = ref('')
const answer: AnswerItem[] = []
const recordData = ref<RecordItem | null>(null)

// 重置所有相關狀態
const again = async () => {
    isLoading.value = true
    try {
        index.value = 0
        input.value = ''
        answer.length = 0
        recordData.value = null
        time.value.startTime = 0
        time.value.endTime = 0

        await startQuiz()
    } finally {
        isLoading.value = false
    }
}
</script>
<template>
    <Loading v-if="isLoading">
        <p class="text-lg absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2">題目加載中</p>
    </Loading>
    <div v-else class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 bg-darkbg">
        <h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Vocabulary Test</h1>
        <div class="w-full">
            <div class="w-full flex items-center justify-between flex-col mb-4">
                <div class="md:w-1/3 flex flex-col mb-4">
                    <div v-if="complete && recordData">
                        <QuizResult :recordData="recordData"></QuizResult>
                        <div class="my-5 flex justify-center">
                            <button type="button" @click="again"
                                class="w-105 py-2 px-5 mx-5 text-lg text-center text-gray-700 bg-white rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] hover:text-white hover:bg-blue-400 dark:hover:bg-slate-300">
                                再次測驗
                            </button>
                            <NuxtLink to="/quiz">
                                <button type="button"
                                    class="w-105 py-2 px-5 mx-5 text-lg text-center text-gray-700 bg-white rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] hover:text-white hover:bg-blue-400 dark:hover:bg-slate-300">
                                    離開測驗
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="w-full" v-else>
                        <QuizCard v-model:time="time" v-model:type="type" v-model:index="index"
                            v-model:quizLength="quizLength" v-model:input="input" v-model:question="question"
                            v-model:answer="answer" v-model:recordData="recordData">
                        </QuizCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>