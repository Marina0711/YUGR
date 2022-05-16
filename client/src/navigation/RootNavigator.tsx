import React  from 'react';

import { observer } from 'mobx-react-lite';

import { userStore } from '../store/UserStore';

import { AuthNavigator } from './AuthNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';

export const RootNavigator = observer(() => {
    return userStore.isAuth ? <BottomTabNavigator /> : <AuthNavigator />;
});
