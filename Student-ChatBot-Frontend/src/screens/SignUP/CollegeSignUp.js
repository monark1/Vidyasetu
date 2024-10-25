import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const CollegeSignUp = () => {
    const [name, setName] = useState("");
    const [nameVerify, setNameVerify] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();

    const handleName = (e) => {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        setNameVerify(false);
        if (nameVar.length > 1) {
            setNameVerify(true);
        }
    };

    const handlePhone = (e) => {
        const phoneVar = e.nativeEvent.text;
        setPhone(phoneVar);
        setPhoneVerify(false);
        if (/^\d{10}$/.test(phoneVar)) {
            setPhone(phoneVar);
            setPhoneVerify(true);
        }
    };

    const handleEmail = (e) => {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);
        if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
            setEmail(emailVar);
            setEmailVerify(true);
        }
    };

    const handlePassword = (e) => {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);
        if (
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passwordVar)
        ) {
            setPassword(passwordVar);
            setPasswordVerify(true);
        }
    };

    const handleLogin = () => {
        navigation.navigate("CollegeLogin");
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        const userData = {
            name: name,
            phone,
            email,
            password,
        };
        if (nameVerify && phoneVerify && emailVerify && passwordVerify) {
            axios
                .post(
                    "https://student-chatbot-a8hx.onrender.com/register",
                    userData
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === "Ok") {
                        Alert.alert("Success", "Register Success", [
                            { text: "OK", onPress: () => handleLogin() },
                        ]);
                        navigation.navigate("Login");
                    } else {
                        Alert.alert("Error", JSON.stringify(res.data), [
                            { text: "OK", onPress: () => console.log("OK Pressed") },
                        ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            Alert.alert("Error", "Please fill the form correctly", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
                    onPress={handleGoBack}
                >
                    <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
                </TouchableOpacity>
                <View className="my-5">
                    <Text className="text-3xl font-semibold text-primary">Let's Get</Text>
                    <Text className="text-3xl font-semibold text-primary">Started</Text>
                    <LottieView
                        source={require("../../assets/lottie/13.json")}
                        className="absolute"
                        style={{
                            width: width * 0.5,
                            height: width * 1.1,
                            top: height / 2 - width * 1.5,
                            right: height / 2 - width * 1.05,
                        }}
                        autoPlay
                        loop
                    />
                </View>
                {/* form */}
                <View className="mt-5">
                    {/* Name form */}
                    <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
                        <AntDesign name="user" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter Your username"
                            onChange={(e) => handleName(e)} //name validation
                        />
                        {name.length < 1 ? null : nameVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </View>
                    {name.length < 1 ? null : nameVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Name should be more then 1 character
                        </Text>
                    )}
                    {/* Phone form */}
                    <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
                        <Ionicons name="call-outline" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your phone number"
                            onChange={(e) => handlePhone(e)} //email validation
                        />
                        {phone.length < 1 ? null : phoneVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </View>
                    {phone.length < 1 ? null : phoneVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Enter Proper Phone Number
                        </Text>
                    )}
                    {/* Email form */}
                    <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
                        <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            onChange={(e) => handleEmail(e)} //email validation
                        />
                        {email.length < 1 ? null : emailVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                    </View>
                    {email.length < 1 ? null : emailVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Enter Proper Email Address
                        </Text>
                    )}
                    {/* Password form */}
                    <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
                        <SimpleLineIcons name="lock" size={24} color="#AEB5BB" />
                        <TextInput
                            className="flex-1 text-secondary px-2.5 font-light"
                            placeholder="Enter your password"
                            secureTextEntry={secureTextEntry}
                            onChange={(e) => handlePassword(e)} //password validation
                        />
                        {password.length < 1 ? null : passwordVerify ? (
                            <Ionicons name="checkmark-done" size={24} color="#AEB5BB" />
                        ) : (
                            <Ionicons name="close" size={24} color="#AEB5BB" />
                        )}
                        <TouchableOpacity
                            onPress={() => setSecureTextEntry((prev) => !prev)}
                        >
                            <SimpleLineIcons name="eye" size={24} color="#AEB5BB" />
                        </TouchableOpacity>
                    </View>
                    {password.length < 1 ? null : passwordVerify ? null : (
                        <Text className="text-red-500 text-sm font-light">
                            Uppercase, Lowercase, Number and 8 character long
                        </Text>
                    )}
                    <TouchableOpacity
                        className="bg-primary rounded-full mt-5"
                        onPress={handleSubmit}
                    >
                        <Text className="text-white text-2xl font-semibold text-center p-2.5">
                            Register
                        </Text>
                    </TouchableOpacity>
                    {/* <Text className="text-center my-5 text-lg text-primary">
              or continue with
            </Text> */}
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
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text className="text-primary font-bold">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CollegeSignUp