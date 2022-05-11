import { makeAutoObservable } from 'mobx';

export default class ProductStore {
    private _categories: ({ name: string; id: number } | { name: string; id: number })[];
    private _products: { img: string; price: number; name: string; rating: number; id: number }[];

    constructor() {
        this._categories = [
            { id: 0, name: 'Test' },
            { id: 1, name: 'Test2' }
        ];
        this._products = [
            { id: 0, name: 'FFFF', price: 44, rating: 5, img: 'ffff' }
        ];
        makeAutoObservable(this);
    }

    setTypes(categories: any) {
        this._categories = categories;
    }

    setProducts(products: any) {
        this._products = products;
    }

    get categories() {
        return this._categories;
    }

    get products() {
        return this._products;
    }
}
