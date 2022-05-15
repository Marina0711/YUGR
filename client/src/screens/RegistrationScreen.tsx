import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { ErrorText } from '../components/ErrorText';
import { TextInputComponent } from '../components/TextInputComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { registrationSchema } from '../constants/authValidationConstant';
import { AuthScreenHOC } from '../HOCs/AuthScreenHOC';
import { AuthScreenNamesEnum, AutNativeStackNavigator } from '../navigation/AuthNavigator';

type RegistrationScreenNavigationProp = NativeStackNavigationProp<
    AutNativeStackNavigator,
    AuthScreenNamesEnum.RegistrationScreen
    >

type AuthFormType = {
    email: string,
    password: string,
    confirmedPassword: string
}

const initialValues: AuthFormType = {
    email: '',
    password: '',
    confirmedPassword: ''
};

export const RegistrationScreen = () => {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmationPassword, setIsConfirmationPassword] = useState(true);

    return (
        <AuthScreenHOC>
            <Formik
                initialValues={initialValues}
                validationSchema={registrationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
                    <>
                        <View style={styles.inputs}>
                            <TextInputComponent
                                value={values.email}
                                label={Strings.authScreen.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            <ErrorText text={errors.email ?? ''} />
                            <TextInputComponent
                                value={values.password}
                                label={Strings.authScreen.password}
                                isPassword={isShowPassword}
                                onClickEye={() => setIsShowPassword(!isShowPassword)}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            <ErrorText text={errors.password ?? ''} />
                            <TextInputComponent
                                value={values.confirmedPassword}
                                label={Strings.authScreen.confirmPassword}
                                isPassword={isShowConfirmationPassword}
                                onClickEye={() => setIsConfirmationPassword(!isShowConfirmationPassword)}
                                onChangeText={handleChange('confirmedPassword')}
                                onBlur={handleBlur('confirmedPassword')}
                            />
                            <ErrorText text={errors.confirmedPassword ?? ''} />
                        </View>
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
        </AuthScreenHOC>
    );
};

const styles = StyleSheet.create({
    inputs: {
        marginBottom: 40
    },
    buttonStyle: {
        marginTop: 30
    },
    stringForSignIn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center'
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
