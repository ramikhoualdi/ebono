import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../Welcome/index";
import SelectUser from "../SelectUser";
import DonorInformation from "../DonorInformation";
import Login from "../Login";
import DonorLocation from "../DonorLocation";
import DonorPrice from "../DonorPrice";
import GeneralRecipient from "../GeneralRecipient";
import RecipientView from "../RecipientView";
import PaymentMethod from "../PaymentMethod";
import DeliveryView from "../DeliveryView";
import DeliveryDetails from "../DeliveryDetails";
import CustomCarousel from "../../Components/Carousel";
import MerchantList from "../MerchantList";
import ProductCategory from "../ProductCategory";
import { useSelector } from "react-redux";
import AddToCart from "../AddToCart";
import CartItem from "../CartItem";
import Achievement from "../Achievement";
import DontForget from "../DontForget";
import DonorCalendar from "../DonorCalendar";
import TaxInformation from "../TaxInformation";
import Dashboard from "../Dashboard";
import PhoneLogin from "../PhoneLogin";
import UserOTP from "../UserOTP";
import RecipientDashboard from "../RecipientDashboard";
import AntDesign from "@expo/vector-icons/AntDesign";
import DonorRequest from "../DonorRequest";
import Request from "../Request";
import TargetGiving from "../TargetGiving";
import SafeSecure from "../SafeSecure";
import DonorForm from "../DonorForm";
import RecipientForm from "../RecipientForm";
import RecipientAssesment from "../RecipientAssesment";
import RecipientSecurity from "../RecipientSecurity";
import RecipientProfile from "../RecipeintProfile";
import RecipientThankyou from "../RecipientThankyou";
import Header from "../../Components/Header";
import Doordash from "../Doordash";
import Acknowledgement from "../Acknowledgement";
import Notification from "../Notification";
import CharityOrgForm from "../CharityOrgForm";
import Register from "../Register";
import CharityAmount from "../CharityAmount";
import ForgotPassword from "../ForgotPassword";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  let selectedUser = useSelector((state) => state.auth.selectedUser);
  let userToken = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Tab.Navigator>
      {selectedUser === "Donor" ? (
        <>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={DonorRequest}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="star" color={color} size={size} />
              ),
            }}
          />
          {/* <Tab.Screen name="Profile" component={DonorCalendar} options={{
                            headerShown: false, tabBarIcon: ({ color, size }) => (
                                <AntDesign name="user" color={color} size={size} />
                            ),
                        }} /> */}
        </>
      ) : selectedUser === "Recipient" ? (
        <>
          <Tab.Screen
            name="Recipient"
            component={RecipientDashboard}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={RecipientProfile}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ProductCategory}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="book" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="bells" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Recipient"
            component={RecipientDashboard}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={RecipientProfile}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ProductCategory}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="book" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="bells" color={color} size={size} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const DonorStack = () => {
  return (
    <>
      <Stack.Screen
        name="DonorInformation"
        component={DonorInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonorLocation"
        component={DonorLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonorPrice"
        component={DonorPrice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MerchantList"
        component={MerchantList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductCategory"
        component={ProductCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralRecipient"
        component={GeneralRecipient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipientView"
        component={RecipientView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryView"
        component={DeliveryView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{ headerShown: false }}
      />
    </>
  );
};

const RecipientStack = () => {
  return (
    <>
      <Stack.Screen
        name="DonorInformation"
        component={DonorInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonorLocation"
        component={DonorLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonorPrice"
        component={DonorPrice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MerchantList"
        component={MerchantList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductCategory"
        component={ProductCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralRecipient"
        component={GeneralRecipient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipientView"
        component={RecipientView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryView"
        component={DeliveryView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddToCart"
        component={AddToCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartItem"
        component={CartItem}
        options={{ headerShown: false }}
      />
    </>
  );
};

const GeneralStack = () => {
  return (
    <>
      <Stack.Screen
        name="DonorInformation"
        component={DonorInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonorLocation"
        component={DonorLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DonorPrice"
        component={DonorPrice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MerchantList"
        component={MerchantList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductCategory"
        component={ProductCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralRecipient"
        component={GeneralRecipient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipientView"
        component={RecipientView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryView"
        component={DeliveryView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddToCart"
        component={AddToCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartItem"
        component={CartItem}
        options={{ headerShown: false }}
      />
    </>
  );
};
// origina
const Routes = () => {
  let selectedUser = useSelector((state) => state.auth.selectedUser);
  let userToken = useSelector((state) => state.auth.isAuthenticated);
  console.log(selectedUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userToken && (
          <>
            <Stack.Screen
              name="SelectUser"
              component={SelectUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
          </>
        )}

        {selectedUser === "Donor" ? (
          <>
            {userToken ? (
              <>
                <Stack.Screen
                  name="DonorForm"
                  component={DonorForm}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeTabs"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorLocation"
                  component={DonorLocation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorPrice"
                  component={DonorPrice}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MerchantList"
                  component={MerchantList}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Doordash"
                  component={Doordash}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Acknowledgement"
                  component={Acknowledgement}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ProductCategory"
                  component={ProductCategory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GeneralRecipient"
                  component={GeneralRecipient}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientView"
                  component={RecipientView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PaymentMethod"
                  component={PaymentMethod}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeliveryView"
                  component={DeliveryView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeliveryDetails"
                  component={DeliveryDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Achievement"
                  component={Achievement}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DontForget"
                  component={DontForget}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CharityAmount"
                  component={CharityAmount}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorCalendar"
                  component={DonorCalendar}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TaxInformation"
                  component={TaxInformation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CartItem"
                  component={CartItem}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Request"
                  component={Request}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="DonorInformation"
                  component={DonorInformation}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
                <Stack.Screen
                  name="TargetGiving"
                  component={CustomCarousel}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneLogin"
                  component={PhoneLogin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserOTP"
                  component={UserOTP}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </>
        ) : selectedUser === "Recipient" ? (
          <>
            {userToken ? (
              <>
                <Stack.Screen
                  name="RecipientForm"
                  component={RecipientForm}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientAssesment"
                  component={RecipientAssesment}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientSecurity"
                  component={RecipientSecurity}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeTabs"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorLocation"
                  component={DonorLocation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientThankyou"
                  component={RecipientThankyou}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="DonorPrice" component={DonorPrice} options={{ headerShown: false }} /> */}
                <Stack.Screen
                  name="MerchantList"
                  component={MerchantList}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ProductCategory"
                  component={ProductCategory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GeneralRecipient"
                  component={GeneralRecipient}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientView"
                  component={RecipientView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PaymentMethod"
                  component={PaymentMethod}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeliveryView"
                  component={DeliveryView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeliveryDetails"
                  component={DeliveryDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddToCart"
                  component={AddToCart}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CartItem"
                  component={CartItem}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Achievement"
                  component={Achievement}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DontForget"
                  component={DontForget}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorCalendar"
                  component={DonorCalendar}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TaxInformation"
                  component={TaxInformation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="DonorInformation"
                  component={DonorInformation}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                 */}
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
                <Stack.Screen
                  name="TargetGiving"
                  component={CustomCarousel}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneLogin"
                  component={PhoneLogin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserOTP"
                  component={UserOTP}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </>
        ) : (
          <>
            {userToken ? (
              <>
                <Stack.Screen
                  name="CharityOrgForm"
                  component={CharityOrgForm}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeTabs"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorLocation"
                  component={DonorLocation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientThankyou"
                  component={RecipientThankyou}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="DonorPrice" component={DonorPrice} options={{ headerShown: false }} /> */}
                <Stack.Screen
                  name="MerchantList"
                  component={MerchantList}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ProductCategory"
                  component={ProductCategory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GeneralRecipient"
                  component={GeneralRecipient}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipientView"
                  component={RecipientView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PaymentMethod"
                  component={PaymentMethod}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeliveryView"
                  component={DeliveryView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeliveryDetails"
                  component={DeliveryDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddToCart"
                  component={AddToCart}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CartItem"
                  component={CartItem}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Achievement"
                  component={Achievement}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DontForget"
                  component={DontForget}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DonorCalendar"
                  component={DonorCalendar}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TaxInformation"
                  component={TaxInformation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="DonorInformation"
                  component={DonorInformation}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                 */}
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
                <Stack.Screen
                  name="TargetGiving"
                  component={CustomCarousel}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneLogin"
                  component={PhoneLogin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserOTP"
                  component={UserOTP}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

{
  /* <Stack.Screen name="DonorInformation" component={DonorInformation} options={{ headerShown: false }} />
<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
<Stack.Screen name="DonorLocation" component={DonorLocation} options={{ headerShown: false }} />
<Stack.Screen name="DonorPrice" component={DonorPrice} options={{ headerShown: false }} />
<Stack.Screen name="MerchantList" component={MerchantList} options={{ headerShown: false }} />
<Stack.Screen name="ProductCategory" component={ProductCategory} options={{ headerShown: false }} />
<Stack.Screen name="GeneralRecipient" component={GeneralRecipient} options={{ headerShown: false }} />
<Stack.Screen name="RecipientView" component={RecipientView} options={{ headerShown: false }} />
<Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
<Stack.Screen name="DeliveryView" component={DeliveryView} options={{ headerShown: false }} />
<Stack.Screen name="DeliveryDetails" component={DeliveryDetails} options={{ headerShown: false }} />
 */
}

export default Routes;
