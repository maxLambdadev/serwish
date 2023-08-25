export interface Answer {
    id: number;
    title: string;
    desc: string;
    subdesc: string;
    list: {
        item1: string;
        item2: string;
    };
    button: string
}