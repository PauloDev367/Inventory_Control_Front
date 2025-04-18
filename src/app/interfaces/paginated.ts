import { Product } from "./models";

export interface PaginateProducts {
    items: Array<Product>,
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
}