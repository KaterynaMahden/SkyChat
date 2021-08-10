import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView,} from 'react-native';
import {io} from 'socket.io-client'
import {Provider as PaperProvider} from 'react-native-paper'
import {useState} from "react";
// import AsyncStorage from "@react-native-community/async-storage";
import {AsyncStorage} from 'react-native';

let socketConnectionInst

export const connect = () => {
    socketConnectionInst = io('http://192.168.1.245:8000/');

    console.log(" connect ")
    socketConnectionInst.on('connect', () => console.log('connected'));
    socketConnectionInst.on('disconnect', () => console.log('disconnected'));

}
const getMessage = () => {
    return socketConnectionInst.on('message:get', (data) => {

    })
}

const promisifyEmit = (key, data) => {
    return new Promise((resolve) => {
        socketConnectionInst.emit(key, data, (result) => resolve(result))
    })
}

const promisifyOn = (key, data) => {
    return new Promise((resolve) => {
        socketConnectionInst.on(key, data)
        }
    )
}

const sendName = async (userName, primaryId) => {
    return promisifyEmit('room:join', {userName, roomId: primaryId}).then(async (data) => {
        const name = data._id;
        const room = data.room._id;
        try {
            await AsyncStorage.setItem("nameId", name)
            await AsyncStorage.setItem("roomId", room)
            await AsyncStorage.setItem('socketId', socketConnectionInst.id);
            // console.log(await AsyncStorage.getItem("nameId"));
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    })
}

export default {
    connect,
    sendName,
    getMessage,
    promisifyOn,
}

