import { useState } from "react";
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
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton } from "react-native-paper";
import BorderBackground from "../../Components/BorderBackground";

const inputs = [1, 2, 3, 4, 5, 6, 7, 8];

const RecipientAssesment = (props) => {
  const {
    firstName,
    lastName,
    email,
    address,
    landmark,
    zipCode,
    city,
    state,
  } = props.route.params;
  const [household, setHousehold] = useState();
  const [recipientChoice, setRecipientChoice] = useState();
  const [selectedChoice, setSelectedChoice] = useState();
  const [priceCategory, setPriceCategory] = useState([
    {
      id: 1,
      title: "More than 14,000",
      selected: false,
    },
    {
      id: 2,
      title: "More than 19,000",
      selected: false,
    },
    {
      id: 3,
      title: "More than 24,000",
      selected: false,
    },
    {
      id: 4,
      title: "More than 28,000",
      selected: false,
    },
    {
      id: 5,
      title: "More than 33,000",
      selected: false,
    },
    {
      id: 6,
      title: "More than 38,000",
      selected: false,
    },
    {
      id: 7,
      title: "More than 42,000",
      selected: false,
    },
    {
      id: 8,
      title: "More than 47,000",
      selected: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Dallas", value: "Dallas" },
    { label: "Texas", value: "Texas" },
  ]);
  const [showDrop, setShowDrop] = useState(false);
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
        <Header
          showLeft={true}
          title="Security Measures"
          navigation={props.navigation}
        />
        {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}> */}
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
          }}
          onPress={() => setShowDrop(true)}
        >
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 8,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            How many people do you support in your household?
          </Text>
          <TextInput
            label=""
            value={household}
            // left={<TextInput.Affix text={'+'} />}
            keyboardType="numeric"
            onChangeText={(household) => setHousehold(household)}
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
          {showDrop && (
            <View style={{ flex: 1 }}>
              {inputs.map((i) => (
                <View style={{ marginBottom: 10, backgroundColor: "#ffffff" }}>
                  <Text style={{ color: "#000000", fontSize: 16 }}>{i}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 8,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Are you currently employed?
          </Text>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton.Android
                color="black"
                value="Yes"
                status={recipientChoice === "Yes" ? "checked" : "unchecked"}
                onPress={() => setRecipientChoice("Yes")}
              />
              <Text style={{ fontSize: 16, color: "#999999" }}>Yes</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton.Android
                color="black"
                value="No"
                status={recipientChoice === "No" ? "checked" : "unchecked"}
                onPress={() => setRecipientChoice("No")}
              />
              <Text style={{ fontSize: 16, color: "#999999" }}>No</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 8,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Price Category
          </Text>
          {priceCategory.map((val) => (
            <View
              key={val.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton.Android
                color="black"
                status={val.selected ? "checked" : "unchecked"}
                onPress={() => {
                  const newArr = [...priceCategory];
                  newArr.map((v) => {
                    if (v.id == val.id) {
                      v.selected = !v.selected;
                    } else {
                      v.selected = false;
                    }
                  });
                  setPriceCategory(newArr);
                }}
              />
              <Text style={{ fontSize: 16, color: "#999999" }}>
                {val.title}
              </Text>
            </View>
          ))}
        </View>
        <Button
          title={"Next"}
          colors={"blueGradient"}
          onHandlePress={() => {
            props.navigation.navigate("RecipientSecurity", {
              firstName: firstName,
              lastName: lastName,
              email: email,
              address: address,
              landmark: landmark,
              zipCode: zipCode,
              city: city,
              state: state,
              household: household,
              recipientChoice: recipientChoice,
              priceCategory: priceCategory,
            });
          }}
        />
        {/* </BorderBackground> */}
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipientAssesment;
