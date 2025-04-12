import React, { Children, createContext, useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import geoLocation from 'react-native-geolocation-service';
export const AppContext = createContext();

import { MMKV } from "react-native-mmkv";


const storage = new MMKV();
export const AppProvider = ({ children }) => {
    const [userLocation, setLocation] = useState(null);
    const cacheLocationKey = 'cacheLocationKey91';
    const cachedLocation = storage.getString(cacheLocationKey);
    // Function for requesting user's location

    async function requestLocationPermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };
    // Function for getting user's co-ordinates
    async function getUserCoords() {
        const hasPermissions = await requestLocationPermission();
        // Checking if user has given location permission
        if (!hasPermissions) return;
        // Fetching the co-ordinates of the user's location
        return new Promise((resolve, reject) => {
            geoLocation.getCurrentPosition(
                position => {
                    const coords = {
                        latitude: position?.coords?.latitude,
                        longitude: position?.coords?.longitude,
                    };
                    resolve(coords);
                },
                error => {
                    Alert.alert(error.code, error.message);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                }
            );
        })
    }

    async function getUserLocation() {
        if(cachedLocation){
            const { timeStamp,location } = JSON.parse(cachedLocation);
            if(location && Date.now() - timeStamp < 12 * 60 * 60 * 1000){
                setLocation(location);
                return;
            }
        }
        const coOrds = await getUserCoords();
        if (coOrds) {
            try {
                let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coOrds.latitude}&lon=${coOrds.longitude}`);
                response = await response.json();
                storage.set(cacheLocationKey,JSON.stringify({timeStamp:Date.now(),location:response.address}));
                setLocation(response.address);
            }
            catch (error) {
                Alert.alert(String(error));
            }
        }
    }
    useEffect(() => {
        getUserLocation();
    }, []);
    return (
        <AppContext.Provider value={
            {
                getUserLocation,
                userLocation,
            }
        } >
            {children}
        </AppContext.Provider>
    )
}