import React, {useCallback, useEffect, useState} from 'react'
import {Appbar, TextInput, Button} from "react-native-paper";
import {KeyboardAvoidingView, SafeAreaView, View, ScrollView} from "react-native";
import {chatStyle} from "../styles/Chat.style";
// import {connect} from "../src/ChatRoom"
import {AsyncStorage} from 'react-native';
import {Bubble, GiftedChat, Send} from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import socketConnection from "../src/ChatRoom";


export default function SkyChatScreen({navigation}) {

    const [text, setText] = React.useState('');

    const userMessage = socketConnection.getMessage();
    // console.log('Sms: ', userMessage)

    const sendMessage = async () => {
        fetch('http://192.168.1.245:8000/sendMessage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: await AsyncStorage.getItem('nameId'),
                roomId: await AsyncStorage.getItem('roomId'),
                messageText: text
            })
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err))
    }
    const [messages, setMessages] = useState([]);

    useEffect(async () => {
        socketConnection.promisifyOn('message:get', (data) => {
            console.log(data);

            let info = [];
            info.push({
                userName: data.user.username,
                userId: data.user._id,
                text: data.messageText,
                createdAt: new Date().getTime(),
            });
            setMessages([...info]);
            GiftedChat.append(messages, userMessage);
        })
        // getMessage([
        //     {
        //         _id: 1,
        //         text: 'Hello World!',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        // ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{marginBottom: 5, marginRight: 5}}
                        size={32}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333'/>
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onInputTextChanged={text => setText(text)}
            onSend={(messages) => sendMessage()}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    );
};

// const [messages, setMessages] = useState();
//
//  useEffect(() => {
//      setMessages([
//          {
//              _id: 1,
//              text: {text},
//              createdAt: new Date(),
//              user: {
//                  _id: 2,
//                  name: 'React Native',
//                  avatar: 'https://placeimg.com/140/140/any',
//              },
//          }
//          ])
//  })
//      const renderSend = (props) => {
//          return (
//              <Send {...props}>
//                  <View>
//                      <MaterialCommunityIcons
//                          name="send-circle"
//                          style={{marginBottom: 5, marginRight: 5}}
//                          size={32}
//                          color="#2e64e5"
//                      />
//                  </View>
//              </Send>
//          );
//      };
//
//      const renderBubble = (props) => {
//          return (
//              <Bubble
//                  {...props}
//                  wrapperStyle={{
//                      right: {
//                          backgroundColor: '#2e64e5',
//                      },
//                  }}
//                  textStyle={{
//                      right: {
//                          color: '#fff',
//                      },
//                  }}
//              />
//          );
//      };
//
//      const scrollToBottomComponent = () => {
//          return (
//              <FontAwesome name='angle-double-down' size={22} color='#333'/>
//          );
//      }
//
//      return (
//          <GiftedChat
//              text={text}
//              onInputTextChanged={text => setText(text)}
//              onSend={(messages) => sendMessage()}
//              user={{
//                  _id: 1,
//              }}
//              renderBubble={renderBubble}
//              alwaysShowSend
//              renderSend={renderSend}
//              scrollToBottom
//              scrollToBottomComponent={scrollToBottomComponent}
//          />
//      );
//  };