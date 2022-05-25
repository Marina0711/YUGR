import React, { useRef } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Colors } from '../assets/Colors';
import { CategoryType } from '../store/types';

const SCREEN_WIDTH = Dimensions.get('window').width - 40;
const SLIDER_ITEM_WIDTH = 120;

type RenderSliderItemType = {
    item: CategoryType,
    index: number
}

type CarouselComponentPropsType = {
    data: CategoryType[],
    activeId: number,
    onClick: (id: number) => void
}

export const CarouselComponent = (props: CarouselComponentPropsType ) => {
    const { data, activeId, onClick } = props;
    const carouselRef = useRef<Carousel<CategoryType>>(null);

    const onPressItem = (id: number) => {
        carouselRef?.current?.snapToItem(id);
        onClick(id);
    };

    const renderSliderItem = ({ item, index }: RenderSliderItemType) => {
        const isActive = activeId === index;

        return (
            <TouchableOpacity
                style={{
                    ...styles.containerTab,
                    backgroundColor:  isActive ? Colors.verifiedBlack : Colors.pixelWhite
                }}
                onPress={() => !isActive && onPressItem(item.id)}
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
            data={data}
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
        marginVertical: 10
    },
    containerTab: {
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 10,
        marginRight: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    }
});
