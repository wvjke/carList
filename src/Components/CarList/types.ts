export interface ICar {
    id?: string;
    company: string;
    model: string;
    vin: string;
    color: string;
    year: number;
    price: string;
    availability: boolean;
}

export enum ModalType {
    Add = "add",
    Edit = "edit",
}
