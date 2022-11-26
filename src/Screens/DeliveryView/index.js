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
import Header from '../../Components/Header';
import BorderBackground from '../../Components/BorderBackground';

const DeliveryView = (props) => {
    const {totalPrice} = props.route.params
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white', borderColor:'#3CA0F0', borderWidth:4, marginLeft:6, marginRight:6, marginTop:40, borderRadius:10, marginBottom:20}}>
            {/* <BorderBackground> */}
            <Header showLeft={true} title='Delivery'  navigation={props.navigation}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 80, alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>Logistics Will Be Handled By A</Text>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>Third Party Delivery Service Doordash</Text>
                <View style={{ marginTop: 60 }}>
                    <Image source={require('../../../assets/doordash.png')} />
                </View>
            </View>
            <Text style={{ marginLeft: 30, marginTop: 60, fontFamily: 'Poppins_500Medium', fontSize: 16 }}>We’re On It.</Text>
            <Text style={{ marginLeft: 30, marginTop: 20, fontFamily: 'Poppins_500Medium', fontSize: 14 }}>You Will Be Notified When Your Order Has Been
                Accepted By A Donor And When It Has Been
                Delivered.</Text>
            <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 40 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('DeliveryDetails', {
                    totalPrice:totalPrice
                })} style={styles.btnStyle}>
                    <AntDesign name='arrowright' color={'#150E68'} size={20} />
                </TouchableOpacity>
            </View>
            </ScrollView>
            {/* </BorderBackground> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnStyle: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: '#150E68',
        alignItems: 'center'
    }
});

export default DeliveryView