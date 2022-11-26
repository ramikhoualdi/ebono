import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../actions/auth';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import BorderBackground from '../../Components/BorderBackground';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';





const DonorForm = (props) => {
    const [token, setToken] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [state, setState] = useState()
    const [donorChoice, setDonorChoice] = useState()
    const [selectedChoice, setSelectedChoice] = useState()
    const [loading, setLoading] = useState(false)
    const [priceCategory, setPriceCategory] = useState([{
        id: 1,
        title: '($1-$10) - Once every 2 weeks',
        selected: false
    },
    {
        id: 2,
        title: '($10-$20) - Once every month',
        selected: false
    },
    {
        id: 3,
        title: '($20-$30) - Once every 6 weeks',
        selected: false
    },
    {
        id: 4,
        title: '($30-$40) - Once every 8 weeks',
        selected: false
    },
    {
        id: 5,
        title: '($40-$50) - Once every 3 months',
        selected: false
    },
    {
        id: 6,
        title: '($50-$75) - Once every 6 months',
        selected: false
    },
    ])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Dallas', value: 'Dallas' },
        { label: 'Texas', value: 'Texas' }
    ]);

    const getUserToken = async () => {
        var userToken = await AsyncStorage.getItem('token')
        setToken(userToken)
    }

    const checkDonorForm = async () => {
        var userToken = await AsyncStorage.getItem('token')
        await api({
            method: 'GET',
            url: '/user/check-donor',
            headers: {
                'x-auth-token': userToken
            }
        }).then((res) => {
            console.log(res.data?.checkForm?.length)
            if (res.data?.checkForm?.length > 0) {
                props.navigation.navigate('HomeTabs')
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLastName(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        getUserToken()
        checkDonorForm()
    }, [])

    const onSubmitForm = async () => {
        var newPrice = priceCategory.filter(x => x.selected == true)
        await api({
            method: 'POST',
            url: '/user/donor-form',
            headers: {
                'x-auth-token': token
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                state: 'Dallas',
                donationType: donorChoice,
                email: email,
                priceCategory: newPrice.title
            }
        }).then((res) => {
            console.log(res.data, 'Form Submitted')
            Toast.show({
                type: 'success',
                text1: 'Donor Form',
                text2: 'Response Submitted'
            })
            props.navigation.navigate('HomeTabs')
        }).catch((err) => {
            console.log(err)
            Toast.show({
                type: 'error',
                text1: 'Donor Form',
                text2: 'Response Not Submitted'
            })
        })
    }

    if (loading) {
        return (
            <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'black'} size='large' />
            </View>
        )
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <BorderBackground> */}
                <Header showLeft={true} title='Fill in the Description' navigation={props.navigation} />
                {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}> */}
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                        <TextInput
                            mode='flat'
                            label="First Name"
                            value={firstName}
                            // left={<TextInput.Affix text={'+'} />}
                            onChangeText={firstName => setFirstName(firstName)}
                            style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1, width: 150 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                        <TextInput
                            label="Last Name"
                            value={lastName}
                            // left={<TextInput.Affix text={'+'} />}
                            onChangeText={lastName => setLastName(lastName)}
                            style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1, width: 150, marginLeft: 30 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                        <TextInput
                            label="Email"
                            value={email}
                            // left={<TextInput.Affix text={'+'} />}
                            onChangeText={email => setEmail(email)}
                            style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: open ? 90 : 10 }}>
                        <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>State you'd like to donate in</Text>
                        <DropDownPicker
                            style={{ borderRadius: 20, borderColor: '#999999' }}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder='Select a State'
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                        <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Choose who you like to donate to</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton.Android
                                    color='black'
                                    value="Recipient"
                                    status={donorChoice === 'Recipient' ? 'checked' : 'unchecked'}
                                    onPress={() => setDonorChoice('Recipient')}
                                />
                                <Text style={{ fontSize: 16, color: '#999999' }}>Recipient</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton.Android
                                    color='black'
                                    value="Charity"
                                    status={donorChoice === 'Charity' ? 'checked' : 'unchecked'}
                                    onPress={() => setDonorChoice('Charity')}
                                />
                                <Text style={{ fontSize: 16, color: '#999999' }}>Charity Organization</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 40 }}>
                        <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Price Category</Text>
                        {
                            priceCategory.map(val => (
                                <View key={val.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton.Android
                                        color='black'
                                        status={val.selected ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            const newArr = [...priceCategory]
                                            newArr.map(v => {
                                                if (v.id == val.id) {
                                                    v.selected = !v.selected
                                                } else {
                                                    v.selected = false
                                                }
                                            })
                                            setPriceCategory(newArr)
                                        }}
                                    />
                                    <Text style={{ fontSize: 16, color: '#999999' }}>{val.title}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <Button title={'Continue'} colors={'blueGradient'} onHandlePress={() => {
                        // props.navigation.navigate('HomeTabs')
                        onSubmitForm()
                    }} />
                    {/* </BorderBackground> */}
                {/* </KeyboardAvoidingView> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default DonorForm