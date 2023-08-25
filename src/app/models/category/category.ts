export interface Category {
    id: string;
    isActive: string;
    author_id: string;
    type: string;
    translated: [
        {
            id: string;
            name: string;
            title: string;
            description: string;
            slug: string;
            meta: string;
            category_id: number;
            created_at: string;
            updated_at: string;
        }
    ];
    selected: false;
    childrens?: Array<Category>;
    parentTitle?: string;
}