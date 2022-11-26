import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import AuthView from '../../Components/AuthView';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Components/Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import BorderBackground from '../../Components/BorderBackground';



const RecipientDashboard = (props) => {
    const dispatch = useDispatch()
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const [token, setToken] = useState()
    const [requestData, setRequestData] = useState()
    const [loading, setLoading] = useState(false)

    const getUserToken = async () => {
        var userToken = await AsyncStorage.getItem('token')
        setToken(userToken)
    }

    useEffect(() => {
        getUserToken()
    }, [])

    const getAllRequests = async () => {
        setLoading(true)
        await api({
            method: 'GET',
            url: '/request/user-request',
            headers: {
                'x-auth-token': token
            }
        }).then((res) => {
            console.log(res.data,'DATA OF REQUEST')
            setRequestData(res.data.request)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllRequests()
    }, [token])

    useFocusEffect(
        React.useCallback(() => {
            getAllRequests()
        }, [token])
    )


    let [fontsLoaded, error] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    })

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    console.log(requestData == undefined)



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <BorderBackground> */}
            <Header title='Dashboard' navigation={props.navigation}/>
            <View style={{  marginTop:-30, alignItems:'flex-end' }}>
                <TouchableOpacity onPress={() => dispatch(logout())} style={{ marginRight: 20}}>
                    <AntDesign name='logout' color={'black'} size={22} />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='black' />
                    </View>
                ) : (
                    <View style={{ marginTop: 40, marginLeft: 8 }}>
                        {
                            requestData == undefined && (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18 }}>No Request Found</Text>
                                </View>
                            )
                        }
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginBottom: 90 }}>
                                {
                                    requestData && requestData.map(val => (
                                        <View key={val._id} style={{ backgroundColor: 'white', margin: 20, padding: 12, borderRadius: 10, borderColor:'#999999', borderWidth:1 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'grey' }}>{val.title}</Text>
                                                <Text style={{ fontFamily: 'Poppins_700Bold', color: val.status == 'Pending' ? '#CCCC00' : 'green' }}>{val.status}</Text>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'grey' }}>Address: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'black' }}>{val.deliveryAddress}</Text></Text>
                                                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'grey' }}>Delivery Date: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'black' }}>{val.deliveryDate}</Text></Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular', color: 'grey' }}>Total Products: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'black' }}>{val.productList.length}</Text></Text>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular', color: 'grey' }}>Total Price: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'black' }}>${val.totalPrice}</Text></Text>
                                                </View>
                                                <View>
                                                    {
                                                        val.voucher && (
                                                            <Text style={{ fontFamily: 'Poppins_400Regular', color: 'grey' }}>Voucher Code: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'black' }}>{val.voucher}</Text></Text>
                                                        )
                                                    }
                                                    {
                                                        val.trackingURL && (
                                                            <Text style={{ fontFamily: 'Poppins_400Regular', color: 'grey' }}>Tracking URL: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'black' }}>{val.trackingURL}</Text></Text>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
            }
            {/* </BorderBackground> */}
        </SafeAreaView>
    )

}

export default RecipientDashboard