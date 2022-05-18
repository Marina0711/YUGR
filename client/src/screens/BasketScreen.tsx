import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { HeaderComponent } from '../components/HeaderComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';

const ICON_NAME = 'emoticon-sad-outline';
const ICON_SIZE = 70;

export const BasketScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={Strings.basketScreen.basket} />
            <View style={styles.emptyContainer}>
                <Icon name={ICON_NAME} size={ICON_SIZE} color={Colors.tin} />
                <Text style={styles.emptyText}>{Strings.basketScreen.empty}</Text>
            </View>
            {/*<ScrollView style={styles.content}>*/}

            {/*</ScrollView>*/}
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 20,
        color: Colors.verifiedBlack
    }
});
