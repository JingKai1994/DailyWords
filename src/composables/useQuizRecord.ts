import { db } from "~/types/database";
import type { RecordItem, HandleAnswerItem, AnswerItem } from "~/types/record";

//添加紀錄
export const addRecordDB = async (RecordItem: RecordItem) => {
    await db.transaction("rw", db.quizRecord, async () => {
        let quizRecord = await db.quizRecord.get("record");

        if (!quizRecord) {
            quizRecord = { id: "record", data: [] };
        }

        quizRecord.data = [...quizRecord.data, RecordItem];
        await db.quizRecord.put(quizRecord);
    });
};

//獲取紀錄列表
export const getRecordListDB = async (): Promise<RecordItem[] | undefined> => {
    const quizRecord = await db.quizRecord.get("record");
    return quizRecord?.data;
};

//刪除指定紀錄數據
export const deleteRecordByIdxDB = async (idx: number) => {
    let quizRecord = await db.quizRecord.get("record");
    if (quizRecord) {
        quizRecord.data.splice(idx, 1);
        await db.quizRecord.put(quizRecord);
    }
};

//刪除紀錄列表
export const deleteRecordListDB = async () => {
    await db.quizRecord.clear();
};

//尋找對應的標題
import { quizOptionsData } from "~/const";
export const getTitle = (recordData: RecordItem) => {
    const target = quizOptionsData
        .flatMap((item) => item.group)
        .find((item) => item.type === recordData.type);

    return target ? target.name : null;
};

//計算分數
export const getScore = (list: HandleAnswerItem[] | AnswerItem[]) => {
    return Math.round(
        list.filter((item) => item.result === true).length * (100 / list.length)
    );
};
