import { StatusEnum, UserType } from '../store/types';
import { userStore } from '../store/UserStore';

import { displayErrorToast } from './ToastDisplayHelper';

export const authSubmitHelper = async (authOperation: () => Promise<UserType | void>) => {
    try {
        userStore.setStatus(StatusEnum.loading);

        const user = await authOperation();

        if (user) {
            userStore.setUser(user);
            userStore.setIsAuth(true);
            userStore.setStatus(StatusEnum.success);
        }
    } catch(e) {
        if (e.message) {
            displayErrorToast(e.message);
        }
        userStore.setStatus(StatusEnum.error);
    }
};
