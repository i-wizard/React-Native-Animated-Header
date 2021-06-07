import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Platform } from 'react-native';
import Animated from 'react-native-reanimated'

const HEADER_HEIGHT = Platform.OS === 'ios' ? 115 :70 
const images = [
  {id:1, uri:"https://masterthecrypto.com/wp-content/uploads/2019/11/CryptoTrading.jpg"},
  {id:2, uri:"https://tradingstrategyguides.com/wp-content/uploads/2018/10/Crypto-Trading-Bot.jpg"},
  {id:3, uri:"https://infographicjournal.com/wp-content/uploads/2019/08/Best-Ways-to-Learn-About-Cryptocurrency-Trading-Banner.png"}
]

export default function App() {
  const scrollY = new Animated.Value(0)
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const headerY = Animated.interpolateNode(diffClampScrollY, {
    inputRange:[0, HEADER_HEIGHT],
    outputRange:[0, -HEADER_HEIGHT]
  })
    return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={{
        position:'absolute', 
        backgroundColor:'gray', 
        left:0, 
        right:0, 
        top:0, 
        height:HEADER_HEIGHT,
        zIndex:1000,
        elevation:1000,
        paddingTop:45,
        alignItems:'center',
        justifyContent:'center',
        transform:[
          {translateY:headerY}
        ]
        }}>
          <Text>Animated Header</Text>
      </Animated.View>
      <Animated.ScrollView
      scrollEventThrottle={16}
      bounces={false}
        onScroll={Animated.event([
          {
            nativeEvent:{contentOffset:{y:scrollY}}
          }
        ])}
        style={{paddingTop:HEADER_HEIGHT}}
      >
          {images.map(image => (
            <View key={image.id} style={{height:400, margin:20}}>
              <Image source={{uri:image.uri}} style={{flex:1, height:null, width:null, borderRadius:10}}/>
            </View>
          ))}
      </Animated.ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
