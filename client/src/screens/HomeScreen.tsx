import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { CarouselComponent } from '../components/CarouselComponent';
import { HeaderComponent } from '../components/HeaderComponent';
import { ProductListComponent } from '../components/ProductListComponent';

import { Strings } from '../assets/Strings';
import { categoryStore } from '../store/CategoryStore';
import { productStore } from '../store/ProductStore';
import { StatusEnum } from '../store/types';

const limitProducts = 10;

export const HomeScreen = observer(() => {
    const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
    const pageCount = Math.ceil(productStore.count / limitProducts);
    const isLoading = productStore.status === StatusEnum.loading;

    useEffect(() => {
        categoryStore.fetchCategories();
        productStore.fetchProducts();
    }, []);

    const onPressByCategory = (isActive: boolean, id: number, snapToItem: (id: number) => void) => {
        if (!isActive) {
            snapToItem(id);
            setActiveCategoryId(id);
            productStore.fetchProducts(id);
            productStore.setPage(1);
        }
    };

    const onEndReached = () => {
        if (productStore.page < pageCount) {
            const nextPage = productStore.page + 1;
            productStore.fetchProducts(activeCategoryId, nextPage);
        }
    };

    const onRefresh = () => {
        productStore.fetchProducts(activeCategoryId);
        productStore.setPage(1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={Strings.homeScreen.productList} />
            <View style={styles.content}>
                <View>
                    <CarouselComponent
                        data={categoryStore.categories}
                        activeId={activeCategoryId}
                        onPress={onPressByCategory}
                    />
                </View>
                <ProductListComponent
                    data={productStore.products}
                    isLoading={isLoading}
                    onEndReached={onEndReached}
                    onRefresh={onRefresh}
                />
            </View>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
    }
});
