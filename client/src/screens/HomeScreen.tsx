import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { CarouselComponent } from '../components/CarouselComponent';
import { HeaderComponent } from '../components/HeaderComponent';

export const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={'Какой-то заголовок'} />
            <View style={styles.content}>
                <CarouselComponent />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
    }
});
