import { StatusBar } from 'expo-status-bar';
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
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../actions/user';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';



const AddToCart = (props) => {
    const dispatch = useDispatch()
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const [productData, setProductData] = useState()
    const [loader, setLoader] = useState(false)
    let category = useSelector(state => state.user.selectedCategory);
    let store = useSelector(state => state.user.selectedStore);
    let cart = useSelector(state => state.user.cart);






    const getProductsData = async (store_id, category_id) => {
        // console.log(store_id, category_id)
        setLoader(true)
        await api({
            method: 'GET',
            url: `/walmart/products/${category.searchName}`,
        }).then((res) => {
            // console.log(res.data.product)
            setProductData(res.data.items)
            setLoader(false)
        }).catch(err => {
            console.log(err)
            setLoader(false)
        })
    }

    useEffect(() => {
        getProductsData()
    }, [])

    const addToCart = (product) => {
        console.log(product, 'PRODUCT')
        var checkProductExist = cart.filter(x => x.itemId == product.itemId)
        console.log(checkProductExist, 'PRODUCT')
        // console.log(checkProductExist.length,'CART abc     ')
        if (checkProductExist.length > 0) {
            const data = {
                id: product.itemId
            }
            dispatch(increaseItemQuantity(data))
        } else {
            product.quantity = 1;
            dispatch(addItemToCart(product))
        }
    }


    const getItemQuantity = (item, id) => {
        var renderObject = null
        var product = cart.find(x => x.itemId == id)
        if (product) {
            // console.log(product.quantity)
            renderObject = (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text onPress={() => decreaseQuantity(item)} style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, backgroundColor: '#E3E3E3', padding: 8, marginLeft: -45 }}>-</Text>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, marginRight: 10, alignItems: 'center', color: 'black' }}>{product.quantity}</Text>
                    <Text onPress={() => addToCart(item)} style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, backgroundColor: '#E3E3E3', padding: 8 }}>+</Text>
                </View>
            )
        } else {
            renderObject = (
                <Text onPress={() => addToCart(item)} style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, backgroundColor: '#E3E3E3', padding: 8 }}>+</Text>
            )
        }
        return renderObject
    }


    const decreaseQuantity = (product) => {
        var checkProductExist = cart.find(x => x.itemId == product.itemId)
        console.log(checkProductExist.length, 'CART abc     ')
        if (checkProductExist.quantity > 1) {
            const data = {
                id: product.itemId
            }
            dispatch(decreaseItemQuantity(data))
        } else {
            dispatch(removeItemFromCart(product))
        }

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

    if (loader) {
        return (
            <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'black'} size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <BorderBackground> */}
            <Header showLeft={true} title='Wallmart' navigation={props.navigation} />
            <View style={{ marginTop: 40, marginLeft: 20, marginBottom: 100 }}>
                <FlatList
                    data={productData}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: 'white', padding: 10, width: 150, borderRadius: 10, borderWidth: 0.5, borderColor: '#A6A6A6', margin: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image style={{ width: 100, height: 100 }} source={{ uri: item.thumbnailImage }} />
                            </View>
                            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>{item.name}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#A6A6A6' }}>{item.shortDescription.slice(0, 70)}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10 }}>
                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#150E68' }}>${item.salePrice ? item.salePrice : item.msrp}</Text>
                                <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', position: 'absolute', right: -10, bottom: -10, justifyContent: 'center' }}>
                                    {/* <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>{getItemQuantity(item._id)}</Text> */}
                                    {getItemQuantity(item, item.itemId)}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            {/* <View style={{ position: 'absolute', bottom: 0, marginBottom: 30, marginTop: 20, width: '100%' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('GeneralRecipient')} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Add to cart</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ position: 'absolute', bottom: 0, marginBottom: 30, marginTop: 20, width: '100%' }}>
                <Button title={'Add To Cart'} onHandlePress={() => {
                    props.navigation.navigate('GeneralRecipient')
                }} />
            </View>
            {/* </BorderBackground> */}

        </SafeAreaView>
    )
}

export default AddToCart