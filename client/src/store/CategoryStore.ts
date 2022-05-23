import { makeAutoObservable } from 'mobx';

import { CategoryType, StatusEnum } from './types';

class CategoryStore {
    private _categories: CategoryType[];
    private _status: StatusEnum;

    constructor() {
        this._categories = [
            { id: 1, name: 'Труба' },
            { id: 2, name: 'Еще одна' },
            { id: 3, name: 'Ого, труба' },
            { id: 4, name: 'И снова труба' },
        ];
        this._status = StatusEnum.success;
        makeAutoObservable(this);
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setCategories(categories: CategoryType[]) {
        this._categories = categories;
    }

    get categories() {
        return this._categories;
    }

    get status() {
        return this._status;
    }
}

export const categoryStore = new CategoryStore();
