import { View, Text, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import { addEventListener } from '@react-native-community/netinfo'
import AppNavigation from './src/router/appNavigation'
import ToartMessage from './src/components/ToartMessage'

const App = () => {
  const [isConnected, setIsConnected] = useState('')
  const [toast, setToast] = useState(true)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDes, setToastDes] = useState('')
  const [toastType, setToastType] = useState('')
  const handleToast = (title, des, type) => {
    setToastTitle(title)
    setToastDes(des)
    setToastType(type)
  }
  const handleNet = () => {
    if (isConnected == 'false') {
      handleToast("No Internet Connection", "Please check your internet connection", "warning")
      setToast(true)
    } 
    if(isConnected == 'true') {
      handleToast("Internet Connected", "You are connected to internet", "Ok")
      setToast(true)
    }
  }

  const handleOnPress = () => {
    setToast(false);
  }
  const handleNetInfo = () => {
    let a = 0
    let b = false
    addEventListener((state) => {
      // console.log("Connection", a++ );
      // console.log("Connection", state);
      // console.log("Connection", state.isConnected);
      b = state.isConnected
    })
    if(b){
      setIsConnected('true')
    } else {
      setIsConnected('false')
    }
  }
  useEffect(() => {
    handleNetInfo()
    handleNet()
    setTimeout(() => {
      setToast(false)
    },2000)
  }, [0])
  return (
    <>
      <AppNavigation />
      {toast && <ToartMessage title={toastTitle} des={toastDes} type={toastType} onPress={handleOnPress} />}
    </>
  )
}

export default App