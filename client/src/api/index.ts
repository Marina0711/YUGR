import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import 'react-native-dotenv';

import AsyncStorageHelper, { AsyncStorageKeysEnum } from '../helpers/AsyncStorageHelper';

const axiosConfig = axios.create(({
    baseURL: process.env.REACT_APP_API_URL + '/api'
}));

const authAxiosConfig: AxiosInstance = axios.create(({
    baseURL: process.env.REACT_APP_API_URL + '/api',
    headers: {}
}));

const authInterceptor = async (config: AxiosRequestConfig) => {
    const token = await AsyncStorageHelper.get(AsyncStorageKeysEnum.token);

    config.headers!.authorization =  `Bearer ${token}`;
    return config;
};

authAxiosConfig.interceptors.request.use(authInterceptor);

export {
    axiosConfig,
    authAxiosConfig
};
