import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, Alert, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get("window");

const CollegeLogin = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acType, setAcType] = useState("college");
  const [isLogin, setIsLogin] = useState("login");

  const navigation = useNavigation();

  const handleGoBack = () => {
    // await removeItem("onboarding");
    navigation.goBack();
  };

  const handleSignUp = () => {
    navigation.navigate("CollegeSignUp");
  };

  const handleForgetPassword = () => {
    AsyncStorage.setItem("acType", acType);
    navigation.navigate("ForgetPassword");
  };

  const handleSubmit = () => {
    const userData = {
      email: email,
      password,
    };
    console.log(email, password);
    axios
      .post("https://student-chatbot-a8hx.onrender.com/login", userData)
      // .post("http:// 192.168.225.123:5001/login",userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Ok") {
          Alert.alert("Otp Send On Gmail");
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("login",isLogin)
          AsyncStorage.setItem("email",email);
          navigation.navigate("OtpPassword");
        } else {
          Alert.alert("Login Failed", JSON.stringify(res.data));
        }
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {waiting ? (
        <View className="justify-center items-center flex-1">
          <LottieView
            source={require("../../assets/lottie/waiting.json")}
            style={{
              width: width,
              height: width,
            }}
            autoPlay
            loop
          />
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
          </TouchableOpacity>
          <View className="my-5">
            <Text className="text-3xl font-semibold text-primary">Hey ,</Text>
            <Text className="text-3xl font-semibold text-primary">Welcome</Text>
            <Text className="text-3xl font-semibold text-primary">College</Text>
            <LottieView
              source={require("../../assets/lottie/12.json")}
              className="absolute"
              style={{
                width: width * 0.5,
                height: width * 1,
                top: height / 2 - width * 1.4,
                right: height / 2 - width * 1,
              }}
              autoPlay
              loop
            />
          </View>
          {/* form */}
          <View className="mt-5">
            {/* Email */}
            <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
              <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
              <TextInput
                className="flex-1 text-secondary px-2.5 font-light"
                placeholder="Enter your email"
                keyboardType="email-address"
                onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </View>
            {/* Password */}
            <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
              <SimpleLineIcons name="lock" size={24} color="#AEB5BB" />
              <TextInput
                className="flex-1 text-secondary px-2.5 font-light"
                placeholder="Enter your password"
                secureTextEntry={secureTextEntry}
                onChange={(e) => setPassword(e.nativeEvent.text)}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry((prev) => !prev)}
              >
                <SimpleLineIcons name="eye" size={24} color="#AEB5BB" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgetPassword}>
              <Text className="text-primary text-right font-semibold my-2.5">
                Forgot Password?
              </Text>
            </TouchableOpacity>
            {/* Login Button */}
            <TouchableOpacity
              className="bg-primary rounded-full mt-5"
              onPress={() => handleSubmit()}
            >
              <Text className="text-white text-2xl font-semibold text-center p-2.5">
                Login
              </Text>
            </TouchableOpacity>
            {/* <Text className="text-center my-5 text-lg text-primary">
              or continue with
            </Text> */}
            {/* Google Button */}
            {/* <TouchableOpacity className="justify-center items-center bg-white rounded-full flex-row border-2 border-primary">
              <Image
                source={require("../assets/image/google.png")}
                className="h-5 w-5"
              />
              <Text className="text-primary text-2xl font-semibold text-center p-2.5">
                Google
              </Text>
            </TouchableOpacity> */}
            <View className="flex-row justify-center items-center my-10 gap-x-1">
              <Text className="text-primary font-normal">
                Don't have an account?
              </Text>
              {/* Sign up Button */}
              <TouchableOpacity>
                <Text className="text-primary font-bold" onPress={handleSignUp}>
                  Sign up
                </Text>
              </TouchableOpacity>
              {/* Gaust Login */}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default CollegeLogin