/**
 * @description: github資訊
 */
export type Github = {
    icon: string;
    url?: string;
    tip?: string;
};

/**
 * @description: 根據主題模式 填充SVG顏色
 */
export type ColorModeSvg = {
    name: string; // svg 路徑
    lightFill?: string; // 亮色模式填充
    darkFill?: string; // 暗色模式填充
    className?: string; // 圖片樣式
};

/**
 * @description: 選項
 */
export type optionData = {
    id: string;
    name: string;
};

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
