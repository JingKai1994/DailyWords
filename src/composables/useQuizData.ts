import type { WordItem } from "~/types/wordItem";
import getRandomElements from "~/utils/randomNumbers";

export function useQuizData() {
    const quizWordList: Ref<WordItem[]> = ref([]);

    const randomElements = (list: WordItem[]) => {
        const randomNumberList = getRandomElements(list.length, 10);
        if (randomNumberList.length === 0) {
            quizWordList.value = list;
        } else {
            quizWordList.value = randomNumberList.map((i) => list[i - 1]);
        }
    };

    const loadQuizData = async (type: string) => {
        type = type.split("-")[1];
        switch (type) {
            case "word":
                const wordListStore = useWordListStore();
                const { wordList } = storeToRefs(wordListStore);
                const { getWordList } = wordListStore;
                await getWordList();
                randomElements(wordList.value);
                break;
            case "dailyWord":
                const dailyWordListStore = useDailyWordListStore();
                const { dailyWordList } = storeToRefs(dailyWordListStore);
                const { getDailyWordList } = dailyWordListStore;
                await getDailyWordList();
                quizWordList.value = [...dailyWordList.value];
                break;
            case "favoriteWord":
                const favoriteWordListStore = useFavoriteWordListStore();
                const { favoriteWordList } = storeToRefs(favoriteWordListStore);
                const { getFavoriteWordList } = favoriteWordListStore;
                await getFavoriteWordList();
                randomElements(favoriteWordList.value);
                break;
        }
        shuffle(quizWordList.value);
    };

    return { quizWordList, loadQuizData };
}
