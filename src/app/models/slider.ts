
export interface Slider {
    created_at: string;
    id: number;
    image: string;
    isActive: boolean;
    shoMoreBtn: any;
    sort_order: number;
    translated: [
        {
            id: string;
            locale: string;
            title: string;
            description: string;
            created_at: string;
            updated_at: string;
        }
    ];
    updated_at: string;
}