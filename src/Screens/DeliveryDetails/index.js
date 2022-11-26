import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
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
import { TextInput } from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../utils/toast';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';



const DeliveryDetails = (props) => {
    const { totalPrice } = props.route.params
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [displayDate, setDisplayDate] = useState(false)
    const [token, setToken] = useState()
    let category = useSelector(state => state.user.selectedCategory);
    let store = useSelector(state => state.user.selectedStore);
    let cart = useSelector(state => state.user.cart);

    const getUserToken = async () => {
        var userToken = await AsyncStorage.getItem('token')
        setToken(userToken)
    }

    useEffect(() => {
        getUserToken()
    }, [])

    const changeSelectedDate = (event, selectedDate) => {
        // console.log(selectedDate)
        setDisplayDate(false)
        setCurrentDate(selectedDate)
    }

    const confirmRequest = async () => {
        setLoading(true)
        var productList = cart.map(val => {
            var products = {
                quantity: val.quantity,
                product: val._id
            }
            return products
        })
        // console.log(productList, address, currentDate, totalPrice)
        await api({
            method: 'POST',
            url: '/request/request',
            headers: {
                'x-auth-token': token
            },
            data: {
                productList: cart,
                address: address,
                deliveryDate: currentDate,
                totalPrice: totalPrice
            }
        }).then((res) => {
            // console.log(res.data, 'RESPONSE')
            setLoading(false)
            showToast('success', 'Request', 'Request Added')
            setTimeout(() => {
                props.navigation.navigate('RecipientThankyou')
            }, 10)

        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
        console.log(cart, 'CART')
    }
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


    console.log(currentDate)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <BorderBackground> */}
            <Header showLeft={true} title='Delivery Details' navigation={props.navigation} />
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='black' />
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                        <View style={{ marginTop: 80, alignItems: 'center' }}>
                            {/* <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>Your Donation Is On The Way!</Text> */}
                            <View style={{ marginTop: 20 }}>
                                <Image source={require('../../../assets/map.png')} />
                            </View>
                        </View>
                        {/* <View style={{ marginLeft: 30, marginRight: 30, marginTop: 20, marginBottom: 10, padding: 20, paddingTop: 20, borderRadius: 10, backgroundColor: 'white' }}> */}
                        <View>
                            {/* <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>Address:</Text> */}
                            {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 200 }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', color: '#A6A6A6' }}>12345 East Man St Apt #303 Las Angeles, California</Text>
            </View>
            <TouchableOpacity>
                <AntDesign name='edit' color={'#D7D7D7'} size={24} />
            </TouchableOpacity>
        </View> */}

                                <View style={{ marginTop: 20, marginLeft: 30, marginRight: 30, marginBottom: 20 }}>
                                    <TextInput
                                        label="Address"
                                        value={address}
                                        // left={<TextInput.Affix text={'+'} />}
                                        onChangeText={address => setAddress(address)}
                                        style={{ backgroundColor: 'white', borderRadius: 10, fontSize: 14, borderColor: '#999999', borderWidth: 1 }}
                                        underlineColor='transparent'
                                        activeUnderlineColor='transparent'
                                        theme={{ roundness: 10, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                                    />
                                </View>
                        </View>
                        {/* </View> */}
                        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, padding: 20, paddingTop: 20, borderRadius: 10, backgroundColor: 'white', borderColor: '#999999', borderWidth: 1 }}>
                            <View>
                                <TouchableOpacity onPress={() => setDisplayDate(true)}>
                                    <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>Deliver Date</Text>
                                    <View>
                                        {
                                            currentDate && <Text style={{ fontFamily: 'Poppins_500Medium', color: '#A6A6A6' }}>{currentDate.toString()}</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                                {
                                    displayDate && (
                                        <RNDateTimePicker
                                            display='default'
                                            style={{ width: 200 }}
                                            value={currentDate}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate="2016-05-01"
                                            maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            // cancelBtnText="Cancel"
                                            // onError={()=>setDisplayDate(false)}
                                            onChange={changeSelectedDate}
                                        />
                                    )
                                }

                            </View>
                        </View>
                        
                        <View style={{ marginBottom: 30, marginTop: 20 }}>
                            {/* <TouchableOpacity onPress={() => confirmRequest()} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Confirm</Text>
                            </TouchableOpacity> */}
                            <Button title={'Confirm'} onHandlePress={() => {
                                confirmRequest()
                            }} />
                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                )
            }
            {/* </BorderBackground> */}
        </SafeAreaView>
    )
}

export default DeliveryDetails