import React from "react";
import {  Redirect,Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import Fontisto from "@expo/vector-icons/Fontisto";
import { IconSymbol } from '@/components/ui/IconSymbol';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import Entypo from '@expo/vector-icons/Entypo';


const TabLayout = () => {
  
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#3273F6",
          tabBarInactiveTintColor: "#9E9898",
          headerShown: false,
          tabBarStyle: {
          backgroundColor: "#fff",
            paddingTop: 8,
            height: 70,
            width: '100%',
            alignSelf: "center",
            justifyContent: "center",
          },
        }}
      >
        <Tabs.Screen
          name="map"
          options={{
            title: "location",
            tabBarIcon: ({ focused }) => (
              <Foundation
                name={"map"}
                size={focused ? 30 : 25}
                color={focused ? "#3273F6" : "#9E9898"}
              />
            ),
          }}
        />


        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Feather
                name={"person"}
                size={focused ? 30 : 25}
                color={focused ? "#3273F6" : "#9E9898"}
              />
            ),
          }}
        />


      </Tabs>
      {/* <StatusBar style="dark" /> */}
    </>
  );
};

export default TabLayout;


