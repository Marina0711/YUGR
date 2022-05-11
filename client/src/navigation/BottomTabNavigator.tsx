import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Colors } from '../assets/Colors';
import { HomeScreen } from '../screens/HomeScreen';

enum ScreenNamesEnum {
    home = 'home',
    other = 'other',
    profile = 'profile'
}

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    const getTabColor = (focused: boolean) => focused ? Colors.verifiedBlack : Colors.basaltGrey;

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={ScreenNamesEnum.home}
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => <Icon name={'home'} size={20} color={getTabColor(focused)} />
                    }}
                    name={ScreenNamesEnum.home}
                    component={HomeScreen}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => <Icon name={'basket'} size={20} color={getTabColor(focused)} />
                    }}
                    name={ScreenNamesEnum.other}
                    component={HomeScreen}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => <Icon name={'user'} size={20} color={getTabColor(focused)} />
                    }}
                    name={ScreenNamesEnum.profile}
                    component={HomeScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
