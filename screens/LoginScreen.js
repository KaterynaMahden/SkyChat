import React, {useEffect} from "react";
import {Card, TextInput, Button} from "react-native-paper";
import {SafeAreaView, View} from "react-native";
import {loginStyle} from "../styles/loginStyle";
import socketConnection from "../src/ChatRoom";
import {useState} from "react";
import SkyChatScreen from "./ChatScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


export const LoginScreen = ({ navigation }) => {
    const Stack = createStackNavigator();
    const [userName, setName] = useState('');
    const [primaryId, setPrimary] = useState('');


    const onPress = async() => {
        const result = await socketConnection.sendName(userName, primaryId)
        navigation.navigate('SkyChatScreen')
    }

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Let's start chatting!" titleStyle={loginStyle.cardTitle}/>
                    <Card.Content>
                        <TextInput
                            label='Enter your name..'
                            value={userName}
                            onChangeText={setName}
                        />
                        <TextInput
                            label='Enter room id..'
                            value={primaryId}
                            onChangeText={setPrimary}
                        />
                        <Button mode="contained" onPress={onPress}
                                style={loginStyle.cardButton}>
                            Enter existing room
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>

    )

}