import { View } from "react-native";
import { Redirect } from "expo-router";
import HomeScreenNavigation from "./Navigation/HomeScreenNavigation";

const Index=() =>{
  return (
    <View style={{flex:1}}>
      <HomeScreenNavigation />
    </View>
  );
}

export default Index;