

import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DataState } from '../redux/reducer'
import { StyleSheet } from "react-native"
import { removeAllUsers } from '../redux/action'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'


export interface Acount {
    [key: string]: number;
}


function Calculation({ navigation }: any) {
    const dispatch = useDispatch()

    // Renderizar los resultados de la division 
    const acount = useSelector((state: DataState) => state.acounts) as any[][]




    const handleCalculateAccounts = () => {
        dispatch(removeAllUsers())
        setTimeout(() => {

            navigation.navigate('Home')
        }, 300);
    }

    return (

        <SafeAreaView style={styles.containerPage}>
            <LinearGradient
                colors={['#4A1955', '#1F1146']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.5, y: 0.5 }}
                style={styles.linearGradient}
            >
                <ScrollView>
                    <View>
                        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            {acount.map((item, index) =>
                                <View style={styles.containerResult} key={index}>
                                    <View style={styles.listAcount} >
                                        <Text style={{ fontSize: 22, fontWeight: "800" }}>🙂 {item[0]}</Text>
                                        <Text >    paga a..   </Text>
                                        <Text style={{ fontSize: 22, fontWeight: "800" }}>🙂 {item[1]}</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={{ fontSize: 28, fontWeight: "900", color: "#4A1955" }}>$ {(item[2].toFixed(2))}</Text>
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.splitButton}
                                onPress={handleCalculateAccounts}>
                                <Text style={{ color: "black", fontSize: 17, fontWeight: "500" }}>Nueva cuenta</Text>
                            </TouchableOpacity>
                            <Image source={require('../assets/Logo_Sin_Fondo.png')} style={{ width: "80%", height: 100, marginTop: 30 }} />

                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>

        </SafeAreaView>

    )
}

export default Calculation


const styles = StyleSheet.create({
    listAcount: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 40,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",

    },
    price: {
        backgroundColor: "#DFDCD3",
        width: "50%",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        marginTop: 3
    },
    splitButton: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFC300',
        padding: 6,
        margin: 20,
        height: 40,
        width: 150,
        borderRadius: 40,
        elevation: 6,
        shadowColor: 'rgba(255, 195, 0,1)',
    },
    splitButtonDisabled: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFC300',
        padding: 6,
        margin: 20,
        height: 40,
        width: 150,
        borderRadius: 40,
        opacity: 0.1,
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 100
    },
    containerPage: {
        flex: 1,
        backgroundColor: '#4A1955',
        alignItems: 'center',
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%", // Ancho del 100%
        height: '100%'
    },
    containerResult: {
        width: "90%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0EEE8",
        marginTop: 10,
        padding: 5,
        borderRadius: 30,
        elevation: 7,
        shadowColor: 'rgba(255,255, 255,1)',
    }
})
