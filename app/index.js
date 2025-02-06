import { StyleSheet, Text, View,  ActivityIndicator, } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation , router} from "expo-router";
const index = () => {
  const navigation = useNavigation();
     useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/map"); // Navigate to intro1.js after 5 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, [navigation]);
 
  return (
 
      <SafeAreaView style={styles.safe}>
        <View style={styles.view}>
          <Text style={styles.txt}> Welcome </Text>
          {/* <View style={styles.rotate}></View> */}
          <ActivityIndicator size="large" color='#fff'  style={styles.customIndicator} />
           
        </View>
   
      </SafeAreaView>
 
    
  )
}

export default index

const styles = StyleSheet.create({
  safe:{
    flex: 1,
    backgroundColor: '#3273F6',
    color: '#fff',
    justifyContent: 'center',
    alignItems:'center'
  },
  view:{
    height: '100%',
    display: 'flex',
    justifyContent: "flex-end",
    alignItems: "center",
     paddingBottom: 90,
  },
  txt:{
    color: '#fff',
     fontSize: 30,
    // fontWeight: "bold",
    marginTop: 35,
  
  },
  rotate:{
   
    // borderWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 100,
    width: 40,
    height: 40,

 
  },
   customIndicator: {
     marginTop: 180,
    transform: [{ scale: 1.3 }], // Increase size by scaling
  },
  Logo:{
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 15
  }
})