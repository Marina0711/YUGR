import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { EmptyListComponent } from '../components/EmptyListComponent';
import { HeaderComponent } from '../components/HeaderComponent';

import { Strings } from '../assets/Strings';

export const BasketScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={Strings.basketScreen.basket} />
            <EmptyListComponent text={Strings.basketScreen.empty} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
