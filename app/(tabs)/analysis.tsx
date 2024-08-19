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
        <SafeAreaView className="h-full">
            <ScrollView>
                <View className="flex-row justify-center flex-wrap">
                    <DropDown
                        data={hospitals}
                        onChange={(item) => {
                            setHospital(item);
                        }}
                        initialValue={hospital}
                        dropDownBtnStyle="w-[28vw] mr-1"
                        dropDownStyle="min-w-[28vw]"
                    />
                    <DatePicker
                        startValue={new Date()}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        pickerBtnStyle="w-[32vw] mr-1"
                    />
                    <DatePicker
                        startValue={new Date()}
                        onChange={(date) => {
                            setEndDate(date);
                        }}
                        pickerBtnStyle="w-[32vw] mr-1"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
