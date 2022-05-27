import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { observer } from 'mobx-react-lite';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { displayErrorToast } from '../helpers/ToastDisplayHelper';
import { orderStore } from '../store/OrderStore';
import { StatusEnum } from '../store/types';

import { HeaderLogoComponent } from './HeaderLogoComponent';
import { LightButtonComponent } from './LightButtonComponent';
import { LoadingComponent } from './LoadingComponent';

type RatingModalComponentPropsType = {
    isModalVisible: boolean,
    toggleModal: () => void,
    total: number,
    count: number
}

enum OrderStepsEnum {
    first,
    second
}

const ANIMATION_TYPE = 'pulse';
const ANIMATION_OUT_TIMING = 100;

export const OrderModalComponent = observer((props: RatingModalComponentPropsType) => {
    const { isModalVisible, total, count,  toggleModal } = props;
    const [step, setStep] = useState<OrderStepsEnum>(OrderStepsEnum.first);

    const onBackdropPress = () => {
        toggleModal();
    };

    const onModalHide = () => {
        setStep(OrderStepsEnum.first);
    };

    const onPressButton = async () => {
        try {
            await orderStore.createOrder();
            setStep(OrderStepsEnum.second);
        } catch (e) {
            displayErrorToast(e.message);
        }
    };

    const renderContent = () => {
        switch (step) {
            case OrderStepsEnum.first: return (
                <>
                    <Text style={styles.count}>{Strings.orderModal.numberOfPositions(count)}</Text>
                    <Text style={styles.total}>{Strings.orderModal.total(total)}</Text>
                    <LightButtonComponent
                        title={Strings.orderModal.confirm}
                        style={styles.button}
                        onPress={onPressButton}
                    />
                </>
            );
            case OrderStepsEnum.second: return (
                <>
                    {orderStore.status === StatusEnum.loading ? (
                        <LoadingComponent style={styles.loading}/>
                    ) : (
                        <>
                            <Text style={styles.title}>{Strings.orderModal.successful}</Text>
                            <Text style={styles.text}>{Strings.orderModal.clarificationOfDetails}</Text>
                            <Text style={styles.text}>{Strings.orderModal.goodDay}</Text>
                        </>
                    )}
                </>
            );
        }
    };

    return (
        <Modal
            isVisible={isModalVisible}
            animationIn={ANIMATION_TYPE}
            animationOut={ANIMATION_TYPE}
            animationOutTiming={ANIMATION_OUT_TIMING}
            onBackdropPress={onBackdropPress}
            onModalHide={onModalHide}
        >
            <View style={styles.content}>
                <HeaderLogoComponent style={styles.header} />
                {renderContent()}
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    content: {
        backgroundColor: Colors.pixelWhite,
        borderRadius: 8,
        alignItems: 'center',
        padding: 25
    },
    header: {
        marginTop: 0
    },
    button: {
        paddingHorizontal: 15,
        marginTop: 20
    },
    count: {
        fontSize: 18,
        marginTop: 20,
        color: Colors.kettleman
    },
    total: {
        fontSize: 20,
        marginTop: 5
    },
    loading: {
        marginVertical: 50
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        color: Colors.verifiedBlack
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 10,
        color: Colors.kettleman
    }
});
