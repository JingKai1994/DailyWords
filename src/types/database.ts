import Dexie from "dexie";
import type { Table } from "dexie";
import type { RecordItem } from "~/types/record";

export interface DailyRecord {
    id: "daily";
    data: {
        [date: string]: number[];
    };
}

export interface Favorite {
    id: "favorite";
    data: number[];
}

export interface Record {
    id: "record";
    data: RecordItem[];
}

export class DailyWordsDB extends Dexie {
    dailyRecords!: Table<DailyRecord>;
    favorite!: Table<Favorite>;
    quizRecord!: Table<Record>;

    constructor() {
        super("DailyWordsDB");
        this.version(1).stores({
            dailyRecords: "id",
        });

        this.version(1).stores({
            favorite: "id",
        });

        this.version(1).stores({
            quizRecord: "id",
        });
    }
}

export const db = new DailyWordsDB();
