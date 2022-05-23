import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';

export enum AuthScreenNamesEnum {
    LoginScreen = 'LoginScreen',
    RegistrationScreen = 'RegistrationScreen',
}

export type AutNativeStackNavigator = {
    [AuthScreenNamesEnum.LoginScreen]: undefined,
    [AuthScreenNamesEnum.RegistrationScreen]: undefined,
}

const Stack = createNativeStackNavigator<AutNativeStackNavigator>();

export const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={AuthScreenNamesEnum.LoginScreen}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name={AuthScreenNamesEnum.LoginScreen}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name={AuthScreenNamesEnum.RegistrationScreen}
                    component={RegistrationScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
