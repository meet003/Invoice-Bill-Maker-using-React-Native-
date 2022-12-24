import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function homescreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: 300,
                    height: 150
                }}
                source={require('../assets/mss.png')} />
            <TouchableOpacity
                onPress={() => navigation.navigate('Bill')
                }
                style={styles.button}>
                <Text>Create Bill</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fft",
        justifyContent: "center",
        alignItems: 'center'
    },
    button: {
        height: 40,
        width: 100,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10
    }

})