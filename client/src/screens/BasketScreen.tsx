import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { DarkButtonComponent } from '../components/DarkButtonComponent';
import { EmptyListComponent } from '../components/EmptyListComponent';
import { HeaderComponent } from '../components/HeaderComponent';
import { OrderModalComponent } from '../components/OrderModalComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { RootNativeStackNavigator, RootScreenNamesEnum } from '../navigation/RootNavigator';
import { basketStore } from '../store/BasketStore';
import { AddedProductsType } from '../store/types';

type BasketScreenNavigationProp = NativeStackNavigationProp<RootNativeStackNavigator, RootScreenNamesEnum.ProductScreen>

enum iconNames {
    plus = 'plus',
    minus = 'minus',
    close = 'close-circle-outline'
}

const ICON_SIZE = 30;

export const BasketScreen = observer(() => {
    const navigation = useNavigation<BasketScreenNavigationProp>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const data = basketStore.products;

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const updateCountHandler = async (productId: number, count: number) => {
        if (count) {
            await basketStore.updateProduct(productId, count);
        }
    };

    const deleteProductHandler = async (productId: number) => {
        await basketStore.deleteProductFromBasket(productId);
    };

    const goToProductScreen = (productId: number) => {
        navigation.navigate(RootScreenNamesEnum.ProductScreen, { productId });
    };

    const getTotal = () => {
        return basketStore.products.reduce((total: number, product: AddedProductsType) => {
            const sum = product.price * product.count;
            return total + sum;
        }, 0 );
    };

    const renderEmptyComponent = () => {
        return <EmptyListComponent text={Strings.basketScreen.empty} style={styles.emptyComponent} />;
    };

    const renderItem = ({ item }: ListRenderItemInfo<AddedProductsType>) => {
        const uri = process.env.REACT_APP_API_URL+ '/' + item.img;

        return (
            <View style={styles.productContainer}>
                <TouchableOpacity onPress={() => goToProductScreen(item.id)}>
                    <Image source={{ uri }} style={styles.img} />
                </TouchableOpacity>
                <View style={styles.infoProduct}>
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price * item.count} ₽</Text>
                    </View>
                    <View style={styles.countContainer}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => updateCountHandler(item.id, item.count + 1)}
                        >
                            <Icon name={iconNames.plus} size={ICON_SIZE} color={Colors.tin} />
                        </TouchableOpacity>
                        <Text style={styles.count}>{item.count}</Text>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => updateCountHandler(item.id, item.count - 1)}
                        >
                            <Icon name={iconNames.minus} size={ICON_SIZE} color={Colors.tin} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => deleteProductHandler(item.id)}>
                    <Icon name={iconNames.close} size={ICON_SIZE} color={Colors.verifiedBlack} />
                </TouchableOpacity>
            </View>
        );
    };

    const renderItemSeparator = () => {
        return <View style={styles.separator} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={Strings.basketScreen.basket} />
            <View style={styles.content}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={renderItemSeparator}
                    ListEmptyComponent={renderEmptyComponent}
                />
                {data.length > 0 && (
                    <View style={styles.footer}>
                        <View style={styles.totalContainer} >
                            <Text style={styles.totalText} >{Strings.basketScreen.total}</Text>
                            <Text style={styles.totalText} >{getTotal()} ₽</Text>
                        </View>
                        <DarkButtonComponent
                            title={Strings.basketScreen.createOrder}
                            onPress={toggleModal}
                        />
                    </View>
                )}
            </View>
            <OrderModalComponent
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                total={getTotal()}
                count={data.length}
            />
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.pixelWhite
    },
    productContainer: {
        flexDirection: 'row',
        marginVertical: 12
    },
    img: {
        resizeMode: 'cover',
        width: 100,
        height: 100,
        aspectRatio: 1,
        borderRadius: 8
    },
    infoProduct: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 20
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.verifiedBlack
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 6,
        color: Colors.basaltGrey
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        borderRadius: 8,
        backgroundColor: Colors.christmasSilver
    },
    count: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 15,
        color: Colors.verifiedBlack
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    totalText: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.verifiedBlack
    },
    emptyComponent: {
        marginTop: 250
    },
    footer: {
        marginTop: 10,
        marginBottom: 20
    }
});
