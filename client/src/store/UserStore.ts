import { makeAutoObservable } from 'mobx';

class UserStore {
    private _isAuth: boolean;
    private _user: {};

    constructor() {
        this._isAuth = true;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth;
    }

    setUser(user: any) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}

export const userStore = new UserStore();
