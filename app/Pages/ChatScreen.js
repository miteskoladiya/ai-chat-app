import { StyleSheet, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import React, { useCallback, useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'

const ChatScreen = () => {
  const param = useRoute().params;

  const [messages, setMessages] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState([]);
  const [loading,setLoading]= useState(false);

  useEffect(() => {
    //console.log(param.selectedFace);
    setSelectedChatFace(param.selectedFace);
    setMessages([
      {
        _id: 1,
        text: 'Hello ' + param.selectedFace?.name,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: param.selectedFace?.image,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)  // Use incoming messages directly
    )
    
    setLoading(true);
    if (messages[0].text) {
      getGeminiResp(messages[0].text);
    }
  }, [])


  const getGeminiResp = (msg) => {
    setLoading(true); // Show typing indicator

    GlobalApi.getGeminiApi(msg)
      .then(resp => {
        console.log("✅ Full API Response:", JSON.stringify(resp.data, null, 2)); // Log full response
        
        if (resp.data && resp.data.resp && resp.data.resp.length > 0 && resp.data.resp[1].content) {
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: resp.data.resp[1].content.trim(),
            createdAt: new Date(),
            user: {
              _id: 2, 
              name: 'React Native',
              avatar: param.selectedFace?.image,
            },
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [chatAPIResp])
          );
        } else {
          console.warn("⚠️ No valid response structure:", resp.data);
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [{
              _id: Math.random() * (9999999 - 1),
              text: "Sorry, I cannot help with that.",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native', 
                avatar: param.selectedFace?.image,
              },
            }])
          );
        }
      })
      .catch(error => {
        console.error("❌ API Error:", error.response ? error.response.data : error.message);

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [{
            _id: Math.random() * (9999999 - 1),
            text: "Oops! Something went wrong. Please try again later.",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: param.selectedFace?.image,
            },
          }])
        );
      })
      .finally(() => setLoading(false));
};

  
  
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  )
}

export default ChatScreen;

const styles = StyleSheet.create({})