import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ScrollView, SafeAreaView, } from 'react-native'
import Lista from './Lista'
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux'
import { addUser, calculateAcounts, removeAllUsers } from '../redux/action'
import { DataState } from '../redux/reducer'

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
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>Ingresar persona</Text>
                    <TextInput
                        placeholder= 'Persona..'
                        style={styles.input}
                        onChangeText={onChangeInputAmount}
                        value={input.user}
                    ></TextInput>
                    <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>Ingresar monto </Text>
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
                        <Image source={require('../assets/clarita.png')} style={{ width: "100%", height: 100, marginTop: 100 }} />
                    ) : null}

                </View>
                    <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        {totalAmount.length ? (
                            <Text style={{ marginTop: 20, fontWeight: "800", color: "#FFC300", marginBottom: 20, fontSize: 19 }}>TOTAL GASTOS: $ {suma.toLocaleString()} </Text>

                        ) : null}
                        <Lista />
                        <TouchableOpacity
                            style={totalAmount.length > 1 ? styles.buttonAdd : styles.buttonAddDisabled}
                            onPress={handleCalculateAccounts}
                            disabled={totalAmount.length > 1 ? false : true} >
                            <Text style={{ color: "black", fontSize: 17, fontWeight: "500" }}>CALCULAR</Text>
                        </TouchableOpacity>
                    </View>



            </ScrollView>
        </SafeAreaView>

    )
}

export default Home


const styles = StyleSheet.create({

    input: {
        height: 40,
        width: 300,
        margin: 10,
        borderWidth: 0,
        backgroundColor: "#ECEDF4",
        padding: 9,
        borderRadius: 300,
        fontSize: 14,
        opacity: 0.7,
        fontWeight: "600",
        elevation: 9,
        shadowColor: 'rgba(255, 255, 255,1)',
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    containerPage: {
        flex: 1,
        backgroundColor: '#4A1955',
        alignItems: 'center',
        justifyContent: "flex-start",
        paddingTop: 50,
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
        backgroundColor: '#B3B3B3',
        padding: 6,
        margin: 20,
        height: 40,
        width: 150,
        borderRadius: 40,
        opacity: 0
    },


});

