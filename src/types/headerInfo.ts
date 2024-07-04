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