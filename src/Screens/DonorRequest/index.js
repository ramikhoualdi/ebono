import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AuthView from '../../Components/AuthView';
import api from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import BorderBackground from '../../Components/BorderBackground';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../../Components/Button';



const DonorRequest = (props) => {
    const [requestData, setRequestData] = useState()
    const [loading, setLoading] = useState(false)
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const blueGradient = ['#3CA0F0', '#1247FF']
    const orgGradient = ['#F88435', '#FF2F12']
    const [modalVisible, setModalVisible] = useState(false);


    const getAllRequests = async () => {
        setLoading(true)
        await api({
            method: 'GET',
            url: '/request/Pending',
        }).then((res) => {
            // console.log(res.data)
            setRequestData(res.data.request)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllRequests()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getAllRequests()
        }, [])
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



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            <Modal
             animationType="slide"
             transparent={false}
             visible={modalVisible}
             onRequestClose={() => {
               setModalVisible(!modalVisible);
             }}
            >
                <View style={{flex:1,backgroundColor:'black'}}>
                    <View>
                        <TouchableOpacity onPress={()=>setModalVisible(false)} style={{alignItems:'flex-end', margin:40}}>
                            <Text style={{color:'white', fontSize:28}}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Button colors={'blueGradient'} title={'Donate Through Merchant'} onHandlePress={() => {
                            setModalVisible(false)
                        }}/>
                        <Button colors={'blueGradient'} title={'Charity Organization'} onHandlePress={() => {
                            setModalVisible(false)
                            props.navigation.navigate('Request')
                        }}/>
                    </View>
                </View>
            </Modal>
            {/* <BorderBackground> */}
            <Header title='Explore'  navigation={props.navigation} />
            <View>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                }} style={{alignItems:'center', alignContent:'center', backgroundColor:'#3CA0F0', width:40, height:40, alignSelf:'flex-end', justifyContent:'center', borderRadius:10, marginTop:-40, marginRight:10}}>
                    <AntDesign size={24} color='white' name='profile'/>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color='black' />
                        </View>
                    ) : (
                        <View style={{ marginTop: 40, marginLeft: 8, marginBottom: 60 }}>
                            {
                                requestData == undefined && (
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18 }}>No Request Found</Text>
                                    </View>
                                )
                            }
                            {
                                requestData && requestData.map((val, i) => (

                                        <TouchableOpacity onPress={() => props.navigation.navigate('CartItem', {
                                            data: val
                                        })} key={val._id} style={{  padding: 12, borderRadius: 10, backgroundColor:'#3CA0F0', margin:10 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>{val.title}</Text>
                                                <Text style={{ fontFamily: 'Poppins_700Bold', color: 'white' }}>{val.status}</Text>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'black' }}>Address: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>{val.deliveryAddress}</Text></Text>
                                                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'black' }}>Delivery Date: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>{val.deliveryDate}</Text></Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular', color: 'black' }}>Total Products: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>{val.productList.length}</Text></Text>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular', color: 'black' }}>Total Price: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>${val.totalPrice}</Text></Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                ))
                            }
                        </View>
                    )
                }
            </ScrollView>
            {/* </BorderBackground> */}
        </SafeAreaView>
    )

}

export default DonorRequest