import { authAxiosConfig } from './index';

type RateProductBodyType = {
    rate: number,
    user: number,
    productId: number
}

export const rateProduct = async (body: RateProductBodyType): Promise<number | undefined> => {
    try {
        const { data } = await authAxiosConfig.post('/rating', body);
        return data;
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};
