import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderLogoComponent } from '../components/HeaderLogoComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';

type AuthHOCPropsType = {
    children: JSX.Element,
    isAuth?: boolean
}

export const AuthScreenHOC = (props: AuthHOCPropsType) => {
    const { children, isAuth = false } = props;

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
                    {isAuth
                        && <Text style={styles.title}>{Strings.authScreen.loginToProfile}</Text>
                    }
                    {children}
                </>
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
});
