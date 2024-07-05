import { defineStore } from "pinia";
import getRandomElements from "~/utils/randomNumbers";
import type { WordItem } from "~/types/wordItem";

export const useDailyWordListStore = defineStore("dailyListState", () => {
    const wordListStore = useWordListStore();
    const dailyWordList: Ref<WordItem[]> = ref([]);

    const getDailyWordList = async () => {
        let randomElements;
        const dayilyData = await getDailyDataDB();
        if (dayilyData) {
            randomElements = dayilyData;
        } else {
            randomElements = getRandomElements(
                wordListStore.wordList.length,
                10
            );
            await addTodayDataDB(randomElements);
        }

        if (randomElements.length === 0) {
            dailyWordList.value = wordListStore.wordList;
        } else {
            dailyWordList.value = randomElements.map(
                (i) => wordListStore.wordList[i - 1]
            );
        }
    };

    const toggleDailyFavorite = async (number: string) => {
        await wordListStore.toggleFavorite(number);

        const index = dailyWordList.value.findIndex(
            (item) => item[0] === number
        );
        if (index !== -1) {
            const updatedWord = wordListStore.wordMap.get(number);
            if (updatedWord) {
                dailyWordList.value[index] = { ...updatedWord };
            }
        }
    };

    return {
        dailyWordList,
        getDailyWordList,
        toggleDailyFavorite,
    };
});
