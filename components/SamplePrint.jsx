import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { hsdLogo } from '../assets/dummy-logo';

async function printreciept() {
    const columnWidths = [24, 24];
    const receiptNo = 120;
    const receiptDate = new Date();
    const originalAccount = '1239';
    const branch = 'Branch Name';
    const telephone = '123-456-7890';
    const salesman = 'John Doe';
    const productCode = 'P123';
    const amount = '500.00';
    const discount = '50.00';
    const amountReceived = '450.00';
    const paymentMethod = 'Credit Card';
    const receivedFrom = 'John Smith';
    const fcuser = 'Rukshan';
    const collectionRecieptNo = 121;

    try {
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(' ABC India PLC', { align: 'center' });
        await BluetoothEscposPrinter.printText('\r\n', {});


        await BluetoothEscposPrinter.printText(collectionRecieptNo +'COLLECTION RECIEPT', {});

        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Receipt No: ' + receiptNo],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Receipt Date: ' + receiptDate],
            {},
        );


        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Original A/C:' + originalAccount],
            {},
        );

        await BluetoothEscposPrinter.printText('\r\n', {});

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Branch:'+ branch],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Telephone:'+ telephone],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Salesman:'+ salesman],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Product Code:'+ productCode],
            {},
        );

        await BluetoothEscposPrinter.printText('\r\n', {});

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Amount:'+ amount +'/='],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Discount:'+ discount+'/='],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Amount Received:'+ amountReceived+'/='],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Payment Method:'+ paymentMethod],
            {},
        );

        await BluetoothEscposPrinter.printText('\r\n', {});

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Received From:'+ receivedFrom],
            {},
        );

        await BluetoothEscposPrinter.printText('\r\n', {});

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Signature:'+ '...................'],
            {},
        );

        await BluetoothEscposPrinter.printColumn(
            [48],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            ['Printed By:'+ fcuser],
            {},
        );


        await BluetoothEscposPrinter.printText('\r\n', {});
    } catch (e) {
        alert(e.message || 'ERROR');
    }
}

const SamplePrint = () => {
    return (
        <View>
            <Text>Sample Print Instruction</Text>

            <View style={styles.btn}>
                <Button
                    title="Print Receipt"
                    onPress={printreciept}
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