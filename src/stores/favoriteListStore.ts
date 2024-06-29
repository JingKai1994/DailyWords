import { defineStore } from "pinia";
import type { WordItem } from "~/types";

export const useFavoriteListStore = defineStore("favoriteListState", () => {
    const wordListStore = useWordListStore();

    const favoriteList: Ref<WordItem[]> = ref([]);
    const getFavoriteList = async () => {
        const favoriteListData = await getDBFavoriteList();
        if (!favoriteListData) return;

        favoriteList.value = favoriteListData
            .map((i) => wordListStore.wordMap.get(i.toString()))
            .filter((item): item is WordItem => item !== undefined)
            .sort((a, b) => Number(a[0]) - Number(b[0]));
    };

    const deleteFavoriteList = async () => {
        await deleteDBFavoriteList();
        favoriteList.value = [];

        wordListStore.wordList = wordListStore.wordList.map((item: WordItem) => ({
            ...item,
            isFavorite: false,
        }));
    };

    return {
        favoriteList,
        getFavoriteList,
        deleteFavoriteList,
    };
});
