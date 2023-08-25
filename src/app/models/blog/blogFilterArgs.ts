export interface BlogFilterArgs {
    locale?: string;
    page?: number;
    perPage?: number;
    categories?: Array<number>;
    filterBy?: string;
}