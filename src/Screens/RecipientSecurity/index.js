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







const RecipientSecurity = (props) => {
    const {firstName,lastName,email,address,landmark,zipCode,city,state,household,recipientChoice,priceCategory} = props.route.params
    const [recipientSecurityChoice, setRecipientSecurityChoice] = useState()
    const [token, setToken] = useState()
    const [rentChoice, setRentChoice] = useState()
    const [supportChoice, setSupportChoice] = useState()
    const [selectedChoice, setSelectedChoice] = useState()
    const [loading, setLoading] = useState(false)
    const [priceSecurityCategory, setPriceSecurityCategory] = useState([{
        id: 1,
        title: '($1-$10) - Once every 2 weeks',
        selected: false
    },
    {
        id: 2,
        title: '($10-$25) - Once every 3 weeks',
        selected: false
    },
    {
        id: 3,
        title: '($25-$50) - Once every month',
        selected: false
    },
    {
        id: 4,
        title: '($50-$100) - Once every 2 month',
        selected: false
    },
    {
        id: 5,
        title: '($100-$150) - Once every 3 month',
        selected: false
    }])
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

    const checkRecipientForm = async() => {
        var userToken = await AsyncStorage.getItem('token')
        await api({
            method:'GET',
            url:'/user/check-recipient',
            headers: {
                'x-auth-token': userToken
            }
        }).then((res) => {
            console.log(res.data?.checkForm?.length,'FORMMM')
            if(res.data?.checkForm?.length > 0) {
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
        checkRecipientForm()
    }, [])

    const onSubmitForm = async() => {
        var newIncome = priceCategory.filter(x => x.selected == true)
        var newPrice = priceSecurityCategory.filter(x => x.selected == true)
        await api({
            method:'POST',
            url:'/user/recipient-form',
            headers: {
                'x-auth-token': token
            },
            data:{
                firstName:firstName,
                lastName:lastName,
                state:state,
                address:address,
                landmark:landmark,
                zipcode:zipCode,
                peopleToSupport:household,
                currentlyEmployed:recipientChoice,
                income:newIncome.title,
                otherWelfare:recipientSecurityChoice,
                rent:rentChoice,
                childSupport:supportChoice,
                city:city,
                email:email,
                priceCategory:newPrice.title
            }
        }).then((res) => {
            console.log(res.data,'Form Submitted')
            Toast.show({
                type:'success',
                text1:'Donor Form',
                text2:'Response Submitted'
            })
            props.navigation.navigate('HomeTabs')
        }).catch((err) => {
            console.log(err)
            Toast.show({
                type:'error',
                text1:'Donor Form',
                text2:'Response Not Submitted'
            })
        })
    }

    if(loading){
        return (
            <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={'black'} size='large'/>
            </View>
        )
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <BorderBackground> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header showLeft={true} title='Security Measures' navigation={props.navigation} />
                {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}> */}
                <View style={{ marginTop: 18, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                    <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Are you receiving welfare or participating in another government-based income supplemental program?</Text>
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton.Android
                                color='black'
                                value="Yes"
                                status={recipientSecurityChoice === 'Yes' ? 'checked' : 'unchecked'}
                                onPress={() => setRecipientSecurityChoice('Yes')}
                            />
                            <Text style={{ fontSize: 16, color: '#999999' }}>Yes</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton.Android
                                color='black'
                                value="No"
                                status={recipientSecurityChoice === 'No' ? 'checked' : 'unchecked'}
                                onPress={() => setRecipientSecurityChoice('No')}
                            />
                            <Text style={{ fontSize: 16, color: '#999999' }}>No</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                    <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Do you currently pay rent/mortgage?</Text>
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton.Android
                                color='black'
                                value="Yes"
                                status={rentChoice === 'Yes' ? 'checked' : 'unchecked'}
                                onPress={() => setRentChoice('Yes')}
                            />
                            <Text style={{ fontSize: 16, color: '#999999' }}>Yes</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton.Android
                                color='black'
                                value="No"
                                status={rentChoice === 'No' ? 'checked' : 'unchecked'}
                                onPress={() => setRentChoice('No')}
                            />
                            <Text style={{ fontSize: 16, color: '#999999' }}>No</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                    <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Do you receive or pay any child support or alimony?</Text>
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton.Android
                                color='black'
                                value="Yes"
                                status={supportChoice === 'Yes' ? 'checked' : 'unchecked'}
                                onPress={() => setSupportChoice('Yes')}
                            />
                            <Text style={{ fontSize: 16, color: '#999999' }}>Yes</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton.Android
                                color='black'
                                value="No"
                                status={supportChoice === 'No' ? 'checked' : 'unchecked'}
                                onPress={() => setSupportChoice('No')}
                            />
                            <Text style={{ fontSize: 16, color: '#999999' }}>No</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 40 }}>
                    <Text style={{ marginLeft: 8, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Price Category</Text>
                    {
                        priceSecurityCategory.map(val => (
                            <View key={val.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton.Android
                                    color='black'
                                    status={val.selected ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        const newArr = [...priceSecurityCategory]
                                        newArr.map(v => {
                                            if (v.id == val.id) {
                                                v.selected = !v.selected
                                            } else {
                                                v.selected = false
                                            }
                                        })
                                        setPriceSecurityCategory(newArr)
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: '#999999' }}>{val.title}</Text>
                            </View>
                        ))
                    }
                </View>
                <Button title={'Next'} colors={'blueGradient'} onHandlePress={() => {
                    // props.navigation.navigate('HomeTabs')
                    onSubmitForm()
                }} />
                {/* </KeyboardAvoidingView> */}
            </ScrollView>
            {/* </BorderBackground> */}

        </SafeAreaView>
    )
}

export default RecipientSecurity