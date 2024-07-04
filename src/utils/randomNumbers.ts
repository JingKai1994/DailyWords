/**
 * 從指定範圍內隨機選擇不重複的元素
 * @param arrayLen 可選範圍的長度
 * @param size 需要選擇的元素數量
 * @param selectedArr 已經被選擇的元素索引數組（可選）
 * @returns 隨機選擇的元素索引數組，如果參數無效則返回空數組
 */
export default function getRandomElements(
    arrayLen: number,
    size: number,
    selectedArr: number[] = []
): number[] {
    if (size > arrayLen || size <= 0) {
        return [];
    }

    const result: number[] = [];
    let selectedIndices: Set<number> = new Set(selectedArr);

    while (result.length < size) {
        const index = Math.floor(Math.random() * arrayLen) + 1;
        if (!selectedIndices.has(index)) {
            result.push(index);
            selectedIndices.add(index);
        }
    }

    return result;
}
