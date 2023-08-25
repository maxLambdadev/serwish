export interface ServiceFilterArgs {
    ids?: any;
    locale?: string;
    personal?: string;
    page?: number;
    perPage?: number;
    has_serwish_quality?: boolean;
    cities?: Array<number>;
    categories?: Array<number>;
    specialists?: Array<number>;
    filterby?: string;
    noSort?: number
}