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
import { Calendar } from 'react-native-calendars';

const DonorCalendar = (props) => {

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
        <AuthView navigation={props.navigation} title={'June 2022'}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 60, margin: 10 }}>
                    <Calendar
                        markedDates={{
                            '2022-06-26': { selected: true, marked: true, selectedColor: 'blue' },
                            '2022-06-27': { marked: true },
                            '2022-06-28': { marked: true, dotColor: 'red', activeOpacity: 0 },
                            '2022-06-29': { disabled: true, disableTouchEvent: true }
                        }}
                    />
                </View>
                <View style={{ marginTop: 10, margin: 20 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>Charity List</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 20, marginLeft: 20, marginRight: 20, borderRadius: 10 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>DONATE TOYS</Text>
                        <Text style={{ fontFamily: 'Poppins_500Medium', color: '#A6A6A6', fontSize: 12 }}>Don’t forget to donate toys for tots on Christmas Eve.</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name='clockcircle' size={16} />
                            <Text style={{ marginLeft: 8, color: '#150E68', fontFamily: 'Poppins_500Medium', fontSize: 12 }}>08:00 AM</Text>

                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name='calendar' size={16} />
                            <Text style={{ marginLeft: 8, color: '#150E68', fontFamily: 'Poppins_500Medium', fontSize: 12 }}>12/12/2022</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginBottom: 30, marginTop: 20 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Next</Text>
                </TouchableOpacity>
            </View>
        </AuthView>
    )
}


export default DonorCalendar