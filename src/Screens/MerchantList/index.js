import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';
import DonorView from '../../Components/DonorView';
import api from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectedStore } from '../../actions/user';

const MerchantList = (props) => {
    const dispatch = useDispatch()
    const [storeData, setStoreData] = useState()
    let store = useSelector(state => state.user.selectedStore);

    const getStoreData = async () => {
        await api({
            method: 'GET',
            url: '/stores'
        }).then((res) => {
            setStoreData(res.data.store)
        }).catch(err => {
            console.log(err)
        })
    }

    const selectStore = (id) => {
        var filteredData = [...storeData]
        storeData.map(val => {
            if (val._id == id) {
                val.selected = true
            } else {
                val.selected = false
            }
        })
        var store = filteredData.find(x => x.selected === true)
        dispatch(selectedStore(store))
        setStoreData(filteredData)
    }

    useEffect(() => {
        getStoreData()
    }, [])

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
        <DonorView navigation={props.navigation} navParam={'ProductCategory'} title={'Donor'} subTitle={'Select From The Following List Of Merchants'}>
            <View>
                {
                    storeData && storeData.map(val => (
                        <TouchableOpacity key={val._id} onPress={() => selectStore(val._id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', margin: 10, padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 10 }}>
                            <RadioButton.Android status={val.selected ? 'checked' : 'unchecked'} />
                            <Text style={{ fontFamily: 'Poppins_500Medium' }}>{val.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View>
                <ImageBackground source={require('../../../assets/flag.png')} style={{ margin: 20, alignItems: 'center', marginTop: 10 }} imageStyle={{ borderRadius: 10 }}>
                    <Text style={{ padding: 30, color: 'white', fontFamily: 'Poppins_600SemiBold' }}>Kindness Is Contagious</Text>
                </ImageBackground>
            </View>
            <View>
                <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                    <TouchableOpacity disabled={store == undefined || null ? true : false} onPress={() => props.navigation.navigate('ProductCategory')} style={store == undefined || null ? styles.disableBtnStyle : styles.btnStyle}>
                        <AntDesign name='arrowright' color={store == undefined || null ? 'grey' : '#150E68'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </DonorView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
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
    },
    disableBtnStyle: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center'
    }
});


export default MerchantList