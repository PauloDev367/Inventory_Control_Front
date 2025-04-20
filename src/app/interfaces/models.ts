export interface Product {
    createdAt: string,
    deletedAt: string,
    description: string,
    id: string,
    minimumStock: number,
    name: string,
    price: number,
    quantity: number,
    supplierId: string
}

export interface Supplier {
    createdAt: string,
    deletedAt: string | null,
    email: string,
    id: string,
    name: string,
    phoneNumber: string,
    products: null,
}

export interface Category {
    createdAt: string,
    deletedAt: null | string,
    id: string,
    name: string,
}