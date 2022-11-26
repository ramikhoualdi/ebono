import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, FlatList } from 'react-native';
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
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';


const CartItem = (props) => {
    const { data } = props.route.params
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

    console.log(data, 'DATAA')

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
            <Header showLeft={true} title={'Order Details'} navigation={props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    data.productList.map(val => (
                        <View key={val.id} style={{
                            margin: 30, marginTop: 20, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, elevation: 5, padding: 10, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#333333' }}>{val.name.slice(0,20)}</Text>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#333333' }}>${val.salePrice}</Text>
                            </View>
                        </View>
                    ))
                }
                <View style={{
                    margin: 30, marginTop: 20, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, elevation: 5, padding: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#333333' }}>Total Price</Text>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#333333' }}>${data.totalPrice}</Text>
                    </View>
                </View>
                <View style={{
                    margin: 30, marginTop: 20, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, elevation: 5, padding: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#333333' }}>Merchant</Text>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#333333' }}>Walmart</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginBottom: 30, marginTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {/* <TouchableOpacity onPress={() => props.navigation.pop()} style={{ backgroundColor: 'white', width: 180, alignItems: 'center', borderRadius: 10, padding: 15, borderWidth: 0.5, borderColor: '#A6A6A6' }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#A6A6A6' }}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('RecipientView', {
                    productData: data
                })} style={{ backgroundColor: '#150E68', width: 180, alignItems: 'center', borderRadius: 10, padding: 15, marginLeft: -10 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Accept</Text>
                </TouchableOpacity> */}
                <Button title={'Accept'} onHandlePress={() => {
                    props.navigation.navigate('RecipientView', {
                        productData: data
                    })
                }} />
            </View>
            {/* </BorderBackground> */}
        </SafeAreaView>
    )

}

export default CartItem