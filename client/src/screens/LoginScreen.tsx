import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { ErrorTextComponent } from '../components/ErrorTextComponent';
import { LightButtonComponent } from '../components/LightButtonComponent';
import { TextInputComponent } from '../components/TextInputComponent';

import { Strings } from '../assets/Strings';
import { loginSchema } from '../constants/authValidationConstant';
import { AuthScreenHOC } from '../HOCs/AuthScreenHOC';
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
        <AuthScreenHOC isAuth >
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, errors,resetForm , handleBlur, handleSubmit, values }) => (
                    <>
                        <View style={styles.inputs}>
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
                        </View>
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
        </AuthScreenHOC>
    );
};

const styles = StyleSheet.create({
    inputs: {
        marginBottom: 40
    },
    buttonsStyle: {
        marginTop: 30
    }
});
