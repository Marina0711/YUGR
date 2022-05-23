import { makeAutoObservable } from 'mobx';

import { ProductType, StatusEnum } from './types';

class ProductStore {
    private _products: ProductType[];
    private _status: StatusEnum;

    constructor() {
        this._products = [
            { id: 0, name: 'Труба обычная', price: 44, rating: { isRated: true, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 1, name: 'Труба другая', price: 105, rating: { isRated: false, rate: 3.4 }, img: 'ffff', categoryId: 1 },
            { id: 2, name: 'Труба сякая', price: 666, rating: { isRated: false, rate: 5 }, img: 'ffff', categoryId: 1 },
            { id: 3, name: 'Труба такая', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 4, name: 'А я думал сова', price: 44, rating: { isRated: false, rate: 4.9 }, img: 'ffff', categoryId: 1 },
            { id: 5, name: 'А нет, труба', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 }
        ];
        this._status = StatusEnum.success;
        makeAutoObservable(this);
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setProducts(products: ProductType[]) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    get status() {
        return this._status;
    }
}

export const productStore = new ProductStore();
