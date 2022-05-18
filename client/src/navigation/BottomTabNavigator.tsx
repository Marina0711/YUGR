import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Colors } from '../assets/Colors';
import { BasketScreen } from '../screens/BasketScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { UserScreen } from '../screens/UserScreen';

enum ScreenNamesEnum {
    home = 'home',
    basket = 'basket',
    user = 'user'
}

type BottomTabNavigatorType = {
    [ScreenNamesEnum.home]: undefined,
    [ScreenNamesEnum.basket]: undefined,
    [ScreenNamesEnum.user]: undefined,
}

const Tab = createBottomTabNavigator<BottomTabNavigatorType>();
const ICON_SIZE = 20;

export const BottomTabNavigator = () => {
    const getTabColor = (focused: boolean) => focused ? Colors.verifiedBlack : Colors.basaltGrey;

    const getOptions = (name: ScreenNamesEnum) => {
        return {
            tabBarIcon: ({ focused }: {focused: boolean}) => (
                <Icon name={name} size={ICON_SIZE} color={getTabColor(focused)} />
            ),
        };
    };

    return (
        <Tab.Navigator
            initialRouteName={ScreenNamesEnum.home}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                options={getOptions(ScreenNamesEnum.home)}
                name={ScreenNamesEnum.home}
                component={HomeScreen}
            />
            <Tab.Screen
                options={getOptions(ScreenNamesEnum.basket)}
                name={ScreenNamesEnum.basket}
                component={BasketScreen}
            />
            <Tab.Screen
                options={getOptions(ScreenNamesEnum.user)}
                name={ScreenNamesEnum.user}
                component={UserScreen}
            />
        </Tab.Navigator>
    );
};
