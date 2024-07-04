/**
 * @description: 單個單字 0-編號， 1-英文，2-詞性，3-中文，isFavorite是否在收藏裡
 */
export interface WordItem {
    0: string;
    1: string;
    2: string;
    3: string;
    isFavorite?: boolean;
}
