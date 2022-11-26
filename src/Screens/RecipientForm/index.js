import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useDispatch } from "react-redux";
import { selectUser } from "../../actions/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { TextInput, useTheme } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton } from "react-native-paper";
import BorderBackground from "../../Components/BorderBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import api from "../../utils/api";

const RecipientForm = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [landmark, setLandmark] = useState();
  const [zipCode, setZipcode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [donorChoice, setDonorChoice] = useState();
  const [keyBoardView, setKeyBoardView] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState();
  const [loading, setLoading] = useState(false);
  const [priceCategory, setPriceCategory] = useState([
    {
      id: 1,
      title: "($1-$10) - Once every 2 weeks",
      selected: false,
    },
    {
      id: 2,
      title: "($1-$10) - Once every 2 weeks",
      selected: false,
    },
    {
      id: 3,
      title: "($1-$10) - Once every 2 weeks",
      selected: false,
    },
    {
      id: 4,
      title: "($1-$10) - Once every 2 weeks",
      selected: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Dallas", value: "Dallas" },
    { label: "Texas", value: "Texas" },
  ]);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const checkRecipientForm = async () => {
    var userToken = await AsyncStorage.getItem("token");
    await api({
      method: "GET",
      url: "/user/check-recipient",
      headers: {
        "x-auth-token": userToken,
      },
    })
      .then((res) => {
        console.log(res.data?.checkForm?.length, "FORMMM");
        if (res.data?.checkForm?.length > 0) {
          props.navigation.navigate("HomeTabs");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLastName(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    checkRecipientForm();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={"black"} size="large" />
      </View>
    );
  }

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        borderColor: "#3CA0F0",
        borderWidth: 4,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 40,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <BorderBackground> */}
        <KeyboardAvoidingView
          behavior="position"
          enabled={keyBoardView}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Header
            showLeft={true}
            title="Fill in the Description"
            navigation={props.navigation}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              mode="flat"
              label="First Name"
              value={firstName}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(firstName) => setFirstName(firstName)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
                width: 150,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              label="Last Name"
              value={lastName}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(lastName) => setLastName(lastName)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
                width: 150,
                marginLeft: 30,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              label="Email"
              value={email}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(email) => setEmail(email)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              label="Address"
              value={address}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(address) => setAddress(address)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              label="Landmark"
              value={landmark}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(landmark) => setLandmark(landmark)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              label="Zipcode"
              value={zipCode}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(zipCode) => setZipcode(zipCode)}
              onFocus={() => {
                setKeyBoardView(true);
              }}
              onBlur={() => {
                setKeyBoardView(false);
              }}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              mode="flat"
              label="City"
              value={city}
              onFocus={() => {
                setKeyBoardView(true);
              }}
              onBlur={() => {
                setKeyBoardView(false);
              }}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(city) => setCity(city)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
                width: 150,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
            <TextInput
              label="State"
              value={state}
              onFocus={() => {
                setKeyBoardView(true);
              }}
              onBlur={() => {
                setKeyBoardView(false);
              }}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(state) => setState(state)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
                width: 150,
                marginLeft: 30,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{ marginTop: 20 }}>
          <Button
            title={"Next"}
            colors={"blueGradient"}
            onHandlePress={() => {
              props.navigation.navigate("RecipientAssesment", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                landmark: landmark,
                zipCode: zipCode,
                city: city,
                state: state,
              });
            }}
          />
        </View>
        {/* </BorderBackground> */}
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipientForm;
