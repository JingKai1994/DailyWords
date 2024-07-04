import type { OptionData } from "~/types/optionData";
import type { Menu } from "~/types/menu";
import type { QuizOption } from "~/types/quiz";

/**
 * @description: 字母選擇
 */
export const alphabetOptionsData: OptionData[] = [
    {
        id: "a",
        name: "A",
    },
    {
        id: "b",
        name: "B",
    },
    {
        id: "c",
        name: "C",
    },
    {
        id: "d",
        name: "D",
    },
    {
        id: "e",
        name: "E",
    },
    {
        id: "f",
        name: "F",
    },
    {
        id: "g",
        name: "G",
    },
    {
        id: "h",
        name: "H",
    },
    {
        id: "i",
        name: "I",
    },
    {
        id: "j",
        name: "J",
    },
    {
        id: "k",
        name: "K",
    },
    {
        id: "l",
        name: "L",
    },
    {
        id: "m",
        name: "M",
    },
    {
        id: "n",
        name: "N",
    },
    {
        id: "o",
        name: "O",
    },
    {
        id: "p",
        name: "P",
    },
    {
        id: "q",
        name: "Q",
    },
    {
        id: "r",
        name: "R",
    },
    {
        id: "s",
        name: "S",
    },
    {
        id: "t",
        name: "T",
    },
    {
        id: "u",
        name: "U",
    },
    {
        id: "v",
        name: "V",
    },
    {
        id: "w",
        name: "W",
    },
    {
        id: "x",
        name: "X",
    },
    {
        id: "y",
        name: "Y",
    },
    {
        id: "z",
        name: "Z",
    },
];
/**
 * @description: 詞性選擇
 */
export const partsOptionsData: OptionData[] = [
    {
        id: "n",
        name: "n 名詞",
    },
    {
        id: "adj",
        name: "adj 形容詞",
    },
    {
        id: "adv",
        name: "adv 副詞",
    },
    {
        id: "conj",
        name: "conj 連接詞",
    },
    {
        id: "num",
        name: "num 數詞",
    },
    {
        id: "prep",
        name: "prep 介系詞",
    },
    {
        id: "v",
        name: "v 動詞",
    },
    {
        id: "aux",
        name: "aux 助動詞",
    },
    {
        id: "pron",
        name: "pron 代詞",
    },
    {
        id: "art",
        name: "art 冠詞",
    },
    {
        id: "abbr",
        name: "abbr 縮寫",
    },
    {
        id: "det",
        name: "det 限定詞",
    },
];

/**
 * @description: 側欄
 */
export const menuOptionsData: Menu[] = [
    {
        name: "今日單字",
        icon: "fluent:book-letter-24-filled",
        route: "/",
    },
    {
        name: "單字列表",
        icon: "tabler:list-letters",
        route: "/wordlist",
    },
    {
        name: "收藏單字",
        icon: "material-symbols-light:kid-star",
        route: "/favorite",
    },
    {
        name: "單字測驗",
        icon: "healthicons:i-exam-qualification-outline",
        route: "/quiz",
        sub: [
            {
                name: "單字填空",
                subItems: [
                    {
                        icon: "healthicons:i-exam-qualification-outline",
                        route: "/cloze-words",
                        name: "單字填空",
                    },
                    {
                        icon: "healthicons:i-exam-qualification-outline",
                        route: "/cloze-daily",
                        name: "今日單字填空",
                    },
                    {
                        icon: "healthicons:i-exam-qualification-outline",
                        route: "/cloze-favorite",
                        name: "收藏單字填空",
                        show: false,
                    },
                ],
            },
            {
                name: "單字選擇",
                subItems: [
                    {
                        icon: "healthicons:i-exam-qualification-outline",
                        route: "/choice-words",
                        name: "單字選擇",
                    },
                    {
                        icon: "healthicons:i-exam-qualification-outline",
                        route: "/choice-daily",
                        name: "今日單字選擇",
                    },
                    {
                        icon: "healthicons:i-exam-qualification-outline",
                        route: "/choice-favorite",
                        name: "收藏單字選擇",
                        show: false,
                    },
                ],
            },
        ],
    },
    {
        name: "測驗紀錄",
        icon: "lucide:notebook-text",
        route: "/record",
    },
    {
        name: "更多資訊",
        icon: "bi:info-circle-fill",
        route: "/info",
    },
];

/**
 * @description: 測驗項目
 */
export const quizOptionsData: QuizOption[] = [
    {
        type: "cloze",
        name: "填空題型",
        icon: "material-symbols:edit-square-outline-rounded",
        group: [
            {
                type: "cloze-word",
                name: "單字填空測驗",
                description: "從「單字資料庫」隨機取得 10 個單字進行填空測驗",
            },
            {
                type: "cloze-dailyWord",
                name: "今日單字填空測驗",
                description: "使用「今日單字」進行填空測驗",
            },
            {
                type: "cloze-favoriteWord",
                name: "收藏單字填空測驗",
                description: "從「收藏單字」隨機取得 10 個單字進行填空測驗",
                judge: true,
            },
        ],
    },
    {
        type: "choice",
        name: "選擇題型",
        icon: "mingcute:choice-line",
        group: [
            {
                type: "choice-word",
                name: "單字選擇測驗",
                description: "從「單字資料庫」隨機取得 10 個單字進行選擇測驗",
            },
            {
                type: "choice-dailyWord",
                name: "今日單字選擇測驗",
                description: "使用「今日單字」進行選擇測驗",
            },
            {
                type: "choice-favoriteWord",
                name: "收藏單字選擇測驗",
                description: "從「收藏單字」隨機取得 10 個單字進行選擇測驗",
                judge: true,
            },
        ],
    },
];
