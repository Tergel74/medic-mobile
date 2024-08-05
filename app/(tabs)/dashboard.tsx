import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDashboard } from "@/api/repositories/repository";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SplashScreen } from "expo-router";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";

SplashScreen.preventAutoHideAsync();

export default function Dashboard() {
    const { hospital, setHospital, hospitals, serviceTypes } =
        useGlobalContext();
    const [date, setDate] = useState<string>(
        new Date().toISOString().substring(0, 10)
    );
    const initialServiceType = {
        id: "-1",
        name: "Бүгд",
    };
    const [service, setService] = useState(initialServiceType);
    var services = [initialServiceType, ...serviceTypes];

    const getData = async () => {
        try {
            const data = await getDashboard();

            console.log(data);
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    return (
        <SafeAreaView className="h-full">
            <View className="flex-row justify-center">
                <DatePicker
                    onChange={(date) => {
                        setDate(date);
                    }}
                    pickerBtnStyle="w-[28vw] mr-2"
                />
                <DropDown
                    data={hospitals}
                    onChange={(item) => {
                        setHospital(item);
                    }}
                    initialValue={hospital}
                    dropDownBtnStyle="w-[28vw] mr-2"
                    dropDownStyle="min-w-[28vw]"
                />
                <DropDown
                    data={services}
                    onChange={(item) => {
                        setService(item);
                    }}
                    initialValue={initialServiceType}
                    dropDownBtnStyle="w-[20vw]"
                    dropDownStyle="min-w-[20vw]"
                />
            </View>
        </SafeAreaView>
    );
}
