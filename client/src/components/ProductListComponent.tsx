import React from 'react';
import {
    FlatList, Image,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import 'react-native-dotenv';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { RootNativeStackNavigator, RootScreenNamesEnum } from '../navigation/RootNavigator';
import { ProductType } from '../store/types';

import { EmptyListComponent } from './EmptyListComponent';
import { LoadingComponent } from './LoadingComponent';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootNativeStackNavigator, RootScreenNamesEnum.ProductScreen>

type ProductListComponentPropsType = {
    data: ProductType[],
    isLoading: boolean,
    onEndReached: () => void
}

const NUM_COLUMNS = 2;
const ICON_NAME = 'plus';
const ICON_SIZE = 20;

export const ProductListComponent = (props: ProductListComponentPropsType) => {
    const { data, isLoading, onEndReached } = props;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const goToProductScreen = (product: ProductType) => {
        navigation.navigate(RootScreenNamesEnum.ProductScreen, { product });
    };

    const renderItem = ({ item }: ListRenderItemInfo<ProductType>) => {
        const uri = process.env.REACT_APP_API_URL+ '/' + item.img;

        return(
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => goToProductScreen(item)}
            >
                <Image source={{ uri }} style={styles.img}/>
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
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
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
    emptyComponent: {
        marginTop: 150
    },
    img: {
        width: 150,
        height: 150,
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
