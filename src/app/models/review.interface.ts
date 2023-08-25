import { User } from "@models/user";

export interface Review {
    created_at: string;
    description: string;
    id: number;
    likes: boolean;
    locale: string;
    service_id: number;
    specialist_id: number;
    updated_at: string;
    user: User;
    user_id: number;
}