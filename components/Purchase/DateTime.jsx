import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const DateTime = (props) => {
    // const billNo = '12345';
    const {billNo} = props;
    const currentDate = moment().format('DD/MM/YY');
    const currentTime = moment().format('hh:mm:ss');

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Text style={styles.label}>Bill No.: </Text>
                <Text style={styles.value}>{billNo}</Text>
            </View>
            <View style={styles.dateTimeColumn}>
            <View style={styles.rightColumn}>
                <Text style={styles.label}>Date: </Text>
                <Text style={styles.value}>{currentDate}</Text>
            </View>
            <View style={styles.rightColumn}>
                <Text style={styles.label}>Time: </Text>
                <Text style={styles.value}>{currentTime}</Text>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    leftColumn: {
        flexDirection: 'row',
    },
    rightColumn: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    dateTimeColumn: {
        flexDirection: 'column',
    }
});

export default DateTime;
