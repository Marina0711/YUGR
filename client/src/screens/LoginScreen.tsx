import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { ErrorTextComponent } from '../components/ErrorTextComponent';
import { HeaderLogoComponent } from '../components/HeaderLogoComponent';
import { LightButtonComponent } from '../components/LightButtonComponent';
import { TextInputComponent } from '../components/TextInputComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { loginSchema } from '../constants/authValidationConstant';
import { AuthScreenNamesEnum, AutNativeStackNavigator } from '../navigation/AuthNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<AutNativeStackNavigator, AuthScreenNamesEnum.LoginScreen>

type AuthFormType = {
    email: string,
    password: string
}

const initialValues: AuthFormType = {
    email: '',
    password: ''
};

export const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [isShowPassword, setIsShowPassword] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios')? 'padding' : undefined}
                keyboardVerticalOffset={Platform.select({ ios: -200, android: 0 })}
            >
                <HeaderLogoComponent />
                <Text style={styles.welcome}>{Strings.authScreen.welcome}</Text>
                <Text style={styles.title}>{Strings.authScreen.loginToProfile}</Text>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, errors,resetForm , handleBlur, handleSubmit, values }) => (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.inputs}
                                bounces={false}
                            >
                                <TextInputComponent
                                    value={values.email}
                                    label={Strings.authScreen.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                <ErrorTextComponent text={errors.email ?? ''} />
                                <TextInputComponent
                                    value={values.password}
                                    label={Strings.authScreen.password}
                                    isPassword={isShowPassword}
                                    onClickEye={() => setIsShowPassword(!isShowPassword)}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                <ErrorTextComponent text={errors.password ?? ''} />
                            </ScrollView>
                            <DarkButtonComponent
                                title={Strings.authScreen.logIn}
                                style={styles.buttonsStyle}
                                onPress={() => handleSubmit()}
                            />
                            <LightButtonComponent
                                title={Strings.authScreen.register}
                                style={styles.buttonsStyle}
                                onPress={() => {
                                    navigation.navigate(AuthScreenNamesEnum.RegistrationScreen);
                                    resetForm();
                                }}
                            />
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 30,
    },
    welcome: {
        fontSize: 30,
        fontWeight: '400',
        lineHeight: 45,
        marginTop: 30,
        textAlign: 'center',
        color: Colors.verifiedBlack
    },
    title: {
        fontSize: 30,
        fontWeight: '400',
        lineHeight: 45,
        marginBottom: 25,
        textAlign: 'center',
        color: Colors.tin
    },
    inputs: {
        marginBottom: 40
    },
    buttonsStyle: {
        marginTop: 30
    }
});
