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

const getStarName = (i: number, fullStars: number, halfStar: number) => {
    if (i <= fullStars) {
        return StarsEnum.sharp;
    } else if (i === halfStar) {
        return StarsEnum.half;
    } else {
        return StarsEnum.outline;
    }
};

export const StarsComponent = (props: RatingComponentPropsType) => {
    const { rate, setRate, iconSize = 25 } = props;
    const fullStars = Math.trunc(rate);
    const halfStar = Math.ceil(rate);

    return (
        <View style={styles.container}>
            {stars.map((i) => (
                <TouchableOpacity
                    key={i}
                    activeOpacity={1}
                    onPress={() => setRate && setRate(i)}
                >
                    <Icon
                        name={getStarName(i, fullStars, halfStar)}
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
