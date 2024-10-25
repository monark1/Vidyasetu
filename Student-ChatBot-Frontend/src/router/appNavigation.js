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
      initialRouteName="CollegeForm"
      >
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Chat"
          options={{ headerShown: false }}
          component={ChatScreen}
        />
        <Stack.Screen
          name="Form"
          options={{ headerShown: false }}
          component={FormScreen}
        />
        <Stack.Screen
          name="Panal"
          options={{ headerShown: false }}
          component={PanalScreen}
        />
        <Stack.Screen name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="CollegeLogin"
          options={{ headerShown: false }}
          component={CollegeLogin}
        />
        <Stack.Screen
          name="AdminLogin"
          options={{ headerShown: false }}
          component={AdminLogin}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="AdminSignUp"
          options={{ headerShown: false }}
          component={AdminSignUp}
        />
        <Stack.Screen
          name="CollegeSignUp"
          options={{ headerShown: false }}
          component={CollegeSignUp}
        />
        <Stack.Screen
          name="ForgetPassword"
          options={{ headerShown: false }}
          component={ForgetPassword}
        />
        <Stack.Screen
          name="OtpPassword"
          options={{ headerShown: false }}
          component={OtpPassword}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{ headerShown: false }}
          component={ChangePassword}
        />
        <Stack.Screen
          name="CollegeForm"
          options={{ headerShown: false }}
          component={CollegeForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
