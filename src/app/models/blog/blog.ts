import { Image } from '@models/index';

export interface Blog {
    id: number;
    author_id: number;
    viewCount: number;
    isActive: boolean;
    publish_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    categories?: Array<any>;
    translated: {
        id: string;
        created_at: string;
        updated_at: string;
        title: string;
        slug: string;
        description: string;
        meta: string;
        locale: string;
        post_id: string;
    };
    images: Array<Image>;
}