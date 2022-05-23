import jwt_decode from 'jwt-decode';

import { Strings } from '../assets/Strings';
import AsyncStorageHelper, { AsyncStorageKeysEnum } from '../helpers/AsyncStorageHelper';
import { UserType } from '../store/types';

import { authAxiosConfig, axiosConfig } from './index';

type LoginDataType = {
    email: string,
    password: string,
}

type RegisterDataType = {
    firstName : string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
}

export const registration = async (body: RegisterDataType): Promise<UserType | void> => {
    try {
        const { data } = await axiosConfig.post('/user/registration', body);
        await AsyncStorageHelper.set(AsyncStorageKeysEnum.token, data.token);
        return jwt_decode(data.token);
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const login = async (body: LoginDataType): Promise<UserType | void> => {
    try {
        const { data } = await axiosConfig.post('/user/login', body);
        await AsyncStorageHelper.set(AsyncStorageKeysEnum.token, data.token);
        return jwt_decode(data.token);
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

export const refreshToken = async (): Promise<UserType | undefined | void> => {
    try {
        const { data } = await authAxiosConfig.get('/user/refreshToken');
        return jwt_decode(data.token);
    } catch (e) {
        throw new Error(Strings.errors.loginRequired);
    }
};
