import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';

const GeneralRecipient = (props) => {
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    let category = useSelector(state => state.user.selectedCategory);
    let store = useSelector(state => state.user.selectedStore);
    let cart = useSelector(state => state.user.cart);

    console.log(cart)
    const [deliveryAmount, setDeliveryAmount] = useState(3.78)


    const getProductTotal = () => {
        const sum = cart.reduce((accumulator, object) => {
            return accumulator + object.price;
        }, 0)
        return sum
    }

    const getEstimateTotal = () => {
        const sum = cart.reduce((accumulator, object) => {
            return accumulator + object.salePrice * object.quantity;
        }, 0)
        var total = deliveryAmount + sum
        console.log(total)
        return total.toFixed(2)
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
            <Header showLeft={true} title='Cart' navigation={props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    cart.map(val => (
                        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, borderColor: '#A6A6A6', borderWidth: 0.5, padding: 20, borderRadius: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>Product Category</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>{category.name}</Text>
                            </View>
                            <View style={{ height: 0.5, width: windowWidth - 100, backgroundColor: '#A6A6A6' }}></View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>Product</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>{val.name.slice(0,20)}</Text>
                            </View>
                            <View style={{ height: 0.5, width: windowWidth - 100, backgroundColor: '#A6A6A6' }}></View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>Merchant</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>Wallmart</Text>
                            </View>
                            <View style={{ height: 0.5, width: windowWidth - 100, backgroundColor: '#A6A6A6' }}></View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>Product Total</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>${val.salePrice ? val.salePrice * val.quantity : val.msrp * val.quantity}</Text>
                            </View>
                            <View style={{ height: 0.5, width: windowWidth - 100, backgroundColor: '#A6A6A6' }}></View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>Cost to delivery</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>$3.78</Text>
                            </View>
                        </View>
                    ))
                }

                {/* <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, borderColor: '#A6A6A6', borderWidth: 0.5, padding: 20, borderRadius: 10 }}>
                    <View>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }}>Include tip for driver</Text>
                    </View>
                    <View style={{ marginTop: 10, borderColor: '#A6A6A6', borderWidth: 0.5, padding: 10, borderRadius: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }}>4.0$</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Poppins_500Medium', marginRight: 15 }}>+</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }}>-</Text>
                            </View>


                        </View>
                    </View>
                </View> */}
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image source={require('../../../assets/line.png')} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30, marginBottom: 10, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Poppins_500Medium' }}>Estimate Total</Text>
                    <Text style={{ fontFamily: 'Poppins_500Medium' }}>${getEstimateTotal()}</Text>
                </View>
                <View style={{ marginBottom: 30, marginTop: 20 }}>
                    {/* <TouchableOpacity onPress={() => props.navigation.navigate('DeliveryView', {
                        totalPrice:getEstimateTotal()
                    })} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Confirm</Text>
                    </TouchableOpacity> */}
                    <Button title={'Confirm'} onHandlePress={() => {
                        props.navigation.navigate('DeliveryView', {
                            totalPrice: getEstimateTotal()
                        })
                    }} />
                </View>
            </ScrollView>
            {/* </BorderBackground> */}
        </SafeAreaView>
    )
}

export default GeneralRecipient