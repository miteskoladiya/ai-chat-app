import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Pages/HomeScreen'
import ChatScreen from '../Pages/ChatScreen'

const Stack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="home">
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  )
}

export default HomeScreenNavigation;

const styles = StyleSheet.create({})