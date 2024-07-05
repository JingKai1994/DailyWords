import type { RecordItem, HandleAnswerItem, AnswerItem } from "~/types/record";

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
