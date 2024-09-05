import { View, Text , TouchableOpacity , Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { removeItem } from '../utils/asyncStorage'
import {useState , useEffect} from 'react'
import axios from 'axios'

const HomeScreen = () => {
  const [userData, setUserData] = useState('')
  const navigation = useNavigation()
  const handleGoBack = async () => {
    // navigator.goBack();
    // navigation.navigate("Onboarding")
    await removeItem("onboarding");
  }

  const getItems = async () => {
    const token = await getItems("token");
    console.log(token);
    axios
      .post("http://192.168.31.130:5001/userdata", { token:token })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.data);
      })
  }

  return (
    <SafeAreaView className='flex-1 bg-white p-5'>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-2xl font-bold'>Home Screen</Text>
        <Text className='text-xl'>Welcome to Home Screen</Text>
        <Text className='text-xs'>Name:{userData.name}</Text>
        <Text className='text-xs'>Email:{userData.email}</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen