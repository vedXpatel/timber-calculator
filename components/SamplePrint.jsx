import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


const SamplePrint = () => {
    return (
        <View>
            <Text>Sample Print Instruction</Text>

            <View style={styles.btn}>
                <Button
                    title="Print Receipt"
                />
            </View>
        </View>
    );
};

export default SamplePrint;

const styles = StyleSheet.create({
    btn: {
        marginBottom: 8,
    },
});