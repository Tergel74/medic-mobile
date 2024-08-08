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
import SortableTable from "@/components/SortableTable";

SplashScreen.preventAutoHideAsync();

enum WeekDataType {
    WeekAvgCount = "Дундаж тоо",
    WeekAvgAmount = "Дундаж дүн",
    WeekSumCount = "7 хоног/дүн/",
    WeekSumAmount = "7 хоног/Тоо/",
}

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
    const [weekDataType, setWeekDataType] = useState(WeekDataType.WeekAvgCount);
    const weekDataTypeKeys = Object.keys(WeekDataType);

    const getData = async () => {
        try {
            const data = await getDashboard(date, service.id, hospital.id);
            setDashboard(data);
        } catch (err) {
            Alert.alert("Error", err.message);
        }
    };

    const toggleWeekDataType = (key) => {
        console.log(key);
        setWeekDataType(key);
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
                        <View className="mt-4 flex-1 items-center justify-center">
                            <SortableTable
                                data={dashboard.doctorAvgHour}
                                title="Эмч нарын хариу гаргалт"
                                headers={[
                                    "Нэр",
                                    "Нийт Тоо",
                                    "Энгийн хариу дундаж",
                                    "72+ цагт гарсан хариуны тоо",
                                    "Яаралтай хариуны тоо",
                                    "Яаралтай хариуны дундаж хугацаа",
                                    "Яаралтай 36+ цагт гарсан хариуны тоо",
                                ]}
                                keys={{
                                    "Нийт Тоо": "cnt",
                                    "Энгийн хариу дундаж": "avgHour",
                                    "72+ цагт гарсан хариуны тоо": "cnt72",
                                    "Яаралтай хариуны тоо": "cntUrgent",
                                    "Яаралтай хариуны дундаж хугацаа":
                                        "urgentAvg",
                                    "Яаралтай 36+ цагт гарсан хариуны тоо":
                                        "cntUrgent36",
                                }}
                            />
                        </View>
                        {/* resp iig yanzlah */}
                        {/* <View className="mt-4 flex-1 items-center justify-center">
                            <CustomColumnChart
                                data={dashboard.hourCustomerData}
                                title="Үйлчлүүлэгчидийн тоо/Цаг/"
                            />
                        </View> */}
                        <ScrollView horizontal className="mx-2">
                            {weekDataTypeKeys.map((key, index) => (
                                <TouchableOpacity
                                    className={`h-14 p-2 justify-center items-center my-4 mx-2 w-[26vw] ${
                                        weekDataType == WeekDataType[key]
                                            ? "border-b border-primary"
                                            : ""
                                    }`}
                                    key={key}
                                    onPress={() => {
                                        toggleWeekDataType(WeekDataType[key]);
                                    }}
                                >
                                    <Text
                                        className={`text-base ${
                                            weekDataType == WeekDataType[key]
                                                ? "text-primary"
                                                : ""
                                        }`}
                                    >
                                        {WeekDataType[key]}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {/* response iig bas salgah, mun label value bolgoh */}
                        {/* <View className="mt-4 flex-1 items-center justify-center">
                        <CustomColumnChart
                                data={weekDataType == WeekDataType.WeekAvgCount }
                                title="Үйлчлүүлэгчидийн тоо/Цаг/"
                            />
                        </View> */}
                        {/* Table iin response uurchluh, type aar tusdaa array irdeg bolgoh */}
                        <View className="mt-4 flex-1 items-center justify-center">
                            <SortableTable
                                data={dashboard.doctorAvgHour}
                                title={`MRI Дата`}
                                headers={["Нэр", "Тоо", "Хувь"]}
                                keys={{
                                    Тоо: "cnt",
                                }}
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
