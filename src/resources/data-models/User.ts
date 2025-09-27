export interface UserPayload {
    userId: string;
    profile: Profile;
    roles: string[];
    preferences: Preferences;
    orders: Order[];
}

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
}

export interface Address {
    city: string;
    pin: string;
}

export interface Preferences {
    notifications: boolean;
    theme: string;
}

export interface Order {
    orderId: string;
    amount: number;
    items: string[];
}
