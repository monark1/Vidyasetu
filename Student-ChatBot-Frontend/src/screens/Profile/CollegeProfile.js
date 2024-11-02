import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
const CollegeProfile = () => {
    const [userData, setUserData] = useState("");

    const navigation = useNavigation();

    const getUserData = async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        axios
            .post(
                "https://student-chatbot-a8hx.onrender.com/collegeuserdata" ||
                "http://192.168.31.130:5001/collegeuserdata", {
                token: token,
            })
            .then((res) => {
                // console.log(res.data); //for testing
                setUserData(res.data.data);
            });
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("stayLogin");
        navigation.navigate("Onboarding");
    }

    const handleDone = () => {
        navigation.navigate("CollegeForm");
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        // console.log("Profile Screen");
        getUserData();
    }, []);

    return (
        <SafeAreaView className="flex-1 p-2 bg-white">
            <View className="flex-row justify-between">
                <TouchableOpacity className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center ml-3 " onPress={handleGoBack}>
                    <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
                </TouchableOpacity>
                <Text className="text-3xl font-semibold text-primary text-center">
                    Profile
                </Text>
                <TouchableOpacity className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center mr-3">
                    <FontAwesome5 name="user-edit" size={24} color="#45484A" />
                </TouchableOpacity>
            </View>
            <View className="items-center mt-8">
                <Image
                    source={require("../../assets/image/profile.png")}
                    className="h-40 w-40 rounded-full"
                />
                <Text className="text-xl font-semibold mt-2">{userData.name}</Text>
            </View>
            <View className=" gap-y-5 mt-5">
                <View className="border border-secondary rounded-2xl px-5 py-3 flex-row items-center">
                    <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
                    <Text className="flex-1 text-primary font-semibold px-2.5">
                        Name : {userData.name}
                    </Text>
                </View>
                <View className="border border-secondary rounded-2xl px-5 py-3 flex-row items-center">
                    <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
                    <Text className="flex-1 text-primary font-semibold px-2.5">
                        Email : {userData.email}
                    </Text>
                </View>
                <View className="border border-secondary rounded-2xl px-5 py-3 flex-row items-center">
                    <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
                    <Text className="flex-1 text-primary font-semibold px-2.5">
                        Phone No : {userData.phone}
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity className="bg-primary rounded-2xl py-3 mt-5"
                    onPress={handleLogout}
                >
                    <Text className="text-white text-center font-bold">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default CollegeProfile