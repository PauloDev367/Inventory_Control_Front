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

export interface SaleHistory {
    createdAt: string,
    id: string,
    productId: string,
    quantity: number,
    totalPrice: number,
    unityPrice: number,
}

export interface PriceHistory {
    createdAt: string,
    id: string,
    price: number,
    productId: string,
}

export interface StockMovementHistory {
    createdAt: string,
    id: string,
    movementType: number,
    productId: string,
    quantity: number,
}

export interface User {
    id: string,
    name: string,
    email: string
}

export interface UpdateUser {
    id: string,
    name: string,
    email: string,
    password: string
}