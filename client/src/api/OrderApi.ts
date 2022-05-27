import { authAxiosConfig } from './index';

export const create = async (orderId: number, userId: number): Promise<void> => {
    try {
        await authAxiosConfig.patch('/order', {  orderId, userId });
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
