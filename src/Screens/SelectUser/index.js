import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../actions/auth';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';
import { Checkbox } from 'react-native-paper';
import { compose } from 'redux';



const SelectUser = (props) => {
    let selectedUser = useSelector(state => state.auth.selectedUser);
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false);
    const [users, setUsers] = useState([
        {
            id: 1,
            title: 'Donor',
            selected: false,
            color: 'blueGradient',
            value: 'Donor'
        },
        {
            id: 2,
            title: 'Recipient',
            selected: false,
            color: 'orgGradient',
            value: 'Recipient'
        },
        {
            id: 3,
            title: 'Charity Organisation',
            selected: false,
            color: 'blueGradient',
            value: 'Recipient'
        }
    ])

    const changeSelectedUser = (id) => {
        const newUser = [...users]
        newUser.map(val => {
            if (val.id == id) {
                val.selected = true
            } else {
                val.selected = false
            }
        })
        setUsers(newUser)
        var select = users.filter(x => x.selected === true)
        dispatch(selectUser(select[0].title))
    }

    // const selectedType = (user) => {
    //     dispatch(selectUser(user))
    //     props.navigation.navigate('TargetGiving')

    // }

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

    console.log(selectedUser)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Image source={require('../../../assets/newLogo.png')} style={{ width: 180, height: 70, marginTop:40 }} />
                <Text style={{ fontFamily: 'Poppins_700Bold', marginTop:20 }}>Check One</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 20 }}>
                {
                    users.map(user => (
                        <TouchableOpacity key={user.id} onPress={() => changeSelectedUser(user.id)} style={user.selected ? styles.activeStyle : styles.inactiveStyle}>
                            <Text style={user.selected ? styles.activeTxt : styles.inactiveTxt}>{user.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View> */}
            {/* <BorderBackground> */}
            <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ margin: 40, alignItems: 'center' }} source={require('../../../assets/newLogo.png')} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Who are you?</Text>
                <View style={{ margin: 60, alignItems: 'center', marginBottom: 10 }}>
                    {
                        users.map(val => (
                            <Button key={val.id} title={val.title} colors={!val.selected && 'blueGradient'} onHandlePress={() => changeSelectedUser(val.id)} />
                        ))
                    }
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox.Android color='#F88435' status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
                    <Text>Agree to the Terms & Conditions</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight:80, width: windowWidth, marginTop: 40 }}>
                    <TouchableOpacity disabled={!checked || selectedUser == undefined} style={{
                        width: 60,
                        padding: 10,
                        height: 60,
                        borderRadius: 60 / 2,
                        backgroundColor: !checked || selectedUser == undefined ? 'grey' : '#3CA0F0',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={() => {
                        props.navigation.navigate('TargetGiving')
                    }}>
                        <AntDesign name='arrowright' color={'white'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
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
    activeStyle: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#150E68',
        margin: 10,
        alignItems: 'center'
    },
    inactiveStyle: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: '#150E68',
        alignItems: 'center'
    },
    activeTxt: {
        color: 'white',
        fontFamily: 'Poppins_500Medium'
    },
    inactiveTxt: {
        color: '#150E68',
        fontFamily: 'Poppins_500Medium'
    }
});

export default SelectUser