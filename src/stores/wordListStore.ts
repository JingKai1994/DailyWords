import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { WordItem } from "~/types";

export const useWordListStore = defineStore("listState", () => {
    const wordList: Ref<WordItem[]> = shallowRef([]);
    //新增 Map 來存儲單詞，提高查找效率
    const wordMap: Ref<Map<string, WordItem>> = ref(new Map());

    const getWordList = async () => {
        try {
            const [{ data }, favoriteList] = await Promise.all([
                useSheetData(),
                getDBFavoriteList(),
            ]);
            const result: WordItem[] = (data.value as { values: WordItem[] })
                .values;
            const favoriteSet = new Set(favoriteList);

            wordList.value = result.map((item) => ({
                ...item,
                isFavorite: favoriteSet.has(Number(item[0])),
            }));

            // 更新 Map
            wordMap.value = new Map(
                wordList.value.map((item) => [item[0], item])
            );
        } catch {
            ElNotification({
                title: "Error",
                message: "google sheet api error",
                type: "error",
            });
        }
    };

    const favoritetStore = useFavoriteListStore();
    const toggleFavorite = async (number: string) => {
        const numberToNum = Number(number);
        const newFavoriteStatus = await toogleFavoriteDB(numberToNum);

        const word = wordMap.value.get(number);
        if (word) {
            const updateItem = {
                ...word,
                isFavorite: newFavoriteStatus,
            };
            wordMap.value.set(number, updateItem);
            const index = numberToNum - 1;
            if (index !== -1) {
                wordList.value[index] = updateItem;
            }

            triggerRef(wordList);
        }
        if (!newFavoriteStatus) {
            favoritetStore.favoriteList = favoritetStore.favoriteList.filter(
                (item) => item[0] !== number
            );
        }
    };

    return {
        wordList,
        wordMap,
        getWordList,
        toggleFavorite,
    };
});
