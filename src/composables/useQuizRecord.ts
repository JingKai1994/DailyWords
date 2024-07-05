import { db } from "~/types/database";
import type { RecordItem} from "~/types/record";

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
