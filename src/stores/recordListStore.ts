import { defineStore } from "pinia";
import type { RecordItem } from "~/types/record";

export const useRecordListStore = defineStore("recordListState", () => {
    const recordList: Ref<RecordItem[]> = ref([]);
    const getRecordList = async () => {
        const recordListData = await getRecordListDB();
        if (!recordListData) return;

        recordList.value = recordListData;
    };

    const deleteRecordByIdx = async (targetIdx: number) => {
        await deleteRecordByIdxDB(targetIdx);

        recordList.value.splice(targetIdx, 1);
    };
    const deleteRecordList = async () => {
        await deleteRecordListDB();
        recordList.value.length = 0;
    };

    return {
        recordList,
        getRecordList,
        deleteRecordByIdx,
        deleteRecordList,
    };
});
