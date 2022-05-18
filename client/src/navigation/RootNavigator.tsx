import React  from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { ProductScreen } from '../screens/ProductScreen';
import { ProductType } from '../store/ProductStore';
import { userStore } from '../store/UserStore';

import { AuthNavigator } from './AuthNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';

export enum RootScreenNamesEnum {
    BottomTabNavigator = 'BottomTabNavigator',
    ProductScreen = 'ProductScreen',
}

export type RootNativeStackNavigator = {
    [RootScreenNamesEnum.BottomTabNavigator]: undefined,
    [RootScreenNamesEnum.ProductScreen]: {product: ProductType},
}

const Stack = createNativeStackNavigator<RootNativeStackNavigator>();

export const RootNavigator = observer(() => {
    return userStore.isAuth
        ? (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={RootScreenNamesEnum.BottomTabNavigator}
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen
                        name={RootScreenNamesEnum.BottomTabNavigator}
                        component={BottomTabNavigator}
                    />
                    <Stack.Screen
                        name={RootScreenNamesEnum.ProductScreen}
                        component={ProductScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        ) : (
            <AuthNavigator />
        );
});
