import { ClientType, Review, Image } from '@models/index';

export interface Specialist {
    id: number;
    author_id: number;
    viewCount: number;
    isActive: boolean;
    publish_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    categories?: string;
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
    name: string;

    phone_number: string;
    client_type?: ClientType;
    isCalled?: boolean;
    serviceCategories: string;
    serwish_quality?: boolean;
    likePercent: string;
    images: Array<Image>;
    // image: string;
    extraPic: string;
    slug: string;
    reviews: Array<Review>;
    totalReviews: number;
}