import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDashboard } from "@/api/repositories/repository";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SplashScreen } from "expo-router";
import DropDown from "@/components/DropDown";

// splash screen implement

SplashScreen.preventAutoHideAsync();

export default function Dashboard() {
    const {
        hospital,
        setHospital,
        serviceType,
        setServiceType,
        hospitals,
        serviceTypes,
    } = useGlobalContext();

    const getData = async () => {
        try {
            const data = await getDashboard();

            console.log(data);
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    return (
        <SafeAreaView className="h-full items-center px-4">
            <DropDown
                data={hospitals}
                onChange={(item) => {
                    setHospital(item);
                }}
                initialValue={hospital}
            />
        </SafeAreaView>
    );
}
