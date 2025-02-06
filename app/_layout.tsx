import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    // regular: require("../assets/fonts/SpaceMono-Regular.ttf"),
    regular: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>

        <Stack
          screenOptions={{
            title: "",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
          }}
        >
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />

    </>
  );
};

export default RootLayout;