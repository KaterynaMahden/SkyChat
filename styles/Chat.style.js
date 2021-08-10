import {StyleSheet, Dimensions} from "react-native";

let { height, width } = Dimensions.get('window');

export const chatStyle = StyleSheet.create({
button: {
    position: 'absolute',
    height: 40,
    backgroundColor: '#E03794',

},

textInput: {
    flex:1,
    height: 50,
    margin: 10,
    padding: 4,
},
    container: {
  /*  width: '100%',
    height: '100%',
    display: 'flex',*/
/*        display:'flex',
        flexDirection: 'row-reverse',
        alignContent: "flex-end",*/
        // position: 'absolute',
        // bottom: 0,
        // left: '30%'
}
})