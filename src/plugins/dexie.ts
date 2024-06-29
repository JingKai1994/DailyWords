import { db } from "~/types/database";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            dexie: db,
        },
    };
});
