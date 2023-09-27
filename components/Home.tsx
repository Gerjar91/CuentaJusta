import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ScrollView, SafeAreaView, } from 'react-native'
import Lista from './Lista'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, calculateAcounts } from '../redux/action'
import { DataState } from '../redux/reducer'
import { LinearGradient } from 'expo-linear-gradient'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

interface InputData {
    user?: string,
    amount?: string
}


function Home({ navigation }: any) {

    const dispatch = useDispatch()


    //estados para cargar los input 
    const [input, setInput] = useState<InputData>({
        user: "",
        amount: ""
    })
    const onChangeInputAmount = (text: string) => {
        setInput({
            ...input,
            user: text
        })
    }
    const onChangeInputDescr = (text: string) => {
        setInput({
            ...input,
            amount: text.toLocaleString()
        })
    }

    //funcion para cargar en estado de REDUX usuarios
    const addUserToList = () => {
        if (Object.keys(input).length) {
            dispatch(addUser(input))
        }
        setInput({
            user: "",
            amount: ""
        })

    }



    // estado para controlar disabled del boton cargar persona 
    const [disabled, setdisabled] = useState(true)
    useEffect(() => {
        if (
            Object.keys(input).length > 0 &&
            input.amount !== undefined &&
            input.amount.length > 0 &&
            input.user !== undefined &&
            input.user.length > 0
        ) {
            setdisabled(false);
        } else {
            setdisabled(true);
        }
    }, [input]);

    // calcular la division de cuentas entre los usuarios cargados
    const totalAmount = useSelector((state: DataState) => state.dataUser)
    const suma = totalAmount.reduce((total, element) => total + parseFloat(element.amount), 0);
    const handleCalculateAccounts = () => {
        dispatch(calculateAcounts())
        navigation.navigate('Calculation')

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
                    <View style={styles.container}>
                        <Text style={{ color: "#ECE5F1", fontWeight: "500", fontSize: 18, marginBottom: 10 }}>Ingresar persona</Text>
                        <TextInput
                            placeholder='Persona..'
                            style={styles.input}
                            onChangeText={onChangeInputAmount}
                            value={input.user}
                        ></TextInput>
                        <Text style={{ color: "#ECE5F1", fontWeight: "500", fontSize: 18, marginTop: 15, marginBottom: 10 }}>Ingresar monto </Text>
                        <TextInput
                            placeholder='Monto..'
                            style={styles.input}
                            onChangeText={onChangeInputDescr}
                            value={(input.amount)}
                            keyboardType="numeric"

                        ></TextInput>
                        <TouchableOpacity
                            style={disabled ? styles.buttonAddDisabled : styles.buttonAdd}
                            onPress={addUserToList}
                            disabled={disabled}
                        >
                            <Text
                                style={{ color: "black", fontSize: 17, fontWeight: "500" }}>CARGAR
                            </Text>
                        </TouchableOpacity>
                        {!totalAmount.length ? (
                            <Image source={require('../assets/Logo_Sin_Fondo.png')} style={{ width: "80%", height: 100, marginTop: 20 }} />
                        ) : null}
                    </View>
                    <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        {totalAmount.length ? (
                            <Text style={{ marginTop: 20, fontWeight: "800", color: "#FFC300", marginBottom: 20, fontSize: 19 }}>TOTAL GASTOS: $ {suma.toLocaleString()} </Text>

                        ) : null}
                        <View style={styles.horizontalLine} />
                        <Lista />
                        <TouchableOpacity
                            style={totalAmount.length > 1 ? styles.buttonAdd : styles.buttonAddDisabledCalc}
                            onPress={handleCalculateAccounts}
                            disabled={totalAmount.length > 1 ? false : true} >
                            <Text style={{ color: "black", fontSize: 17, fontWeight: "500" }}>CALCULAR</Text>
                        </TouchableOpacity>
                        <BannerAd
                            unitId={adUnitId}
                            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true,
                            }}
                        />
                    </View>

                </ScrollView>

            </LinearGradient>

        </SafeAreaView>

    )
}

export default Home


const styles = StyleSheet.create({

    input: {
        height: 40,
        width: 300,
        margin: 10,
        marginTop: 5,
        borderWidth: 0,
        backgroundColor: "#E1E0E8",
        padding: 9,
        borderRadius: 8,
        fontSize: 14,
        fontWeight: "600",
        elevation: 3,
        shadowColor: 'rgba(255, 255, 255,1)',
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 40

    },
    horizontalLine: {
        borderBottomColor: '#DEDDE1',
        width: "80%", // Color de la línea
        borderBottomWidth: 1,      // Ancho de la línea
        marginVertical: 20,
        opacity: 0.7    // Espacio vertical alrededor de la línea
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
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        marginTop: 40
    },

    buttonAdd: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFC300',
        padding: 6,
        margin: 20,
        height: 40,
        width: 150,
        borderRadius: 40,
        boxshadow: "white",
        elevation: 6,
        shadowColor: 'rgba(255, 195, 0,1)',
    },
    buttonAddDisabled: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFC300',
        padding: 6,
        margin: 20,
        height: 40,
        width: 150,
        borderRadius: 40,
        opacity: 0.3
    },
    buttonAddDisabledCalc: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#B3B3B3',
        padding: 6,
        margin: 20,
        height: 40,
        width: 150,
        borderRadius: 40,
        opacity: 0
    }


});


