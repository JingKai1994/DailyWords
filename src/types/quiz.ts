export type QuizType =
    | "cloze-word"
    | "cloze-dailyWord"
    | "cloze-favoriteWord"
    | "choice-word"
    | "choice-dailyWord"
    | "choice-favoriteWord";

type QuizItem = {
    type: string;
    name: string;
    description: string;
    judge?: boolean;
};

export type QuizOption = {
    type: string;
    name: string;
    icon: string;
    group: QuizItem[];
};
