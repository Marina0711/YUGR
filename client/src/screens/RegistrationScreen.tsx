import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { TextInputComponent } from '../components/TextInputComponent';

import { Context } from '../../App';
import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
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
    const { user } = useContext(Context);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmationPassword, setIsConfirmationPassword] = useState(true);

    return (
        <AuthScreenHOC>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <View style={styles.inputs}>
                            <TextInputComponent
                                value={values.email}
                                label={Strings.authScreen.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            <TextInputComponent
                                value={values.password}
                                label={Strings.authScreen.password}
                                isPassword={isShowPassword}
                                onClickEye={() => setIsShowPassword(!isShowPassword)}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            <TextInputComponent
                                value={values.confirmedPassword}
                                label={Strings.authScreen.confirmPassword}
                                isPassword={isShowConfirmationPassword}
                                onClickEye={() => setIsConfirmationPassword(!isShowConfirmationPassword)}
                                onChangeText={handleChange('confirmedPassword')}
                                onBlur={handleBlur('confirmedPassword')}
                            />
                        </View>
                        <DarkButtonComponent
                            title={Strings.authScreen.register}
                            style={styles.buttonStyle}
                            onPress={() => user.setIsAuth(true)}
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
