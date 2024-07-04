<script setup lang="ts">
import type { WordItem } from "~/types/wordItem";
import type { RecordItem, AnswerItem } from "~/types/database";
import getRandomElements from "~/utils/randomNumbers";

const type = defineModel<string>('type', { default: '' }) //測驗種類 (填空. 選擇 - 單字. 今日. 收藏)
const index = defineModel<number>('index', { default: 0 }) //目前題數
const quizLength = defineModel<number>('quizLength', { default: 0 }) //總題數
const input = defineModel<string>('input', { default: '' }) //輸入
const question = defineModel<WordItem>('question', { default: { 0: '', 1: '', 2: '', 3: '' } }) //當前題目資訊
const answer = defineModel<AnswerItem[]>('answer', { default: () => [] })  //紀錄所有答案
const time = defineModel<{ startTime: number; endTime: number }>('time', {
    default: () => ({ startTime: 0, endTime: 0 })
}) //計時
const recordData = defineModel<RecordItem | null>('recordData', { default: null }) //所有紀錄(type 答案)

const quizType = computed(() => type.value.split('-')[0])
const radioGroup: Ref<WordItem[]> = ref([])

watchEffect(() => {
    if (quizType.value === 'choice') {
        const wordListStore = useWordListStore()
        const { wordList } = storeToRefs(wordListStore)
        const randomElements = getRandomElements(
            wordList.value.length,
            3,
            [Number(question[0])]
        );

        const index = Math.floor(Math.random() * 3) + 1;
        radioGroup.value = randomElements.map(
            (i) => wordList.value[i - 1]
        )
        radioGroup.value.splice(index, 0, question.value)
    }
})

const emptyAnswer = computed(() => input.value === '')
const submitAnswer = async () => {
    //紀錄回答
    answer.value.push({ id: question.value[0], answer: input.value })
    //當為最後一題時儲存至indexedDB
    if (index.value === (quizLength.value - 1)) {
        time.value.endTime = Date.now()

        const addRecordData = {
            type: type.value,
            startTime: time.value.startTime,
            endTime: time.value.endTime,
            answerList: answer.value
        }

        await addRecordDB(addRecordData);
        recordData.value = addRecordData
    }
    //重製input並進入下一題
    input.value = ''
    index.value++
}

const leave = () => {
    ElMessageBox.confirm(
        '測驗紀錄將不會被保存',
        '確定要離開測驗？',
        {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'error',
        }
    )
        .then(() => {
            navigateTo('/quiz')
        })
}
</script>

<template>
    <div
        class="el-card h-full mb-5 p-6 flex flex-col items-center !rounded-xl cursor-pointer shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] dark:shadow-[rgba(51,51,51,0.8)]">
        <div class="w-full flex justify-between items-center">
            <h3 class="text-xl font-bold text-red-900 dark:text-red-500">第 {{ index + 1 }} 題</h3>
            <div class="flex items-center text-gray-500 hover:text-gray-400" @click="leave">
                <Icon name="pepicons-pop:leave" class="mr-1"></Icon>
                離開測驗
            </div>
        </div>

        <div class="w-full mb-5 font-bold text-base">
            <template v-if="quizType === 'cloze'">
                <input type="text" v-model="input"
                    class="w-full h-12 my-6 py-3 px-4 leading-4 rounded-md text-lg bg-gray-100 dark:bg-black/10"
                    placeholder="請輸入正確的英文單字">
                <SynthVoiceBtn :word="question[1]" />
                <span class="mr-2.5">( {{ question[2] }} .)</span>
                <span> {{ question[3] }} </span>
            </template>
            <template v-else-if="quizType === 'choice'">
                <div class="my-6 md:my-10 flex flex-wrap">
                    <SynthVoiceBtn :word="question[1]" />
                    <span class="mr-2.5">( {{ question[2] }} .)</span>
                    <span> {{ question[3] }} </span>
                </div>

                <el-radio-group v-model="input" class="w-full flex flex-col items-start">
                    <el-radio v-for="radioItem in radioGroup" :key="radioItem[0]" :value="radioItem[1]"
                        class="w-full !m-0" size="large">
                        {{ radioItem[1] }}
                    </el-radio>
                </el-radio-group>
            </template>
            <template v-else>
                <p>出了點問題</p>
                <NuxtLink to="/quiz">
                    <el-button type="danger" size="large" class="w-24">離開測驗</el-button>
                </NuxtLink>
            </template>
        </div>

        <div class="w-full flex justify-center">
            <el-button type="info" size="large" class="mx-2 w-24" @click="submitAnswer" v-if="quizType === 'cloze'">
                <span class="text-base">略過</span>
            </el-button>
            <el-button type="primary" size="large" class="mx-2 w-24" @click="submitAnswer" :disabled="emptyAnswer">
                <span class="text-base">送出</span>
            </el-button>
        </div>
    </div>
</template>
<style>
.el-radio.el-radio--large span.el-radio__label {
    font-size: 1.2rem;
}
</style>