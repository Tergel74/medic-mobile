import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
    getAnalysis,
    getCeItems,
    getDeviceModels,
    getDoctors,
} from "@/api/repositories/repository";
import SortableList from "@/components/SortableList";
import ActionDataList from "@/components/ActionDataList";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Analysis() {
    const { user, hospital, setHospital, hospitals, serviceTypes } =
        useGlobalContext();

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [doctors, setDoctors] = useState();
    const [ceItems, setCeItems] = useState();
    const [deviceModels, setDeviceModels] = useState(null);
    const [deviceModel, setDeviceModel] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const getStartingData = async () => {
        const doctors = await getDoctors(hospital.id);
        setDoctors(doctors);
        const ceItems = await getCeItems();
        setCeItems(ceItems);
        const deviceModels = await getDeviceModels(hospital.id, 2);
        setDeviceModels(deviceModels);
        setDeviceModel(deviceModels[1]);
    };

    const getData = async () => {
        const currentDate = new Date(date);
        const analysis = await getAnalysis(
            `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
            )}T00:00:00`,
            `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
            )}T23:59:00`,
            2,
            user.role == "Техникч" ? user.id : -1,
            hospital.id
        );
        setAnalysis(analysis);
    };

    useEffect(() => {
        getStartingData();
        getData();
    }, [date, hospital]);

    return (
        <View className="h-full py-2 px-1 bg-white">
            <ScrollView>
                {deviceModels ? (
                    <View className="flex-row justify-center flex-wrap">
                        <DatePicker
                            startValue={new Date()}
                            onChange={(date) => {
                                setDate(date);
                            }}
                            pickerBtnStyle="w-[90vw] mr-2"
                        />
                        {/* <DropDown
                            data={deviceModels}
                            onChange={(device) => {
                                setDeviceModel(device);
                            }}
                            initialValue={deviceModels[1]}
                            dropDownBtnStyle="w-[45vw]"
                            dropDownStyle="min-w-[45vw]"
                        /> */}
                    </View>
                ) : null}
                {analysis && analysis.rows.length ? (
                    // Initial View:
                    // number
                    // name
                    // register id
                    // age
                    // picture
                    // device
                    // shinjluuleh erhten
                    // ognoo

                    // Expanded View:
                    // Initial View
                    // zoviur
                    // tailbar
                    // emch/technich
                    // zuvluh emch
                    // status (garsan eseh)
                    // garsan tsag
                    // Action(tsutslah)
                    // Action(zasah)
                    // Hariu avah utas
                    <View className="items-center justify-center mt-4 flex-1">
                        <ActionDataList
                            title={`Шинжилгээ /${date}/`}
                            data={analysis.rows}
                            role={user.role}
                        />
                    </View>
                ) : (
                    <View className="justify-center items-center space-y-2 mt-10">
                        <SimpleLineIcons name="drawer" size={60} color="gray" />
                        <Text className="text-gray-500 text-base">
                            Мэдээлэл байхгүй байна
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

// tsag zahialga
// filter: tuhain udriin ognoo, tuhuurumj
// ognoo hurtel orood, shiljuuleh erhten, tuluv
// onpress => nemeh form(apparat ni uurchlugddug)

// filter: zuvhun ter udriin ognoo, tuhuurumj, techich zuvhun uuruu nevtersen huniih hucheer gargana

// patient iin medeelel, hevleh
// tuhuurumj, erhten, ognoo
// delgerengui page deer huleen avah utas hurtel gargana (tsutslah avaad zasah iig ni uldeeh)
// nereer haih implement and yaraltai: x deer push notification

// emchid zuvhun analysis
// technich dashboard aas busad ni
// reception technic tei adil

// admin bas ceo d bugd
