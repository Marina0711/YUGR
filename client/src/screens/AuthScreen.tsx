import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Formik } from 'formik';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { HeaderLogoComponent } from '../components/HeaderLogoComponent';
import { LightButtonComponent } from '../components/LightButtonComponent';
import { TextInputComponent } from '../components/TextInputComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';

type AuthFormType = {
    email: string,
    password: string
}

const initialValues: AuthFormType = {
    email: '',
    password: ''
};

export const AuthScreen = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const onClickEye = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <HeaderLogoComponent />
                <>
                    <Text style={styles.welcome}>{Strings.authScreen.welcome}</Text>
                    <Text style={styles.title}>{Strings.authScreen.loginToProfile}</Text>
                </>
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
                                    onClickEye={onClickEye}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                            </View>
                            <DarkButtonComponent
                                title={Strings.authScreen.logIn}
                                style={styles.buttonsStyle}
                                onPress={handleSubmit}
                            />
                            <LightButtonComponent
                                title={Strings.authScreen.register}
                                style={styles.buttonsStyle}
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    content: {
        flex: 1,
        marginHorizontal: 30,
    },
    welcome: {
        fontSize: 30,
        fontWeight: '400',
        lineHeight: 45,
        marginTop: 30,
        textAlign: 'center',
        color: Colors.tin
    },
    title: {
        fontSize: 30,
        fontWeight: '400',
        lineHeight: 45,
        marginBottom: 25,
        textAlign: 'center',
        color: Colors.verifiedBlack
    },
    inputs: {
        marginBottom: 40
    },
    buttonsStyle: {
        marginTop: 30
    }
});
