import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';

import { Context } from '../../App';

import { AuthNavigator } from './AuthNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';

export const RootNavigator = observer(() => {
    const { user } = useContext(Context);

    return user?.isAuth ? <BottomTabNavigator /> : <AuthNavigator />;
});
