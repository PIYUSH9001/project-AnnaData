import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { AppProvider } from './context/context';
import AppNavigation from "./navigations/AppNavigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function App() {
    // const APIKEY = "579b464db66ec23bdd000001db1e909dc11045b351a6539e1fa7ddd7";
    useEffect(() => {
        StatusBar.setHidden(true);
        return () => {
            StatusBar.setHidden(false);
        }
    }, [])
    return (
        <AppProvider>
            <SafeAreaProvider>
                    <AppNavigation />
            </SafeAreaProvider>
        </AppProvider>
    )
}
