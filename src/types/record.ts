export interface HandleAnswerItem {
    result: boolean;
    question: string;
    answer: string;
    correct: string;
}

export interface AnswerItem {
    id: string;
    answer: string;
    result: boolean;
}

export interface RecordItem {
    type: string;
    startTime: number;
    endTime: number;
    answerList: AnswerItem[];
}
