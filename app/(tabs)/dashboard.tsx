import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDashboard } from "@/api/repositories/repository";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SplashScreen } from "expo-router";
import DropDown from "@/components/DropDown";
import DataView from "@/components/DataView";
import CustomColumnChart from "@/components/CustomColumnChart";
import SortableTable from "@/components/SortableTable";
import SortableList from "@/components/SortableList";
import CustomGraph from "@/components/CustomGraph";
import CustomMonthPicker from "@/components/CustomMonthPicker";
import Ionicons from "@expo/vector-icons/Ionicons";

SplashScreen.preventAutoHideAsync();

enum WeekDataType {
    WeekAvgCount = "Дундаж тоо",
    WeekSumAmount = "7 хоног/Тоо/",
}

export default function Dashboard() {
    const { hospital, serviceTypes } = useGlobalContext();
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
    const [weekDataType, setWeekDataType] = useState(WeekDataType.WeekAvgCount);
    const weekDataTypeKeys = Object.keys(WeekDataType);

    const dataIcons = [
        <Ionicons name="people" size={34} color="forestgreen" />,
        <Ionicons name="time" size={34} color="forestgreen" />,
        <Ionicons name="time" size={34} color="forestgreen" />,
        <Ionicons name="analytics-sharp" size={34} color="forestgreen" />,
    ];

    const getData = async () => {
        try {
            const data = await getDashboard(date, service.id, hospital.id);
            setDashboard(data);
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    const toggleWeekDataType = (key) => {
        setWeekDataType(key);
    };

    useEffect(() => {
        getData();
    }, [date, service, hospital]);

    return (
        <View className="h-full py-2 px-1">
            <ScrollView>
                <View className="flex-row justify-center mt-1">
                    <CustomMonthPicker
                        onChange={(date) => {
                            setDate(date);
                        }}
                        pickerBtnStyle="w-[44vw] mr-2"
                    />
                    <DropDown
                        data={services}
                        onChange={(item) => {
                            setService(item);
                        }}
                        initialValue={initialServiceType}
                        dropDownBtnStyle="w-[44vw]"
                        dropDownStyle="min-w-[44vw]"
                    />
                </View>
                {dashboard ? (
                    <View className="items-center justify-center mt-4">
                        <View className="flex-row justify-center flex-wrap">
                            {dashboard.systemCountData.map(
                                (
                                    data: { name: string; cnt: number },
                                    index: number
                                ) => (
                                    <DataView
                                        key={data.name}
                                        title={data.name}
                                        data={data.cnt}
                                        containerStyle="mx-2"
                                        icon={dataIcons[index]}
                                    />
                                )
                            )}
                        </View>
                        {dashboard.monthBookingData.length ? (
                            <View className="flex-1 w-[90vw] mt-4 items-center justify-center">
                                <CustomGraph
                                    data={dashboard.monthBookingData}
                                    title="Үйлчлүүлэгчидийн тоо/Өдөр/"
                                    maxValue={dashboard.maxMonthBookingData}
                                />
                            </View>
                        ) : null}

                        {dashboard.doctorAvgHour.length ? (
                            <View className="flex-1 mt-24items-center justify-center">
                                <SortableList
                                    data={dashboard.doctorAvgHour}
                                    title="Эмч нарын хариу гаргалт"
                                    headers={[
                                        "Нийт Тоо",
                                        "Энгийн хариу дундаж",
                                        "72+ цагт гарсан хариуны тоо",
                                        "Яаралтай хариуны тоо",
                                        "Яаралтай хариуны дундаж хугацаа",
                                        "Яаралтай 36+ цагт гарсан хариуны тоо",
                                    ]}
                                    miniHeaders={[
                                        "Нийт",
                                        "Дундаж",
                                        "72+",
                                        "Яаралтай тоо",
                                        "Яаралтай хугацаа",
                                        "Яаралтай 36+",
                                    ]}
                                    keys={[
                                        "cnt",
                                        "avgHour",
                                        "cnt72",
                                        "cntUrgent",
                                        "urgentAvg",
                                        "cntUrgent36",
                                    ]}
                                />
                            </View>
                        ) : null}

                        {/* hourCustomerData */}
                        {dashboard.hourCustomerData.length ? (
                            <View className=" flex-1 w-[90vw] mt-2 items-center justify-center">
                                <CustomGraph
                                    data={dashboard.hourCustomerData}
                                    title="Үйлчлүүлэгчидийн тоо /Цаг/"
                                    maxValue={dashboard.maxHourCustomerData}
                                />
                            </View>
                        ) : null}

                        {dashboard.weekAvgData.length ||
                        dashboard.weekSumData.length ? (
                            <View className="flex-1 mt-6">
                                <View className="flex-row w-[90vw] justify-center bg-white-100 rounded-lg border border-gray-100 shadow-sm">
                                    {weekDataTypeKeys.map((key, index) => (
                                        <TouchableOpacity
                                            className={`h-10 justify-center p-1 items-center w-[50%] ${
                                                weekDataType ==
                                                WeekDataType[key]
                                                    ? ""
                                                    : ""
                                            }`}
                                            key={key}
                                            onPress={() => {
                                                toggleWeekDataType(
                                                    WeekDataType[key]
                                                );
                                            }}
                                        >
                                            <Text
                                                className={`text-base ${
                                                    weekDataType ==
                                                    WeekDataType[key]
                                                        ? "text-primary"
                                                        : ""
                                                }`}
                                            >
                                                {WeekDataType[key]}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {weekDataType ==
                                WeekDataType[weekDataTypeKeys[0]] ? (
                                    <View className="flex-1 w-[90vw] items-center justify-center mt-2">
                                        <CustomGraph
                                            data={dashboard.weekAvgData}
                                            title="Долоо хоног /дундаж/"
                                            maxValue={dashboard.maxWeekAvgData}
                                        />
                                    </View>
                                ) : (
                                    <View className="flex-1 w-[90vw] items-center justify-center mt-2">
                                        <CustomGraph
                                            data={dashboard.weekSumData}
                                            title="Долоо хоног дүнгийн график"
                                            maxValue={dashboard.maxWeekSumData}
                                        />
                                    </View>
                                )}
                            </View>
                        ) : null}
                        {dashboard.weekBookingData.length ? (
                            <View className="flex-1 w-[90vw] items-center justify-center mt-6">
                                <CustomGraph
                                    data={dashboard.weekBookingData}
                                    title="7 хоногоор"
                                    maxValue={dashboard.maxWeekBookingData}
                                />
                            </View>
                        ) : null}
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}
