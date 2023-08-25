import { Review, Specialist, Image } from "@models/index";

export interface Service {
    id: number;
    author_id: number;
    viewCount: number;
    isActive: boolean;
    publish_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    categories?: Array<any>;
    contact_number: string;
    service_name: string;
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
    has_serwish_quality: boolean;
    specialist?: Specialist;
    cities: Array<any>;
    isViewed?: boolean;
    isCalled?: boolean;
    likePercent: string;
    tags: Array<any>;
    working_hours: any;
    price: string;
    price_type: string;
    vip_status: string;
    vip_icon: string;
    reviews: Array<Review>;
    totalReviews: number;
}
