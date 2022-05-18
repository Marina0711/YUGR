import React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '../assets/Colors';
import { RootNativeStackNavigator, RootScreenNamesEnum } from '../navigation/RootNavigator';
import { productStore, ProductType } from '../store/ProductStore';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootNativeStackNavigator, RootScreenNamesEnum.ProductScreen>

const NUM_COLUMNS = 2;
const ICON_NAME = 'plus';
const ICON_SIZE = 20;

export const ProductListComponent = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const goToProductScreen = (product: ProductType) => {
        navigation.navigate(RootScreenNamesEnum.ProductScreen, { product });
    };

    const renderItem = ({ item }: ListRenderItemInfo<ProductType>) => {
        return(
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => goToProductScreen(item)}
            >
                {/*todo insert picture*/}
                <View
                    style={{
                        width: '100%',
                        height: 150,
                        backgroundColor: Colors.tin,
                        borderRadius: 8
                    }}
                />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price} >{item.price} ₽</Text>
                <TouchableOpacity
                    style={styles.plusContainer}
                    onPress={() => 0}
                >
                    <Icon name={ICON_NAME} size={ICON_SIZE} color={Colors.white} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const getKeyExtractor = (item: ProductType) => item.id + item.name;

    return (
        <FlatList
            data={productStore.products}
            renderItem={renderItem}
            columnWrapperStyle={styles.row}
            numColumns={NUM_COLUMNS}
            keyExtractor={getKeyExtractor}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 15
    },
    itemContainer: {
        flex: 0.47,
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
    }
});
