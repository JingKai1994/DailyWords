import { defineStore } from "pinia";
import type { WordItem } from "~/types/wordItem";

export const useFavoriteWordListStore = defineStore("favoriteListState", () => {
    const wordListStore = useWordListStore();

    const favoriteWordList: Ref<WordItem[]> = ref([]);
    const getFavoriteWordList = async () => {
        const favoriteListData = await getDBFavoriteList();
        if (!favoriteListData) return;

        favoriteWordList.value = favoriteListData
            .map((i) => wordListStore.wordMap.get(i.toString()))
            .filter((item): item is WordItem => item !== undefined)
            .sort((a, b) => Number(a[0]) - Number(b[0]));
    };

    const deleteFavoriteList = async () => {
        await deleteDBFavoriteList();
        favoriteWordList.value = [];

        wordListStore.wordList = wordListStore.wordList.map(
            (item: WordItem) => ({
                ...item,
                isFavorite: false,
            })
        );
    };

    return {
        favoriteWordList,
        getFavoriteWordList,
        deleteFavoriteList,
    };
});
