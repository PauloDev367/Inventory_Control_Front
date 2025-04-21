import { Category, PriceHistory, Product, SaleHistory, StockMovementHistory, Supplier } from "./models";

export interface PaginateProducts {
    items: Array<Product>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}

export interface PaginateSaleHistory {
    items: Array<SaleHistory>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}

export interface PaginatePriceHistory {
    items: Array<PriceHistory>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}


export interface PaginateStockMovementHistory {
    items: Array<StockMovementHistory>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}

export interface PaginateCategories {
    items: Array<Category>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}


export interface PaginateSuppliers {
    items: Array<Supplier>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}

