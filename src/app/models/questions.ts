import { Answer } from "./answer";

export interface Question {
    id: number;
    title: string;
    desc: string;
    answer: Answer;
}