export interface Address{
    id?:number;
    streetAddress: String;
    state: String;
    city: String;
    country: String;
    latitude?: number;
    longitude?: number;
    pin: number;
}