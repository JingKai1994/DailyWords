/**
 * @description: 將時間轉成 "YYYY年MM月DD日 (HH:mm)" 格式
 */
export const formatDateTime = (date: Date, needTime: Boolean = true) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const result = needTime
        ? `${year}年${month}月${day}日 ${hours}:${minutes}`
        : `${year}年${month}月${day}日`;

    return result;
};