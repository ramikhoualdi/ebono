import React, { useState, useEffect } from 'react';
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
import { LineChart } from 'react-native-chart-kit';
import api from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Components/Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import BorderBackground from '../../Components/BorderBackground';


const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const data = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
]

const Dashboard = (props) => {
    const dispatch = useDispatch()
    const [requestData, setRequestData] = useState()
    const [loading, setLoading] = useState(false)
    const [donorTotal, setDonorTotal] = useState()
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

    const getAllRequests = async () => {
        setLoading(true)
        await api({
            method: 'GET',
            url: '/request/Accepted',
        }).then((res) => {
            // console.log(res.data)
            console.log(res.data, 'DATA')
            setRequestData(res.data?.request)
            getRequestPrice(res.data?.request)
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

    const getTotalPrice = () => {
        const sum = requestData.reduce((accumulator, object) => {
            return accumulator + object.totalPrice
        }, 0)
        return sum
    }

    const getRequestPrice = (data) => {
        var newArr = []
        data && data.map(s => {
            newArr.push(s.totalPrice)
        })
        // console.log(newArr)
        setDonorTotal(newArr)
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

    requestData && requestData.map(s => {
        s.productList.map(v => {
            console.log(v.name)
        })
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10 }}>
            {/* <BorderBackground> */}
            <Header title='Dashboard' navigation={props.navigation} />
            <View style={{ marginTop: -30, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => dispatch(logout())} style={{ marginRight: 20 }}>
                    <AntDesign name='logout' color={'black'} size={22} />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='black' />
                    </View>
                ) : (
                    <View style={{ marginBottom: 100 }}>
                        {
                            requestData == undefined && (
                                <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18 }}>Donate and Start Tracking</Text>
                                </View>
                            )
                        }
                        {
                            requestData !== undefined && (
                                <>
                                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                                        {/* <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#150E68' }}>${requestData && getTotalPrice()}</Text> */}
                                        {/* <Text style={{ color: '#A6A6A6', fontFamily: 'Poppins_600SemiBold' }}>Total Spent</Text> */}
                                    </View>
                                    {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ backgroundColor: '#7569FF', paddingLeft: 10, paddingRight: 10, padding: 5, color: 'white', borderRadius: 5, marginRight: 10 }}>+</Text>
                                <View>
                                    <Text style={{ color: '#150E68', fontFamily: 'Poppins_600SemiBold' }}>$1.284</Text>
                                    <Text style={{ color: '#A6A6A6', fontFamily: 'Poppins_600SemiBold' }}>Total Income</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ backgroundColor: '#FF5454', paddingLeft: 10, paddingRight: 10, padding: 5, color: 'white', borderRadius: 5, marginRight: 10 }}>-</Text>
                                <View>
                                    <Text style={{ color: '#150E68', fontFamily: 'Poppins_600SemiBold' }}>$1.284</Text>
                                    <Text style={{ color: '#A6A6A6', fontFamily: 'Poppins_600SemiBold' }}>Total Spent</Text>
                                </View>
                            </View>
                        </View> */}
                                    <ScrollView showsVerticalScrollIndicator={false}>

                                        {/* <View style={{ marginTop: 10, alignItems: 'center' }}>
                                                {
                                                    requestData !== undefined && (
                                                        <LineChart
                                                            data={{
                                                                labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                                                                datasets: [
                                                                    {
                                                                        data: donorTotal ? donorTotal : [0]
                                                                    }
                                                                ]
                                                            
                                                            width={windowWidth - 20}
                                                            height={256}
                                                            chartConfig={{
                                                                backgroundColor: "#FFFFFF",
                                                                backgroundGradientFrom: "#FFFFFF",
                                                                backgroundGradientTo: "#FFFFFF",
                                                                decimalPlaces: 2, // optional, defaults to 2dp
                                                                color: (opacity = 1) => `#6100FFA8`,
                                                                labelColor: (opacity = 1) => `#000000`,
                                                                style: {
                                                                    borderRadius: 16
                                                                }

                                                            }}
                                                            bezier
                                                        />
                                                    )
                                                }

                                            </View> */}

                                        <View style={{ marginTop: 10, margin: 20 }}>
                                            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>Donation History</Text>
                                        </View>
                                        {
                                            requestData && requestData.map(val => {
                                                return (
                                                    <View style={{ display: 'flex', flexDirection: 'row', margin: 20, marginTop: 10, marginBottom: 10, justifyContent:'space-between'}}>
                                                        <View style={{ backgroundColor: 'white' }}>
                                                            <Image source={require('../../../assets/history.png')} />
                                                        </View>
                                                        <View style={{alignItems:'flex-start', width:200}}>
                                                            <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#252525', fontSize: 16, marginLeft:20 }}>{val?.title.slice(0,18)}</Text>
                                                            <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#999999', marginLeft:20 }}>29 April 2022</Text>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width:65 }}>
                                                            {/* <Text style={{ backgroundColor: '#FF5454', paddingLeft: 10, paddingRight: 10, padding: 5, color: 'white', borderRadius: 5, marginRight: 10 }}>-</Text> */}
                                                            <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'green', fontSize: 16 }}>${val?.totalPrice ? val?.totalPrice : 'NA'}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }

                                    </ScrollView>
                                </>
                            )
                        }

                    </View>

                )
            }
            {/* </BorderBackground> */}
        </SafeAreaView>
    )

}

export default Dashboard