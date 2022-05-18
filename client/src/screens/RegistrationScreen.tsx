import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { ErrorTextComponent } from '../components/ErrorTextComponent';
import { HeaderLogoComponent } from '../components/HeaderLogoComponent';
import { TextInputComponent } from '../components/TextInputComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { registrationSchema } from '../constants/authValidationConstant';
import { AuthScreenNamesEnum, AutNativeStackNavigator } from '../navigation/AuthNavigator';

type RegistrationScreenNavigationProp = NativeStackNavigationProp<
    AutNativeStackNavigator,
    AuthScreenNamesEnum.RegistrationScreen
    >

type AuthFormType = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmedPassword: string
}

const initialValues: AuthFormType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmedPassword: ''
};

export const RegistrationScreen = () => {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmationPassword, setIsConfirmationPassword] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios')? 'padding' : undefined}
                keyboardVerticalOffset={Platform.select({ ios: -120, android: 0 })}
                style={{ flex: 1 }}
            >
                <HeaderLogoComponent />
                <Text style={styles.welcome}>{Strings.authScreen.welcome}</Text>
                <Formik
                    initialValues={initialValues}
                    validationSchema={registrationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <TextInputComponent
                                    value={values.firstName}
                                    label={Strings.authScreen.name}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                />
                                <ErrorTextComponent text={errors.firstName ?? ''} />
                                <TextInputComponent
                                    value={values.lastName}
                                    label={Strings.authScreen.surname}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                />
                                <ErrorTextComponent text={errors.lastName ?? ''} />
                                <TextInputComponent
                                    value={values.phoneNumber}
                                    label={Strings.authScreen.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                />
                                <ErrorTextComponent text={errors.phoneNumber ?? ''} />
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
                                <TextInputComponent
                                    value={values.confirmedPassword}
                                    label={Strings.authScreen.confirmPassword}
                                    isPassword={isShowConfirmationPassword}
                                    onClickEye={() => setIsConfirmationPassword(!isShowConfirmationPassword)}
                                    onChangeText={handleChange('confirmedPassword')}
                                    onBlur={handleBlur('confirmedPassword')}
                                />
                                <ErrorTextComponent text={errors.confirmedPassword ?? ''} />
                            </ScrollView>
                            <DarkButtonComponent
                                title={Strings.authScreen.register}
                                style={styles.buttonStyle}
                                onPress={() => handleSubmit()}
                            />
                            <View style={styles.stringForSignIn}>
                                <Text style={styles.text}>{Strings.authScreen.alreadyHaveAccount} </Text>
                                <Text
                                    style={[styles.text, styles.signIn]}
                                    onPress={() => navigation.navigate(AuthScreenNamesEnum.LoginScreen)}
                                >
                                    {Strings.authScreen.logIn.toUpperCase()}
                                </Text>
                            </View>
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
    buttonStyle: {
        marginTop: 30
    },
    stringForSignIn: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'center'
    },
    welcome: {
        fontSize: 30,
        fontWeight: '400',
        lineHeight: 45,
        marginTop: 20,
        textAlign: 'center',
        color: Colors.verifiedBlack
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.tin
    },
    signIn: {
        color: Colors.verifiedBlack
    }
});
