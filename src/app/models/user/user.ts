import { ClientType } from "./clientType";
import { UserType } from "./userType";

export interface User {
    client_type: ClientType;
    created_at: string;
    date_of_birth: string;
    gender: string;
    id: number;
    id_number?: number;
    name: string;
    personal: UserType;
    phone_number: string;
    updated_at: string;
    image: string;
    balance: any;
    extraPic: string;
}

export interface UserForm extends User {
    password: string;
    password_confirmation: string;
    sms_validation: string;
}