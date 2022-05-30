import { AddedProductsType } from '../store/types';

import { authAxiosConfig } from './index';

type BasketType = {
    id: number,
    products: AddedProductsType[],
    total: number
};

export const getBasket = async (userId: number): Promise<BasketType | undefined> => {
    try {
        const { data } = await authAxiosConfig.get('/basket', { params: { userId } });
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const updateProductCount = async (
    productId: number,
    orderId: number,
    count: number
): Promise<number | undefined> => {
    try {
        const { data }  = await authAxiosConfig.patch('/basket', { productId, orderId, count });
        return data.id;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const deleteProduct = async (productId: number, orderId: number): Promise<number | undefined> => {
    try {
        const { data }  = await authAxiosConfig.delete('/basket', { params: { productId, orderId } });
        return data.id;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const addProduct = async (productId: number, orderId: number): Promise<number | undefined> => {
    try {
        const { data }  = await authAxiosConfig.post('/basket', {  orderId, productId });
        return data.id;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
