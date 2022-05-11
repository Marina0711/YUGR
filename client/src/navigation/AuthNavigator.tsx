import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';

enum ScreenNamesEnum {
    home = 'home',
    other = 'other',
    profile = 'profile'
}

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={ScreenNamesEnum.home}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name={ScreenNamesEnum.home}
                    component={AuthScreen}
                />
                <Stack.Screen
                    name={ScreenNamesEnum.other}
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
