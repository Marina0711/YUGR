import { ProductDetailsType, ProductType } from '../store/types';

import { authAxiosConfig } from './index';

type ProductListType = {
    count: number,
    rows: ProductType[]
}

export const getProducts = async (
    categoryId?: number,
    page?: number
): Promise<ProductListType | undefined> => {
    try {
        const { data } = await authAxiosConfig.get('/product', { params: {  categoryId, page } });
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const getOneProduct = async (id: number, userId: number): Promise<ProductDetailsType | undefined> => {
    try {
        const { data } = await authAxiosConfig.get('/product/' + id, { params: { userId } });
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
