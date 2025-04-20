import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import PotatoImage from '../images/itemBackground.jpg'
import Icon from 'react-native-vector-icons/Ionicons';
export default function ItemCard({commodityHeading,state,district,market,variety,grade,arrivalTime,minPrice,avgPrice,maxPrice,selectedUnit}) {
    return (
        <View style={styles.card}>
            <Image source={PotatoImage} style={styles.cardImage} />
            <View style={styles.cardDetailsContainer}>
                <Text style={styles.cardHeading}>
                    {commodityHeading}
                </Text>
                <View style={styles.cardRatesContainer}>
                    <View style={styles.cardDivisionalAreas}>
                        {/*Address */}
                        <View style={styles.cardDetails}>
                            <Icon name={'location'} size={scale(20)} color={'black'} />
                            <Text style={styles.cardDetailsText} numberOfLines={1}
                                ellipsizeMode="tail">
                                {market},{district}
                            </Text>
                        </View>
                        {/*Variety */}
                        <View style={styles.cardDetails}>
                            <Icon name={'leaf'} size={scale(20)} color={'black'} />
                            <Text style={styles.cardDetailsText} numberOfLines={1}
                                ellipsizeMode="tail">
                                {variety}
                            </Text>
                        </View>
                        {/* Grade */}
                        <View style={styles.cardDetails}>
                            <Icon name={'diamond'} size={scale(20)} color={'black'} />
                            <Text style={styles.cardDetailsText} numberOfLines={1}
                                ellipsizeMode="tail">
                                {grade}
                            </Text>
                        </View>
                        {/* Date of arrival */}
                        <View style={styles.cardDetails}>
                            <Icon name={'calendar'} size={scale(20)} color={'black'} />

                            <Text style={styles.cardDetailsText} numberOfLines={1}
                                ellipsizeMode="tail">
                                {arrivalTime}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.cardDivisionalAreas}>
                        <View style={styles.rateArea}>
                            <View style={[styles.ratesTag, { backgroundColor: 'red' }]}>
                                <Text style={styles.ratesTagHeading}>
                                    MIN
                                </Text>
                            </View>
                            <Text style={styles.ratesValue}>
                                {minPrice/selectedUnit} ₹/
                                <Text style={{fontWeight:'bold'}}>{selectedUnit === 100?'Kg':'Q'}</Text>
                            </Text>
                        </View>
                        <View style={styles.rateArea}>
                            <View style={[styles.ratesTag, { backgroundColor: 'yellow' }]}>
                                <Text style={[styles.ratesTagHeading,{color:'black'}]}>
                                    AVG
                                </Text>
                            </View>
                            <Text style={styles.ratesValue}>
                                {avgPrice/selectedUnit} ₹/
                                <Text style={{fontWeight:'bold'}}>{selectedUnit === 100?'Kg':'Q'}</Text>
                            </Text>
                        </View>
                        <View style={styles.rateArea}>
                            <View style={[styles.ratesTag, { backgroundColor: 'green' }]}>
                                <Text style={styles.ratesTagHeading}>
                                    MAX
                                </Text>
                            </View>
                            <Text style={styles.ratesValue}>
                                {maxPrice/selectedUnit} ₹/
                                <Text style={{fontWeight:'bold'}}>{selectedUnit === 100?'Kg':'Q'}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: scale(400),
        width: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white',
        // borderRadius: '10%',
        elevation: 20,
        marginTop:scale(15),
        marginBottom:scale(15),
        padding:scale(5)
    },
    cardImage: {
        height: '45%',
        width: '90%'
    },
    cardDetailsContainer: {
        height: '45%',
        width: '100%',
        // backgroundColor: "yellow",
        borderBottomLeftRadius: scale(20),
        borderBottomRightRadius: scale(20),
        padding: scale(5),
        justifyContent:'center'
    },
    cardHeading: {
        fontSize: scale(20),
        fontWeight: 'bold',
        marginLeft: scale(20),
    },
    cardRatesContainer: {
        height: '65%',
        width: '100%',
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardDivisionalAreas: {
        height: '100%',
        width: '50%',
        // backgroundColor:'lightgray',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor:'yellow'
    },
    cardDetailsText: {
        width: '80%',
        fontSize: scale(15),
        textVerticalAlign: 'center',
        marginLeft: scale(5),
        // backgroundColor:'red'
    },
    cardDetails: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor:'red'
    },
    ratesTag: {
        height: scale(30),
        width: scale(60),
        backgroundColor: 'yellow',
        borderRadius: scale(15),
        padding: scale(3),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'black'
    },
    rateArea: {
        // backgroundColor: 'blue',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    ratesTagHeading: {
        fontSize: scale(12.5),
        fontWeight: 'bold',
        color:'white'
    },
    ratesValue:{
        fontSize:scale(15)
    }
})