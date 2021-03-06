import React, { useCallback } from 'react';
import {
    FlatList,
    Image,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { RootNativeStackNavigator, RootScreenNamesEnum } from '../navigation/RootNavigator';
import { basketStore } from '../store/BasketStore';
import { ProductType } from '../store/types';

import { EmptyListComponent } from './EmptyListComponent';
import { LoadingComponent } from './LoadingComponent';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootNativeStackNavigator, RootScreenNamesEnum.ProductScreen>

type ProductListComponentPropsType = {
    data: ProductType[],
    isLoading: boolean,
    onEndReached: () => void,
    onRefresh: () => void
}

const NUM_COLUMNS = 2;
const ICON_NAME = 'plus';
const ICON_SIZE = 20;

export const ProductListComponent = observer((props: ProductListComponentPropsType) => {
    const { data, isLoading, onEndReached, onRefresh } = props;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const checkProductInBasket = useCallback((productId: number) => {
        return basketStore.products.some((item) => item.id === productId);
    }, [ basketStore.products ]);

    const goToProductScreen = (productId: number) => {
        navigation.navigate(RootScreenNamesEnum.ProductScreen, { productId });
    };

    const addProductHandler = async (productId: number) => {
        await basketStore.addProductToBasket(productId);
    };

    const renderItem = ({ item }: ListRenderItemInfo<ProductType>) => {
        const uri = process.env.REACT_APP_API_URL+ '/' + item.img;
        const isInBasket = checkProductInBasket(item.id);

        return(
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => goToProductScreen(item.id)}
            >
                <Image source={{ uri }} style={styles.img}/>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price} >{item.price} ???</Text>
                {!isInBasket && (
                    <TouchableOpacity
                        style={styles.plusContainer}
                        onPress={() => addProductHandler(item.id)}
                    >
                        <Icon name={ICON_NAME} size={ICON_SIZE} color={Colors.white} />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    };

    const renderEmptyList = () => {
        return (
            <EmptyListComponent text={Strings.homeScreen.noProducts} style={styles.emptyComponent} />
        );
    };

    const getKeyExtractor = (item: ProductType) => item.id + item.name;

    const renderListFooterComponent = () => {
        return(
            <>
                {isLoading && data.length > 0 && (
                    <LoadingComponent style={styles.loading} />
                )}
            </>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            columnWrapperStyle={styles.row}
            numColumns={NUM_COLUMNS}
            ListEmptyComponent={renderEmptyList}
            keyExtractor={getKeyExtractor}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderListFooterComponent}
            refreshing={isLoading}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            onRefresh={onRefresh}
        />
    );
});

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 15
    },
    itemContainer: {
        flex: 0.47,
    },
    emptyComponent: {
        marginTop: 150
    },
    img: {
        resizeMode: 'cover',
        flex: 1,
        aspectRatio: 1,
        borderRadius: 8
    },
    name: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: 10,
        color: Colors.kettleman
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 7,
        color: Colors.offBlack
    },
    plusContainer: {
        position: 'absolute',
        bottom: 60,
        right: 10,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: Colors.kettleman
    },
    loading: {
        backgroundColor: Colors.bleachedSilk
    }
});
