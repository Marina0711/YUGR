import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Colors } from '../assets/Colors';
import { CategoryType, productStore } from '../store/ProductStore';

const SCREEN_WIDTH = Dimensions.get('window').width - 40;
const SLIDER_ITEM_WIDTH = 120;

type RenderSliderItemType = {
    item: CategoryType,
    index: number
}

export const CarouselComponent = () => {
    const [activeIndex, setActiveIndex] = useState<number>(1);
    const carouselRef = useRef<Carousel<CategoryType>>(null);

    const onPress = (index: number) => {
        setActiveIndex(index);
        carouselRef?.current?.snapToItem(index);
    };

    const renderSliderItem = ({ item, index }: RenderSliderItemType) => {
        const isActive = activeIndex === index;

        return (
            <TouchableOpacity
                style={{
                    ...styles.containerTab,
                    backgroundColor:  isActive ? Colors.verifiedBlack : Colors.pixelWhite
                }}
                onPress={() => onPress(index)}
            >
                <Text
                    style={{
                        ...styles.text,
                        color: isActive ? Colors.white : Colors.tin
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Carousel
            ref={carouselRef}
            activeSlideAlignment={'start'}
            data={productStore.categories}
            renderItem={renderSliderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SLIDER_ITEM_WIDTH}
            contentContainerCustomStyle={styles.carousel}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
        />
    );
};

const styles = StyleSheet.create({
    carousel: {
        marginVertical: 10,
    },
    containerTab: {
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 10,
        marginRight: 8
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    }
});
