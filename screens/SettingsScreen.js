import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { scale } from "react-native-size-matters";
import { AppContext } from "../context/context";

export default function SettingsScreen() {
    const UnitOptions = [
        { label: 'Quintal (Q)', value: 1 },
        { label: 'Kilogram (Kg)', value: 100 },
    ]
    const {selectedUnit,setUnit,saveSelectedUnit} = useContext(AppContext);
    useEffect(() => {
        return () => {
            saveSelectedUnit();
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.settingsItem}>
                <Text style={styles.settingItemHeading}>
                    Preferred unit
                </Text>
                <Dropdown
                    data={UnitOptions}
                    containerStyle={{ marginTop: -scale(70) }}
                    style={styles.dropdownMenu}
                    dropdownPosition="auto"
                    // maxHeight={scale(300)}
                    labelField="label"
                    valueField="value"
                    onChange={(item) => {
                        setUnit(item.value)
                    }}
                    value={selectedUnit}
                    closeModalWhenSelectedItem
                    itemTextStyle={styles.itemTextStyle}
                    renderCustomizedButtonChild={() => {
                        // Find the selected item based on the selectedUnit value
                        const selectedItem = UnitOptions.find(item => item.value === selectedUnit);
                        return (
                            <Text style={styles.placeholderText}>
                                {selectedItem ? selectedItem.label : 'Select unit'}
                            </Text>
                        );
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: scale(10),
        backgroundColor:'#e3f5ff'
    },
    settingsItem: {
        // backgroundColor: 'skyblue',
        width: '100%',
        height: scale(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scale(5),
    },
    settingItemHeading: {
        fontSize: scale(15)
    },
    dropdownMenu: {
        height: scale(45),
        width: scale(160),
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(5),
        backgroundColor: 'white',
        borderRadius: scale(10),
    },
    itemTextStyle: {
        fontSize: scale(12),
        textAlign: 'center',
    }
})