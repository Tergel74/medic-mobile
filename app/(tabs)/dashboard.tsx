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
        <View className="h-full py-2 px-1 bg-white">
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
                            {/* tailor it to mobile -> make smaller and remove hariu garsan and hariu garaagui */}
                            {dashboard.systemCountData.map(
                                (
                                    data: { name: string; cnt: number },
                                    index: number
                                ) =>
                                    data.name != "Хариу гарсан" &&
                                    data.name != "Хариу гараагүй" ? (
                                        <DataView
                                            key={data.name}
                                            title={data.name}
                                            data={data.cnt}
                                            containerStyle="mx-2"
                                            icon={dataIcons[index]}
                                        />
                                    ) : null
                            )}
                        </View>
                        {dashboard.monthBookingData.length ? (
                            <View className="flex-1 items-center justify-center">
                                {/* <CustomColumnChart
                                data={dashboard.monthBookingData}
                                title="Үйлчлүүлэгчидийн тоо/Өдөр/"
                            /> */}
                                <CustomGraph
                                    data={dashboard.monthBookingData}
                                    title="Үйлчлүүлэгчидийн тоо/Өдөр/"
                                />
                            </View>
                        ) : null}

                        {dashboard.doctorAvgHour.length ? (
                            <View className="flex-1 items-center justify-center -mt-4">
                                {/* <SortableTable
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
                            /> */}
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

                        {/* resp iig yanzlah */}
                        {/* <View className="mt-4 flex-1 items-center justify-center">
                            <CustomColumnChart
                                data={dashboard.hourCustomerData}
                                title="Үйлчлүүлэгчидийн тоо/Цаг/"
                            />
                        </View> */}

                        <>
                            <ScrollView horizontal className="mx-2 -my-8">
                                {/* amount iig has and solution same with the firtsh graph */}
                                {weekDataTypeKeys.map((key, index) => (
                                    <TouchableOpacity
                                        className={`h-14 p-2 justify-center items-center my-4 mx-2 w-[26vw] ${
                                            weekDataType == WeekDataType[key]
                                                ? "border-b border-primary"
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
                            </ScrollView>
                            {/* response iig bas salgah, mun label value bolgoh */}
                            {/* <View className="mt-4 flex-1 items-center justify-center">
                        <CustomColumnChart
                                data={weekDataType == WeekDataType.WeekAvgCount }
                                title="Үйлчлүүлэгчидийн тоо/Цаг/"
                            />
                        </View> */}
                            {/* Table iin response uurchluh, type aar tusdaa array irdeg bolgoh */}
                        </>
                    </View>
                ) : (
                    <View></View>
                )}
            </ScrollView>
        </View>
    );
}
