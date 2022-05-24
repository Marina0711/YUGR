import { ProductType } from '../store/types';

import { authAxiosConfig } from './index';

type ProductListType = {
    count: number,
    rows: ProductType[]
}

type ProductDetailsType = {
    id: number,
    name: string,
    price: number,
    img: string,
    categoryId: number,
    info: [
        {
            id: number,
            title: string,
            description: string,
            productId: number
        }
    ],
    rateInfo: {
        isRated: boolean,
        rate: number
    }

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

export const getOneProduct = async (id: number): Promise<ProductDetailsType | undefined> => {
    try {
        const { data } = await authAxiosConfig.get('/product/' + id);
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
