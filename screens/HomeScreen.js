import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { APIKEY } from '@env';
import { scale } from "react-native-size-matters";
import ItemCard from "../components/ItemCards";
import { AppContext } from "../context/context";
import Icon from 'react-native-vector-icons/Ionicons';
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export default function HomeScreen() {
    const [data, setData] = useState([]);
    const {userLocation } = useContext(AppContext);
    // const URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${APIKEY}&format=json&filters[state]=${userLocation.state}&filters[district]=${userLocation.state_district}&limit=100`;
    async function fetchData(url) {
        const cacheDataKey = 'cacheDataKey91';

        const cachedDataExists = storage.getString(cacheDataKey);

        if (cachedDataExists) {
            const { timeStamp, cachedData } = JSON.parse(cachedDataExists);
            if ( Date.now() - timeStamp < 12 * 60 * 60 * 1000) {
                setData(cachedData);
                return;
            }
        }

        try {
            let response = await fetch(url);
            response = await response.json();
            storage.set(cacheDataKey,JSON.stringify({timeStamp:Date.now(),cachedData:response.records}))
            setData(response?.records);
        }
        catch (error) {
            Alert.alert(String(error));
        }
    }

    useEffect(() => {
        if (userLocation?.state && userLocation?.state_district) {
            const URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${APIKEY}&format=json&filters[state]=${encodeURIComponent(userLocation.state)}&filters[district]=${encodeURIComponent(userLocation.state_district)}&limit=100`;
            fetchData(URL);
        }
    }, [userLocation]);
    return (
        <View style={styles.container}>
            {/* Address Bar */}
            {/* <TouchableOpacity activeOpacity={0.75}>
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
            </TouchableOpacity> */}
            {/* <Text style={styles.heading}>
            Current Daily Price of Various Commodities from Various Markets (Mandi)
            </Text> */}
            {/* Content */}
            {
                data.length > 0 ?
                    <FlatList data={data} renderItem={({ item }) => (
                        <ItemCard
                            state={item.state}
                            district={item.district}
                            market={item.market}
                            variety={item.variety}
                            commodityHeading={item.commodity}
                            grade={item.grade}
                            arrivalTime={item.arrival_date}
                            minPrice={item.min_price}
                            avgPrice={item.modal_price}
                            maxPrice={item.max_price}
                        />
                    )} />
                    :
                    <View style={styles.loadingScreen}>

                        <ActivityIndicator size={scale(40)} color={'green'} />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: scale(5),
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    // addressContainer: {
    //     backgroundColor: 'green',
    //     height: scale(40),
    //     width: '95%',
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly',
    //     padding: scale(2),
    //     flexDirection: 'row',
    //     borderRadius: scale(20),
    //     margin:scale(5)
    // },
    // addressHeading: {
    //     fontSize: scale(12.5),
    //     color: 'white',
    //     textAlign: 'center',
    //     // backgroundColor:'blue',
    //     width: '85%'
    // },
    loadingScreen: {
        flex: 1,
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: scale(15),
        width: 'auto',
        margin: scale(5),
        // backgroundColor:'red',
        textAlign: 'center',
        fontWeight: "bold"
    }
})