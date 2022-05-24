import { CategoryType } from '../store/types';

import { authAxiosConfig } from './index';

type CategoryDataType = {
    name: string
}

export const createCategory = async (body: CategoryDataType): Promise<CategoryType | void> => {
    try {
        const { data } = await authAxiosConfig.post('/category', body);
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const deleteCategory = async (id: number): Promise<CategoryType | void> => {
    try {
        const { data } = await authAxiosConfig.delete('/category/:id');
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const getCategories = async (): Promise<CategoryType[] | undefined> => {
    try {
        const { data } = await authAxiosConfig.get('/category');
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
