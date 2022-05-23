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
        userStore.setStatus(StatusEnum.error);
        displayErrorToast(e.message);
    }
};
