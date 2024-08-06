import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDashboard } from "@/api/repositories/repository";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SplashScreen } from "expo-router";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";
import DataView from "@/components/DataView";
import CustomColumnChart from "@/components/CustomColumnChart";

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
    const [dashboard, setDashboard] = useState(null);
    var services = [initialServiceType, ...serviceTypes];

    const getData = async () => {
        try {
            const data = await getDashboard(date, service.id, hospital.id);
            setDashboard(data);
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    useEffect(() => {
        getData();
    }, [date, service, hospital]);

    return (
        <SafeAreaView className="h-full">
            <ScrollView>
                <View className="flex-row justify-center">
                    <DatePicker
                        onChange={(date) => {
                            setDate(date);
                        }}
                        pickerBtnStyle="w-[35vw] mr-2"
                    />
                    <DropDown
                        data={hospitals}
                        onChange={(item) => {
                            setHospital(item);
                        }}
                        initialValue={hospital}
                        dropDownBtnStyle="w-[35vw] mr-2"
                        dropDownStyle="min-w-[35vw]"
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
                {dashboard ? (
                    <View className="items-center justify-center mt-2">
                        <View className="flex-row justify-center flex-wrap">
                            {dashboard.systemCountData.map(
                                (
                                    data: { name: string; cnt: number },
                                    index: any
                                ) => (
                                    <DataView
                                        key={data.name}
                                        title={data.name}
                                        data={data.cnt}
                                        containerStyle="mx-2"
                                    />
                                )
                            )}
                        </View>
                        <View className="mt-4 flex-1 items-center justify-center">
                            <CustomColumnChart
                                data={dashboard.monthBookingData}
                                title="Үйлчлүүлэгчидийн тоо/Өдөр/"
                            />
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
