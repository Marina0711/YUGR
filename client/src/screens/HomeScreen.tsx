import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { CarouselComponent } from '../components/CarouselComponent';
import { HeaderComponent } from '../components/HeaderComponent';
import { ProductListComponent } from '../components/ProductListComponent';

import { Strings } from '../assets/Strings';

export const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={Strings.homeScreen.productList} />
            <View style={styles.content}>
                <View>
                    <CarouselComponent />
                </View>
                <ProductListComponent />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
    }
});
