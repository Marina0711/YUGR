import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../assets/Colors';

type RatingComponentPropsType = {
    rate: number,
    setRate?: (rate: number) => void,
    iconSize?: number
}

enum StarsEnum {
    half = 'star-half-sharp',
    outline = 'star-outline',
    sharp = 'star-sharp'
}

const stars = [1, 2, 3, 4, 5];

const getStarName = (i: number, fullStarIndexes: number, halfStarIndex: number) => {
    if (i <= fullStarIndexes) {
        return StarsEnum.sharp;
    } else if (i === halfStarIndex) {
        return StarsEnum.half;
    } else {
        return StarsEnum.outline;
    }
};

export const StarsComponent = (props: RatingComponentPropsType) => {
    const { rate, setRate, iconSize = 25 } = props;
    const fullStarIndexes = Math.trunc(rate);
    const halfStarIndex = Math.ceil(rate);

    return (
        <View style={styles.container}>
            {stars.map((i) => (
                <TouchableOpacity
                    key={i}
                    activeOpacity={1}
                    onPress={() => setRate && setRate(i)}
                >
                    <Icon
                        name={getStarName(i, fullStarIndexes, halfStarIndex)}
                        size={iconSize}
                        color={Colors.eyelashViper}
                        style={styles.star}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    star: {
        marginLeft: 3
    }
});
