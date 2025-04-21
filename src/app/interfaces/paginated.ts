import { Product, SaleHistory } from "./models";

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

