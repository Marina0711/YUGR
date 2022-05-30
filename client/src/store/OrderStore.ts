import { makeAutoObservable } from 'mobx';

import { getCategories } from '../api/CategoryApi';
import { create, getOrders } from '../api/OrderApi';

import { basketStore } from './BasketStore';
import { OrderType, StatusEnum } from './types';
import { userStore } from './UserStore';

class OrderStore {
    private _orders: OrderType[];
    private _status: StatusEnum;

    constructor() {
        this._orders = [];
        this._status = StatusEnum.loading;
        makeAutoObservable(this);
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setOrders(orders: OrderType[]) {
        this._orders = orders;
    }

    get orders() {
        return this._orders;
    }

    get status() {
        return this._status;
    }

    async createOrder() {
        try {
            this.setStatus(StatusEnum.loading);
            const userId = userStore.user!.id;
            const basketId = basketStore.id;

            await create(basketId, userId);

            await basketStore.fetchBasket(userId);
            await this.fetchOrders(userId);

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }

    async fetchOrders(userId: number) {
        try {
            this.setStatus(StatusEnum.loading);
            const orders  = await getOrders(userId);

            if (orders) {
                this.setOrders(orders);
            }

            this.setStatus(StatusEnum.success);
        } catch (e) {
            this.setStatus(StatusEnum.error);
        }
    }
}

export const orderStore = new OrderStore();
