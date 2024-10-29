import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  OnboardingScreen,
  ChatScreen,
  ProfileScreen,
  FormScreen,
  PanalScreen,
  LoginScreen,
  CollegeLogin,
  AdminLogin,
  SignUpScreen,
  AdminSignUp,
  CollegeSignUp,
  ForgetPassword,
  OtpPassword,
  ChangePassword,
  AdminHome,
  CollegeForm,
  OtpVerfiy,
  CollegeManagement,
  DataVerify,
  ReportAnalytics,
} from "../screens";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [login, setLogin] = useState(true);
  const check = async () => {
    const value = await AsyncStorage.getItem("isLoginIN");
    setLogin(value);
  }
  useEffect(() => {
    check();
    // console.log(login);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        //  initialRouteName="Home" //this for testing
        // initialRouteName={login ? "Home" : "Onboarding"}
        initialRouteName="Chat"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
        />
        <Stack.Screen
          name="Panal"
          component={PanalScreen}
        />
        <Stack.Screen name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="CollegeLogin"
          component={CollegeLogin}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="AdminSignUp"
          component={AdminSignUp}
        />
        <Stack.Screen
          name="CollegeSignUp"
          component={CollegeSignUp}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Stack.Screen
          name="OtpPassword"
          component={OtpPassword}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
        />
        <Stack.Screen
          name="CollegeForm"
          component={CollegeForm}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerfiy}
        />
        <Stack.Screen
          name="CollegeManagement"
          component={CollegeManagement}
        />
        <Stack.Screen
          name="DataVerify"
          component={DataVerify}
        />
        <Stack.Screen
          name="ReportAnalytics"
          component={ReportAnalytics}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
