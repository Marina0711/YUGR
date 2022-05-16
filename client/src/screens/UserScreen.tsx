import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

import { HeaderComponent } from '../components/HeaderComponent';

export const UserScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={'Профиль'} />
            <Text>
                хех
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
