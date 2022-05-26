import { makeAutoObservable } from 'mobx';

import { addProduct, deleteProduct, getBasket, updateProductCount } from '../api/BasketApi';

import { AddedProductsType, StatusEnum } from './types';
import { userStore } from './UserStore';

class BasketStore {
    private _id: number;
    private _products: AddedProductsType[];
    private _status: StatusEnum;

    constructor() {
        this._id = 0;
        this._products = [];
        this._status = StatusEnum.loading;
        makeAutoObservable(this);
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setId(id: number) {
        this._id = id;
    }

    setProducts(products: AddedProductsType[]) {
        this._products = products;
    }

    get id() {
        return this._id;
    }

    get products() {
        return this._products;
    }

    get status() {
        return this._status;
    }

    async fetchBasket(userId: number) {
        try {
            this.setStatus(StatusEnum.loading);
            const basket = await getBasket(userId);

            if (basket) {
                basketStore.setId(basket.id);
                basketStore.setProducts(basket.products);
            }

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }

    async updateProduct(productId: number, count: number) {
        try {
            this.setStatus(StatusEnum.loading);
            await updateProductCount(productId, this._id, count);

            const newBasket = this._products.map((product: AddedProductsType) => {
                return product.id === productId ? { ...product, count } : product;
            });

            this.setProducts(newBasket);

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }

    async deleteProductFromBasket(productId: number) {
        try {
            this.setStatus(StatusEnum.loading);
            await deleteProduct(productId, this._id);

            const newBasket = this._products.filter((product: AddedProductsType) => (
                product.id !== productId
            ));

            this.setProducts(newBasket);

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }

    async addProductToBasket(productId: number) {
        try {
            this.setStatus(StatusEnum.loading);
            await addProduct(productId, this._id);

            await this.fetchBasket(userStore.user!.id);

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }
}

export const basketStore = new BasketStore();
