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
        productStore.fetchCategories();
    }, []);

    const onClickByCategory = (id: number) => {
        setActiveCategoryId(id);
        productStore.fetchCategories(id);
        productStore.setPage(1);
    };

    const onEndReached = () => {
        if (productStore.page !== pageCount) {
            const nextPage = productStore.page + 1;
            productStore.fetchCategories(activeCategoryId, nextPage);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={Strings.homeScreen.productList} />
            <View style={styles.content}>
                <View>
                    <CarouselComponent
                        data={categoryStore.categories}
                        activeId={activeCategoryId}
                        onClick={onClickByCategory}
                    />
                </View>
                <ProductListComponent
                    data={productStore.products}
                    isLoading={isLoading}
                    onEndReached={onEndReached}
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
