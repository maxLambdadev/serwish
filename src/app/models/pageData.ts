export interface PageData {
    last_page: number;
    total: number;
    data?: Array<any>;
}

export interface ExtPageData {
    category: any;
    list: PageData;
}

