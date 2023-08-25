import { CategoryType } from "./categoryType";

export interface CategoriesFilterArgs {
    locale?: string;
    page?: number;
    perPage?: number;
    type?: CategoryType;
}