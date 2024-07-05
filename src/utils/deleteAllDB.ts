import Dexie from "dexie";

export const deleteAllDB = async () => {
    const databases = await Dexie.getDatabaseNames();

    for (const dbName of databases) {
        await Dexie.delete(dbName);
    }
};
