import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { HeaderComponent } from '../components/HeaderComponent';
import { LightButtonComponent } from '../components/LightButtonComponent';

import { Colors } from '../assets/Colors';
import star from '../assets/icons/star.png';
import { Strings } from '../assets/Strings';
import { RootNativeStackNavigator, RootScreenNamesEnum } from '../navigation/RootNavigator';

type ProductScreenRouteType = RouteProp<RootNativeStackNavigator, RootScreenNamesEnum.ProductScreen>;

export const ProductScreen = () => {
    const route = useRoute<ProductScreenRouteType>();
    const { product } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent isBackButton  />
            <ScrollView style={styles.content} >
                <View
                    style={{
                        width: '100%',
                        height: 250,
                        backgroundColor: Colors.tin,
                        borderRadius: 30
                    }}
                />
                <Text style={styles.name} >{product.name}</Text>
                <Text style={styles.price} >{product.price} ₽</Text>
                <View style={styles.rateContainer} >
                    <Image source={star} />
                    <Text style={styles.rate} >{product.rating.rate}</Text>
                </View>
                <Text>Тут будут характеристики</Text>
            </ScrollView>
            <View style={styles.buttons}>
                {!product.rating.isRated && (
                    <LightButtonComponent
                        style={styles.lightButton}
                        title={Strings.productScreen.toRate}
                        onPress={() => 0} />
                )}
                <DarkButtonComponent
                    style={styles.darkButton}
                    title={Strings.productScreen.addToBasket}
                    onPress={() => 0}
                />
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
        paddingHorizontal: 20
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 20,
        color: Colors.offBlack
    },
    price: {
        fontSize: 30,
        fontWeight: '700',
        marginTop: 7,
        color: Colors.offBlack
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    rate: {
        marginLeft: 7,
        fontSize: 18,
        fontWeight: '500',
        color: Colors.offBlack
    },
    buttons: {
        margin: 20,
        flexDirection: 'row'
    },
    lightButton: {
        flex: 0.4,
        marginRight: 10
    },
    darkButton: {
        flex: 1
    }
});
