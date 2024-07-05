import { db } from "~/types/database";

const dayjs = useDayjs();

//添加今日單字數據
export const addTodayDataDB = async (numbers: number[]) => {
    const today = dayjs().format("YYYY-MM-DD");
    
    await db.transaction("rw", db.dailyRecords, async () => {
        let record = await db.dailyRecords.get("daily");
        if (!record) {
            record = { id: "daily", data: {} };
        }
        record.data[today] = numbers;
        await db.dailyRecords.put(record);
    });
};

//獲取單字數據 (若無日期則獲取今日)
export const getDailyDataDB = async (
    day?: string
): Promise<number[] | undefined> => {
    day = day ? day : dayjs().format("YYYY-MM-DD");
    const record = await db.dailyRecords.get("daily");
    return record?.data[day];
};
