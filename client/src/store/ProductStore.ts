import { makeAutoObservable } from 'mobx';

import { getProducts } from '../api/ProductApi';

import { ProductType, StatusEnum } from './types';

class ProductStore {
    private _products: ProductType[];
    private _status: StatusEnum;
    private _count: number;
    private _page: number;

    constructor() {
        this._products = [];
        this._count = 0;
        this._page = 1;
        this._status = StatusEnum.success;
        makeAutoObservable(this);
    }

    get products() {
        return this._products;
    }

    get status() {
        return this._status;
    }

    get count() {
        return this._count;
    }

    get page() {
        return this._page;
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setProducts(products: ProductType[]) {
        this._products = products;
    }

    setCount(count: number) {
        this._count = count;
    }

    setPage(page: number) {
        this._page = page;
    }

    async fetchProducts(id?: number, nextPage?: number) {
        try {
            this.setStatus(StatusEnum.loading);
            const products  = await getProducts(id, nextPage);

            if (nextPage && products) {
                this.setProducts([...this.products, ...products.rows]);
                this.setPage(nextPage);
            } else if (products) {
                this.setProducts(products.rows);
                this.setCount(products.count);
            }

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }
}

export const productStore = new ProductStore();
