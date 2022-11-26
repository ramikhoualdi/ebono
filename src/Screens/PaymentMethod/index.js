import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
    CardField,
    useStripe,
    CardFieldInput,
    useConfirmPayment
} from '@stripe/stripe-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AuthView from '../../Components/AuthView';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import BorderBackground from '../../Components/BorderBackground';


const PaymentMethod = (props) => {
    const { productData, selectedOrg, fromCharity, amount } = props.route.params
    const [selectedMethod, setSelectedMethod] = useState('Stripe')
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const user = useSelector(state => state.auth.user)

    console.log(productData, 'DATA')


    const fetchPaymentSheetParams = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //sentAmount is base_currency in USD
            body: JSON.stringify({ amount: fromCharity ? amount : productData.totalPrice })
        };
        const response = await fetch(`https://ebono-server.herokuapp.com/api/stripe/payment-sheet`, requestOptions)
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            merchantDisplayName: 'Weeglo',
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,

        });
        console.log(error, 'ERROR')
        if (!error) {
            setPaymentLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        // see below
        const { error } = await presentPaymentSheet();
        if (error) {
            // Alert.alert(`Error code: ${error.code}`, error.message);
            console.log(error)
        } else {
            donorTypeData()
            setLoading(true)
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);


    const getUserToken = async () => {
        var userToken = await AsyncStorage.getItem('token')
        setToken(userToken)
    }

    useEffect(() => {
        getUserToken()
    }, [])

    const acceptRequest = async () => {
        console.log('ACCEPT REQUESTTT')
        try{
            setLoading(true)
            if(fromCharity) {
                console.log('FROMM CAHRITYYY')
                await api({
                    method: 'POST',
                    url: '/request/accept-requestcharity',
                    headers: {
                        'x-auth-token': token
                    },
                    data: {
                        selectedOrg: selectedOrg ? selectedOrg.charityName : 'No Organization',
                        totalAmount:amount,
                        fromCharity:true
                    }
                }).then((res) => {
                    console.log(res.data,'CHARITYYYYY')
                    showToast('success', 'Thank you', 'Request Accepted')
                    setLoading(false)
                    props.navigation.navigate('HomeTabs')
                }).catch((err) => {
                    console.log(err,'ERRRRRR')
                    setLoading(false)
                    // setTimeout(() => {
                    //     props.navigation.navigate('Doordash', {
                    //         trackingURL: 'Tracking URL Not Available'
                    //     })
                    // }, 100)
                })
            } else {
                await api({
                    method: 'POST',
                    url: '/request/accept-request',
                    headers: {
                        'x-auth-token': token
                    },
                    data: {
                        requestId: productData._id
                    }
                }).then((res) => {
                    console.log(res.data)
                    setLoading(false)
                    showToast('success', 'Thank you', 'Request Accepted')
                    setTimeout(() => {
                        props.navigation.navigate('Doordash', {
                            trackingURL: res.data.tracking_url
                        })
                    }, 100)
                }).catch(err => {
                    console.log(err)
                    setLoading(false)
                    setTimeout(() => {
                        props.navigation.navigate('Doordash', {
                            trackingURL: 'Tracking URL Not Available'
                        })
                    }, 100)
                }) 
            }
            
        }catch(err) {
            console.log(err)
            setTimeout(() => {
                props.navigation.navigate('Doordash', {
                    trackingURL: 'Tracking URL Not Available'
                })
            }, 100)
        }
        
    }

    const donorTypeData = () => {
        setLoading(true)
        api({
            method: 'POST',
            url: '/adminrequest/create',
            headers: {
                'x-auth-token': token
            },
            data: {
                donorPhone: user.phone,
                requestType: selectedOrg ? selectedOrg.charityName : 'No Organization'
            }
        }).then((res) => {
            console.log(res.data)
            acceptRequest()
        }).catch(err => {
            console.log(err)
        })
    }

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
            {/* <BorderBackground> */}
                <Header showLeft={true} title='Payment Method' navigation={props.navigation} />
                {
                    loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color='black' />
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 80 }}>
                                <TouchableOpacity onPress={() => {
                                    setSelectedMethod('Stripe')
                                    openPaymentSheet()
                                }} style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, padding: 40, borderRadius: 10, backgroundColor: 'white', borderColor: selectedMethod == 'Stripe' ? '#150E68' : '#999999', borderWidth: selectedMethod === 'Stripe' ? 2 : 1 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Image source={require('../../../assets/visa.png')} />
                                        <Text style={{ fontFamily: 'Poppins_500Medium', color: '#A6A6A6' }}>189 6798 ****</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedMethod('PayPal')} style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, padding: 40, borderRadius: 10, backgroundColor: 'white', borderColor: selectedMethod == 'PayPal' ? '#150E68' : '#999999', borderWidth: selectedMethod === 'PayPal' ? 2 : 1 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Image source={require('../../../assets/paypal.png')} />
                                        <Text style={{ fontFamily: 'Poppins_500Medium', color: '#A6A6A6' }}>johndoe@gmail.com</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ position: 'absolute', bottom: 0, marginBottom: 30, marginTop: 20, width: '100%' }}>
                            <TouchableOpacity onPress={()=>acceptRequest()} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Save</Text>
                            </TouchableOpacity>
                        </View> */}
                        </View>
                    )
                }
            {/* </BorderBackground> */}
        </SafeAreaView>

    )
}

export default PaymentMethod