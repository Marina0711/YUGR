import { makeAutoObservable } from 'mobx';

import { StatusEnum, UserType } from './types';

class UserStore {
    private _isAuth: boolean;
    private _user: UserType | null;
    private _status: StatusEnum;

    constructor() {
        this._isAuth = false;
        this._user = null;
        this._status = StatusEnum.success;
        makeAutoObservable(this);
    }

    setStatus(status: StatusEnum) {
        this._status = status;
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth;
    }

    setUser(user: UserType | null) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get status() {
        return this._status;
    }
}

export const userStore = new UserStore();
