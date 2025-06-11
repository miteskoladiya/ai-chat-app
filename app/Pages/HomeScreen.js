import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const [chatFaceData, setChatFaceData] = useState([]);
    const [selectedChatFaceData, setSelectedChatFaceData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        setChatFaceData(ChatFaceData);
        setSelectedChatFaceData(ChatFaceData[0]);
    }, []);

    const onChatFacePress = (id) => {
        // const chatFace = chatFaceData.find(chatFace=>chatFace.id === id);
        // setSelectedChatFaceData(chatFace);

        setSelectedChatFaceData(ChatFaceData[id - 1]);


    }

    return (
        <View style={styles.container}>
            <Text style={[{ color: selectedChatFaceData?.primary }, { fontSize: 30 }]}>
                Hello
            </Text>
            <Text style={[{ color: selectedChatFaceData?.primary }, { fontSize: 30, fontWeight: 'bold' }]}>I am {selectedChatFaceData?.name}</Text>

            <Image source={{ uri: selectedChatFaceData?.image }}
                style={{ width: 150, height: 150, marginTop: 20 }}
            />
            <Text style={{ marginTop: 30, fontSize: 25 }}>How can I help you?</Text>


            <View style={{ marginTop: 20, backgroundColor: '#F5F5F5', alignItems: 'center', height: 110, padding: 10, borderRadius: 10 }}>
                <FlatList
                    data={chatFaceData}
                    horizontal={true}
                    renderItem={({ item }) => selectedChatFaceData.id != item.id && (
                        <TouchableOpacity onPress={() => onChatFacePress(item.id)} style={{ margin: 15 }}>
                            <Image source={{ uri: item.image }}
                                style={{ width: 40, height: 40 }}
                            />
                        </TouchableOpacity>
                    )}
                />
                <Text style={{ fontSize: 17, color: '#B0B0B0', marginTop: 5 }}>
                    Choose Your Fav ChatBuddy
                </Text>

            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('chat',{selectedFace:selectedChatFaceData })} style={{ backgroundColor: selectedChatFaceData?.primary, padding: 10, width: Dimensions.get('screen').width * 0.6, borderRadius: 10, marginTop: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#fff' }}>
                    Let's Chat
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 90,
    },


});
