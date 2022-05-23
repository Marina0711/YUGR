import { login, refreshToken, registration } from '../api/UserApi';

import { LoginFormType } from '../screens/LoginScreen';
import { RegistrationFormType } from '../screens/RegistrationScreen';
import { StatusEnum } from '../store/types';
import { userStore } from '../store/UserStore';

import { displayErrorToast } from './ToastDisplayHelper';

export const authSubmitHelper = async (values?: LoginFormType | RegistrationFormType) => {
    try {
        let user;
        userStore.setStatus(StatusEnum.loading);

        if (!values) {
            user = await refreshToken();
        } else if ((values as RegistrationFormType).phoneNumber) {
            user = await registration(values as RegistrationFormType);
        } else {
            user = await login(values as LoginFormType);
        }

        if (user) {
            userStore.setUser(user);
            userStore.setIsAuth(true);
            userStore.setStatus(StatusEnum.success);
        }
    } catch(e) {
        userStore.setStatus(StatusEnum.error);
        displayErrorToast(e.message);
    }
};
