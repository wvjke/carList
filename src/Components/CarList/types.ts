export interface ICar {
    id: number;
    company: string;
    model: string;
    vin: string;
    color: string;
    year: number;
    price: number;
    availability: boolean;
}

export enum ModalType {
    Add = "add",
    Edit = "edit",
}
