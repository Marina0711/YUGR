import { OrderType } from '../store/types';

import { authAxiosConfig } from './index';

export const create = async (orderId: number, userId: number): Promise<void> => {
    try {
        await authAxiosConfig.patch('/order', {  orderId, userId });
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const getOrders = async (userId: number): Promise<OrderType[] | void> => {
    try {
        const { data } = await authAxiosConfig.get('/order', { params: { userId } });
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
