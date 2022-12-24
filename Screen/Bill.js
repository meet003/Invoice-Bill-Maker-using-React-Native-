import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import dateFormat from 'dateformat';
import { pdf } from './pdf';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
export default function Bill() {
    const [name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Mobile_No, setMobileNO] = useState('');
    const [Product, Set_Product] = useState("TV");
    const [Quantity, setQuantity] = useState('');
    const now = new Date();
    const [Invoice, setInvoice] = useState(dateFormat(now, "ddmmyyhhMss"));
    const [Total, setTotal] = useState('');
    const [ReceivedBalance, SetReceivedBalance] = useState('');
    const [PaymentType, setPaymentType] = useState('Credit');
    const [RemaningBalance, setRemaningBalance] = useState('Paid');
    const [selectedPrinter, setSelectedPrinter] = useState();

    const printToFile = async () => {
        let html = pdf(name, Address, Mobile_No, Quantity, Invoice, Product, Total, ReceivedBalance, PaymentType, RemaningBalance);

        try {
            const { uri } = await Print.
                printToFileAsync({ html });
            console.log("File Saved to", uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

            setName('');
            setInvoice(dateFormat(now, "ddmmyyhhMss"));
            setTotal('');
            setQuantity('');
            SetReceivedBalance('');
            setAddress('');
            setMobileNO('');
        } catch (error) {
            Alert.alert("Make shure You have Internet Connection or contact @+91 9372886505");
        }

    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.Inputcontainer}>
                    <Text>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder='Full Name'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.Inputcontainer}>
                    <Text>Address</Text>
                    <TextInput
                        value={Address}
                        onChangeText={text => setAddress(text)}
                        placeholder='Address'
                        style={styles.textInput}
                    />

                </View>

                <View style={styles.Inputcontainer}>
                    <Text>Mobile NO</Text>
                    <TextInput
                        value={Mobile_No}
                        keyboardType="number-pad"
                        onChangeText={text => setMobileNO(text)}
                        placeholder='Mobile NO'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.Inputcontainer}>
                    <Text>Product :</Text>
                    <View style={styles.Pickercontainer}>
                        <Picker
                            selectedValue={Product}
                            style={styles.Picker}
                            onValueChange={(item, index) =>
                                Set_Product(item)}
                        >
                            <Picker.Item label='TV' value="TV" />
                            <Picker.Item label='Phone' value="Phone" />
                            <Picker.Item label='Ovan' value="Ovan" />
                        </Picker>
                    </View>

                </View>
                <View style={styles.Inputcontainer}>
                    <Text>Quantity</Text>
                    <TextInput
                        value={Quantity}
                        keyboardType="number-pad"
                        onChangeText={text => setQuantity(text)}
                        placeholder='Quantity'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.Inputcontainer}>
                    <Text>Invoice No : </Text>
                    <TextInput
                        value={Invoice}
                        onChangeText={(text) => setInvoice(text)}
                        placeholder="Invoice No"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.Inputcontainer}>
                    <Text>Total: </Text>
                    <TextInput
                        value={Total}
                        onChangeText={(text) => setTotal(text)}
                        placeholder="Total ₹"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.Inputcontainer}>
                    <Text>Received Amount : </Text>
                    <TextInput
                        value={ReceivedBalance}
                        onChangeText={(text) => SetReceivedBalance(text)}
                        placeholder="Received Amount ₹"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.Inputcontainer}>
                    <Text> Remaning Balance : </Text>
                    <TextInput
                        value={RemaningBalance}
                        onChangeText={(text) => setRemaningBalance(text)}
                        placeholder="Remaning Balance ₹"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.Inputcontainer}>
                    <Text>Payment Method : </Text>
                    <View style={styles.Pickercontainer}>
                        <Picker
                            selectedValue={PaymentType}
                            style={styles.Picker}
                            onValueChange={(itemValue, itemIndex) => setPaymentType(itemValue)}
                        >

                            <Picker.Item label="Credit" value="Credit" />
                            <Picker.Item label="Cash" value="Cash" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                    <View style={styles.CreateInvoiceButton}>
                        <Button
                            style={styles.button}
                            title="Create Invoice"
                            onPress={printToFile}
                        />
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 20
    },
    Inputcontainer: {
        marginTop: 18,
        marginLeft: 15,
        marginRight: 15
    },
    textInput: {
        marginTop: 4,
        height: 40,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginBottom: 6,
    },
    Pickercontainer: {
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 50
    },
    button: {
        marginTop: 10,
        marginBottom: 20
    },
    CreateInvoiceButton: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
})