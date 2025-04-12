import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import HomeScreen from "../screens/HomeScreen";
import { scale } from "react-native-size-matters";
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import MapTesting from "../screens/MapTesting";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/context";
import { Text } from "react-native";
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    const insets = useSafeAreaInsets();
    const { userLocation } = useContext(AppContext);
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={
                {
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderTopColor:'green',
                        borderTopWidth:2,
                        height: scale(90)
                    },
                    tabBarLabelStyle: {
                        fontSize: scale(12),
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                    headerStyle: {
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity activeOpacity={0.75}>
                                <View style={styles.addressContainer}>
                                    {
                                        userLocation ?
                                            <>
                                                <Icon name={'location'} size={scale(20)} color={'white'} />
                                                <Text style={styles.addressHeading} numberOfLines={1}
                                                    ellipsizeMode="tail">
                                                    {`${userLocation.village},${userLocation.state_district},${userLocation.state}`}
                                                </Text>
                                                <Icon name={'create'} size={scale(20)} color={'white'} />
                                            </>
                                            :
                                            <>
                                                <Text style={styles.addressHeading}>
                                                    Obtaining address
                                                </Text>
                                                <ActivityIndicator color={'white'} size={scale(30)} />
                                            </>
                                    }
                                </View>
                            </TouchableOpacity>

                        )
                    }
                    // headerShown: false,
                }
            }>
                <Tab.Screen name="Home" component={HomeScreen} options={
                    {
                        tabBarIcon: () => (
                            <Icon name={'home'} size={scale(20)} color={'green'} />
                        ),
                    }
                } />
                {/* <tab.Screen name="Map" component={MapTesting} options={
                        {
                            tabBarIcon: () => (
                                <Icon name={'search'} size={scale(20)} color={'black'} />
                            ),
                        }
                    } /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        backgroundColor: 'green',
        height: scale(40),
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: scale(5),
        flexDirection: 'row',
        borderRadius: scale(20),
        margin: scale(5)
    },
    addressHeading: {
        fontSize: scale(12.5),
        color: 'white',
        textAlign: 'center',
        // backgroundColor:'blue',
        width: '85%'
    },
})