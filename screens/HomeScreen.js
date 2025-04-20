import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { APIKEY } from '@env';
import { scale } from "react-native-size-matters";
import ItemCard from "../components/ItemCards";
import { AppContext } from "../context/context";
import Icon from 'react-native-vector-icons/Ionicons';
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export default function HomeScreen() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { userLocation, selectedUnit, setUnit } = useContext(AppContext);
    // const URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${APIKEY}&format=json&filters[state]=${userLocation.state}&filters[district]=${userLocation.state_district}&limit=100`;
    function fuzzySearchAndReorder(items, input) {
        const chars = input.toLowerCase().split("");
        if (chars.length === 0) {
            setFilteredData(data);
            return;
        }
        setFilteredData(
            [...items].sort((a, b) => {
                const aName = a.commodity.toLowerCase();
                const bName = b.commodity.toLowerCase();

                const aMatchCount = chars.filter(char => aName.includes(char)).length;
                const bMatchCount = chars.filter(char => bName.includes(char)).length;

                return bMatchCount - aMatchCount;
            })
        );
    }



    async function fetchData(url) {
        const cacheDataKey = 'cacheDataKey91';

        const cachedDataExists = storage.getString(cacheDataKey);

        if (cachedDataExists) {
            const { timeStamp, cachedData } = JSON.parse(cachedDataExists);
            if (Date.now() - timeStamp < 12 * 60 * 60 * 1000) {
                setData(cachedData);
                setFilteredData(cachedData)
                return;
            }
        }

        try {
            let response = await fetch(url);
            response = await response.json();
            storage.set(cacheDataKey, JSON.stringify({ timeStamp: Date.now(), cachedData: response.records }))
            setData(response?.records);
            setFilteredData(response?.records);
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
            {/* Content */}

            {
                data.length > 0 ?
                    <>
                        {/* Search Bar */}
                        <TextInput
                            style={styles.searchBox}
                            numberOfLines={1}
                            placeholder="Search commodity from list"
                            selectionColor={'gray'}
                            placeholderTextColor={'gray'}
                            value={searchText}
                            onChangeText={(text) => {
                                setSearchText(text);
                                fuzzySearchAndReorder(filteredData, text)
                            }}
                        />
                        <FlatList data={filteredData} renderItem={({ item }) => (
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
                                selectedUnit={selectedUnit}
                            />
                        )} />
                    </>
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
    },
    searchBox: {
        backgroundColor: 'white',
        height: scale(40),
        width: '90%',
        // borderRadius: 10,
        borderBottomColor: 'green',
        borderBottomWidth: 2,
        fontSize: scale(12.5),
        padding: scale(3),
        margin: scale(5),
    }
})