import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar, TextInput, Avatar, Provider as PaperProvider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import {chatScreen} from './screens/ChatScreen'
import io from "socket.io-client"
import {useEffect, useState, useRef} from "react";
import SocketIOClient from 'socket.io-client';
import ChatRoom from './src/ChatRoom.js';
import {LoginScreen} from './screens/LoginScreen'
import {theme} from "./styles/App.style";
import SkyChatScreen from "./screens/ChatScreen";
import socketConnection from "./src/ChatRoom";


const App = () => {

    useEffect(() => {
        socketConnection.connect()
    }, [])

    const Stack = createNativeStackNavigator();

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginScreen">
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="SkyChatScreen" component={SkyChatScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App
