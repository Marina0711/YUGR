import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { AddedProductsType, OrderType } from '../store/types';

import { EmptyListComponent } from './EmptyListComponent';

type OrderListComponentPropsType = {
    data: OrderType[]
}

export const OrderListComponent = (props: OrderListComponentPropsType) => {
    const { data } = props;

    const renderHeaderComponent = () => (
        <>
            {data.length > 0 && (
                <Text style={styles.header}>{Strings.userScreen.ordersHistory}</Text>
            )}
        </>
    );

    const renderItem = ({ item }: ListRenderItemInfo<OrderType>) => {
        const { id, date, products, total } =  item;
        const formattedDate = new Date(date).toLocaleDateString();

        return (
            <View style={styles.item}>
                <View style={styles.itemHeader} >
                    <Text style={styles.productId}>{Strings.userScreen.orderCode}{id}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <View style={styles.products}>
                    {products.map((product: AddedProductsType, index: number) => (
                        <View key={product.id} style={styles.product}>
                            <Text style={styles.text} >{index + 1}. {product.name} x {product.count}</Text>
                            <Text style={styles.text} >{product.count * product.price} ₽</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.text}>{Strings.userScreen.orderPrice}</Text>
                    <Text style={styles.total} >{total} ₽</Text>
                </View>
            </View>
        );
    };

    const renderEmptyComponent = () => (
        <EmptyListComponent text={Strings.userScreen.noOrders} style={styles.emptyComponent} />
    );

    const getKeyExtractor = (item: OrderType) => item.id + item.date.toString();

    return (
        <FlatList
            data={data}
            bounces={false}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={getKeyExtractor}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={renderHeaderComponent}
            ListEmptyComponent={renderEmptyComponent}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 15,
        backgroundColor: Colors.bleachedSilk,
        color: Colors.basaltGrey
    },
    item: {
        backgroundColor: Colors.white,
        marginBottom: 20,
        borderRadius: 8
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: Colors.offBlack,
    },
    products: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.bleachedSilk,
    },
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    total: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.verifiedBlack
    },
    text: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: '400',
        color: Colors.verifiedBlack
    },
    productId: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white
    },
    date: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.bleachedSilk
    },
    emptyComponent: {
        marginTop: 150
    },
});
