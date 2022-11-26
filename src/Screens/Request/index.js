import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
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
import axios from 'axios';
import Header from '../../Components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';



const Request = (props) => {
    const [searchKeyword, setSearchKeyword] = useState()
    const [donorData, setDonorData] = useState()
    const [selectedId, setSelectedId] = useState()
    const [selectedOrg, setSelectedOrg] = useState()
    const [loading, setLoading] = useState(false)
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const blueGradient = ['#3CA0F0', '#1247FF']


    const getDonorData = () => {
        setLoading(true)
        axios({
            method: 'GET',
            url: `https://api.data.charitynavigator.org/v2/Organizations?app_id=4dc76435&app_key=0c79cbfeef69e60d570934967cdcac34&search=${searchKeyword}&searchType=NAME_ONLY`
        }).then((res) => {
            setDonorData(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setSelectedId(item.ein), setSelectedOrg(item) }} style={{ marginLeft: 40, backgroundColor: 'white', borderBottomColor: '#C5C5C5', borderBottomWidth: 1, marginRight: 40, alignItems: 'center', padding: 8 }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', color: item.ein == selectedId ? '#150E68' : 'black', fontSize: 16 }}>{item.charityName}</Text>
            </TouchableOpacity>
        );
    };

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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header showLeft={true} title='Charity Organization' navigation={props.navigation} />
                    <View style={{ marginTop: 40, marginLeft: 30, marginRight: 30, marginBottom: 20 }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>Select Charity Organization To Proceed</Text>
                            <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>If you are not enrolled in any Charity, kindly leave this blank</Text>
                        </View>
                        <TextInput
                            label="Search Keyword"
                            value={searchKeyword}
                            // left={<TextInput.Affix text={'+'} />}
                            onChangeText={searchKeyword => setSearchKeyword(searchKeyword)}
                            style={{ backgroundColor: 'white', borderRadius: 10, fontSize: 14, borderColor: '#99999', borderWidth: 1 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            onEndEditing={() => {
                                getDonorData()
                            }}
                            theme={{ roundness: 10, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                        />
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#999999', marginTop: 10, margin: 20, padding: 10, borderRadius: 10 }}>
                        <LinearGradient colors={blueGradient} style={{ padding: 15, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Choose A Charity Organization </Text>

                        </LinearGradient>
                        <FlatList
                            data={donorData}
                            style={{ marginBottom: 20 }}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center' }}>
                                    {
                                        !loading ? (
                                            <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>Kindly Search To Get Available Results</Text>
                                        ) : (
                                            <ActivityIndicator color={'black'} size='large' />
                                        )
                                    }
                                </View>
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 30, marginTop: 20 }}>
                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('PaymentMethod', {
                    productData: productData,
                    selectedOrg: selectedOrg
                })} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Confirm</Text>
                </TouchableOpacity> */}
                        <Button title={'Confirm'} onHandlePress={() => {
                            props.navigation.navigate('CharityAmount', {
                                selectedOrg: selectedOrg,
                                fromCharity:true
                            })
                        }} />
                    </View>
                </ScrollView>
            {/* </BorderBackground> */}

        </SafeAreaView>
    )

}
export default Request