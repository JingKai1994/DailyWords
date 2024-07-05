import { db } from "~/types/database";

//添加/刪除收藏
export const toogleFavoriteDB = async (number: number) => {
    let state;
    await db.transaction("rw", db.favorite, async () => {
        let favoriteRecord = await db.favorite.get("favorite");

        if (!favoriteRecord) {
            favoriteRecord = { id: "favorite", data: [] };
        }
        if (favoriteRecord.data.includes(number)) {
            favoriteRecord.data = favoriteRecord.data.filter(
                (item) => item !== number
            );
            state = false;
        } else {
            favoriteRecord.data = [...favoriteRecord.data, number];
            state = true;
        }
        await db.favorite.put(favoriteRecord);
    });
    return state;
};

//獲取收藏列表
export const getFavoriteListDB = async (): Promise<number[] | undefined> => {
    const record = await db.favorite.get("favorite");
    return record?.data;
};

//刪除收藏列表
export const deleteFavoriteListDB = async () => {
    await db.favorite.clear();
};
