import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { DataState } from "../redux/reducer"
import { removeUser } from '../redux/action';



function Lista() {
    const dispatch = useDispatch()
    const deleteUser = (user: String) => {
        dispatch(removeUser(user))
    }

    const dataUser = useSelector((state: DataState) => state.dataUser)
    let key = 0
    return (
        <View style={{ display: "flex", flexDirection: "column" }}>
            {dataUser?.map((el: any) => (
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={key++}>
                    <TouchableOpacity onPress={() => deleteUser(el.user)} >
                        <Icon name="trash" size={20} color="#FFC300" />
                    </TouchableOpacity>
                    <View style={styles.lista} >
                        <Text style={{ padding: 7, fontWeight: "900", fontSize: 17 }}> 🧑 {el.user?.toUpperCase()}</Text>
                        <Text style={{ padding: 7, fontSize: 18, fontWeight: "500" }}>$ {parseFloat(el.amount).toLocaleString()}</Text>
                    </View>
                </View>
            ))
            }

        </View>
    )
}

export default Lista

const styles = StyleSheet.create({
    lista: {
        backgroundColor: "#F0EEF7",
        borderRadius: 400,
        height: 48,
        width: "85%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 4,
        paddingRight: 20

    },
    button: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: 'red',
        width: 22,
        height: 22,
        borderRadius: 100,
        margin: 4,
    },
})
