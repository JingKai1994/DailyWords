import Dexie from "dexie";
import type { Table } from "dexie";

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

export class DailyWordsDB extends Dexie {
    dailyRecords!: Table<DailyRecord>;
    favorite!: Table<Favorite>;

    constructor() {
        super("DailyWordsDB");
        this.version(1).stores({
            dailyRecords: "id",
        });

        this.version(1).stores({
            favorite: "id",
        });
    }
}

export const db = new DailyWordsDB();
