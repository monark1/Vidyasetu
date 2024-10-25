import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, Alert, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getItem, setItem } from '../../utils/asyncStorage'

const { width, height } = Dimensions.get('window')

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [acType, setAcType] = useState("");
  const [isLogin, setIsLogin] = useState("password");
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }
  const handleSignUp = () => {
    if (acType === "college") {
      navigation.navigate("CollegeSignUp");
    } else if (acType === "admin") {
      navigation.navigate("AdminSignUp");
    } else {
      navigation.navigate("SignUp");
    }
  }
  const handleSubmit = async () => {
    const userData = {
      email: email,
    }
    console.log(email);
    axios
      .post("https://student-chatbot-a8hx.onrender.com/forget", userData)
      // .post("http://192.168.225.123:5001/forget", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Ok") {
          Alert.alert("Email Sent", "Please check your email for the OTP");
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("isLogin", isLogin);
          setItem("email", email);
          navigation.navigate("OtpPassword");
        } else {
          Alert.alert("Email Not Sent", JSON.stringify(res.data));
        }
      })
  }
  useEffect(() => {
    AsyncStorage.getItem("acType").then((value) => {
      setAcType(value);
    })
  })
  return (
    <SafeAreaView className='flex-1 bg-white p-5'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
        </TouchableOpacity>
        <View className="my-5">
          <Text className="text-3xl font-semibold text-primary">Forget</Text>
          <Text className="text-3xl font-semibold text-primary">Password ?</Text>
          <LottieView
            source={require("../../assets/lottie/Password.json")}
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
        <View className="mt-[20%]">
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
          {/* Submit Button */}
          <TouchableOpacity
            className="bg-primary rounded-full mt-5"
            onPress={() => handleSubmit()}
          >
            <Text className="text-white text-2xl font-semibold text-center p-2.5">
              Submit
            </Text>
          </TouchableOpacity>
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
    </SafeAreaView>
  )
}

export default ForgetPassword