import { db } from "~/types/database";
import type { RecordItem } from "~/types/database";
const dayjs = useDayjs();

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

//獲取收藏列表
export const getDBRecordList = async (): Promise<number[] | undefined> => {
    const record = await db.favorite.get("favorite");
    return record?.data;
};

//獲取單字數據 (若無日期則獲取今日)
export const getRecordData = async (
    day?: string
): Promise<number[] | undefined> => {
    day = day ? day : dayjs().format("YYYY-MM-DD");
    const record = await db.dailyRecords.get("daily");
    return record?.data[day];
};

//刪除收藏列表
export const deleteDBRecordList = async () => {
    await db.favorite.clear();
};
