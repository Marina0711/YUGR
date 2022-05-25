import { makeAutoObservable } from 'mobx';

import { getCategories } from '../api/CategoryApi';

import { Strings } from '../assets/Strings';

import { CategoryType, StatusEnum } from './types';

const categoryAll = {
    id: 0,
    name: Strings.homeScreen.all
};

class CategoryStore {
    private _categories: CategoryType[];
    private _status: StatusEnum;

    constructor() {
        this._categories = [categoryAll];
        this._status = StatusEnum.success;
        makeAutoObservable(this);
    }

    get categories() {
        return this._categories;
    }

    get status() {
        return this._status;
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setCategories(categories: CategoryType[]) {
        this._categories = [categoryAll, ...categories];
    }

    async fetchCategories() {
        try {
            this.setStatus(StatusEnum.loading);
            const categories  = await getCategories();
            if (categories) {
                this.setCategories(categories);
            }
            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }
}

export const categoryStore = new CategoryStore();
