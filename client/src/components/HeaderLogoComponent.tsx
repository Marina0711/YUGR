import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

import logo from '../assets/icons/logo.png';

type HeaderLogoComponent = {
    style?: ViewStyle
}

export const HeaderLogoComponent = (props: HeaderLogoComponent) => {
    const { style } = props;

    return (
        <View style={[styles.header, style]}>
            <View style={styles.line} />
            <View style={styles.logo}>
                <Image source={logo} style={styles.img} />
            </View>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 40,
    },
    img: {
        width: 55,
        height: 60
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
    },
});
