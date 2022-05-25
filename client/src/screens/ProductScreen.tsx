import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { getOneProduct } from '../api/ProductApi';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { EmptyListComponent } from '../components/EmptyListComponent';
import { HeaderComponent } from '../components/HeaderComponent';
import { LightButtonComponent } from '../components/LightButtonComponent';
import { RatingModalComponent } from '../components/RatingModalComponent';
import { StarsComponent } from '../components/StarsComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { RootNativeStackNavigator, RootScreenNamesEnum } from '../navigation/RootNavigator';
import { ProductDetailsType } from '../store/types';
import { userStore } from '../store/UserStore';

type ProductScreenRouteType = RouteProp<RootNativeStackNavigator, RootScreenNamesEnum.ProductScreen>;

export const ProductScreen = () => {
    const route = useRoute<ProductScreenRouteType>();
    const { productId } = route.params;
    const [productDetails, setProductDetails] = useState<ProductDetailsType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const uri = process.env.REACT_APP_API_URL+ '/' + productDetails?.img;

    const getProductDetails = async () => {
        const productDetails = await getOneProduct(productId, userStore.user!.id);
        if (productDetails) {
            setProductDetails(productDetails);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [isModalVisible]);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const renderProductDetails = () => {
        return (
            <View style={styles.detailsContainer}>
                {productDetails?.info.map((item) => {
                    const flexDirection = item.description.length < 20 ? 'row' : 'column';

                    return (
                        <View key={item.id} style={{ flexDirection , ...styles.detail }}>
                            <Text style={styles.title} >{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>

                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent isBackButton />
            {
                !productDetails ? (
                    <EmptyListComponent text={Strings.errors.somethingWentWrong} />
                ) : (
                    <>
                        <ScrollView style={styles.content} bounces={false} showsVerticalScrollIndicator={false} >
                            <Image source={{ uri }} style={styles.img}/>
                            <Text style={styles.name} >{productDetails.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price} >{productDetails.price} ₽</Text>
                                <StarsComponent rate={productDetails.rateInfo.rate} />
                            </View>
                            {renderProductDetails()}
                        </ScrollView>
                        <View style={styles.buttons}>
                            {!productDetails.rateInfo.isRated && (
                                <LightButtonComponent
                                    style={styles.lightButton}
                                    title={Strings.productScreen.toRate}
                                    onPress={toggleModal} />
                            )}
                            <DarkButtonComponent
                                style={styles.darkButton}
                                title={Strings.productScreen.addToBasket}
                                onPress={() => 0}
                            />
                        </View>
                        <RatingModalComponent
                            isModalVisible={isModalVisible}
                            toggleModal={toggleModal}
                            productId={productDetails.id}
                        />
                    </>
                )
            }
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
    img: {
        resizeMode: 'cover',
        flex: 1,
        aspectRatio: 1,
        borderRadius: 8
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 20,
        color: Colors.offBlack
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    price: {
        fontSize: 30,
        fontWeight: '700',
        marginTop: 7,
        color: Colors.offBlack
    },
    buttons: {
        margin: 15,
        flexDirection: 'row'
    },
    lightButton: {
        flex: 0.4,
        marginRight: 10
    },
    darkButton: {
        flex: 1
    },
    detailsContainer: {
        marginTop: 5,
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        marginVertical: 5,
        fontWeight: '600'
    },
    detail: {
        justifyContent: 'space-between',
    },
    description: {
        fontSize: 18,
        marginVertical: 5
    }
});
