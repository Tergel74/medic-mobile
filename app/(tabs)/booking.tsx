import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Camera from "@/components/Camera";
import { ScrollView } from "react-native-gesture-handler";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getBooking } from "@/api/repositories/repository";
import ActionDataList from "@/components/ActionDataList";

export default function Booking() {
    const { hospital, user, serviceTypes } = useGlobalContext();
    const initialServiceType = {
        id: "-1",
        name: "Бүгд",
    };
    const [service, setService] = useState(initialServiceType);
    var services = [initialServiceType, ...serviceTypes];
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [booking, setBooking] = useState(null);

    const getData = async () => {
        const currentDate = new Date(date);
        const booking = await getBooking(
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
            +service.id,
            hospital.id
        );

        setBooking(booking);
    };

    useEffect(() => {
        getData();
    }, [date, service, hospital]);

    return (
        <View className="h-full py-2 px-1 bg-white">
            <ScrollView>
                <View className="flex-row justify-center flex-wrap">
                    <DatePicker
                        startValue={new Date()}
                        onChange={(date) => {
                            setDate(date);
                        }}
                        pickerBtnStyle="w-[45vw] mr-2"
                    />
                    <DropDown
                        data={services}
                        onChange={(item) => {
                            setService(item);
                        }}
                        initialValue={initialServiceType}
                        dropDownBtnStyle="w-[45vw]"
                        dropDownStyle="min-w-[45vw]"
                    />
                </View>
                {booking ? (
                    <View className="items-center justify-center mt-4 flex-1">
                        <ActionDataList
                            title={`Цаг захиалга /${date}/`}
                            data={booking}
                            role={user.role}
                        />
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}
