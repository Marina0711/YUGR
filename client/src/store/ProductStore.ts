import { makeAutoObservable } from 'mobx';

export type CategoryType = {
    id: number,
    name: string
}

export type ProductType = {
    id: number,
    name: string,
    price: number,
    rating: {
        isRated: boolean,
        rate: number
    },
    img: string,
    categoryId: number
}

class ProductStore {
    private _categories: CategoryType[];
    private _products: ProductType[];

    constructor() {
        this._categories = [
            {
                id: 1,
                name: 'Труба',
            },
            {
                id: 2,
                name: 'Еще одна',
            },
            {
                id: 3,
                name: 'Ого, труба',
            },
            {
                id: 4,
                name: 'И снова труба',
            },
        ];
        this._products = [
            { id: 0, name: 'Труба обычная', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 1, name: 'Труба другая', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 2, name: 'Труба сякая', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 3, name: 'Труба такая', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 4, name: 'А я думал сова', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 },
            { id: 5, name: 'А нет, труба', price: 44, rating: { isRated: false, rate: 4.4 }, img: 'ffff', categoryId: 1 }
        ];
        makeAutoObservable(this);
    }

    setTypes(categories: CategoryType[]) {
        this._categories = categories;
    }

    setProducts(products: ProductType[]) {
        this._products = products;
    }

    get categories() {
        return this._categories;
    }

    get products() {
        return this._products;
    }
}

export const productStore = new ProductStore();
