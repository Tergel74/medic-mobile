import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Analysis() {
    const { hospital, setHospital, hospitals, serviceTypes } =
        useGlobalContext();
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [endDate, setEndDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    return (
        <View className="h-full py-2 px-1 bg-white">
            <ScrollView>
                <View className="flex-row justify-center flex-wrap">
                    <DatePicker
                        startValue={new Date()}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        pickerBtnStyle="w-[45vw] mr-2"
                    />
                    <DatePicker
                        startValue={new Date()}
                        onChange={(date) => {
                            setEndDate(date);
                        }}
                        pickerBtnStyle="w-[45vw]"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
