import { View, Text , TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { removeItem } from '../utils/asyncStorage'
import React from 'react'

const HomeScreen = () => {
  const navigation = useNavigation()
  const handleGoBack = async () => {
    // navigator.goBack();
    navigation.navigate("Onboarding")
    await removeItem("onboarding");
  }

  return (
    <SafeAreaView className='flex-1 bg-white p-5'>
      <TouchableOpacity
        className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen