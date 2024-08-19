import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from "@expo/vector-icons";

type DatePickerProps = {
    startValue: Date;
    onChange: (date: string) => void;
    pickerBtnStyle?: string;
};

export default function DatePicker({
    startValue,
    onChange,
    pickerBtnStyle,
}: DatePickerProps) {
    const [date, setDate] = useState(startValue);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        onChange(date.toISOString().split("T")[0]);
        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity
                className={`justify-between bg-white flex-row w-[40vw] items-center p-3 rounded-lg h-12 border ${
                    isDatePickerVisible ? "border-primary" : "border-gray-100"
                } ${pickerBtnStyle}`}
                activeOpacity={0.8}
                onPress={showDatePicker}
            >
                <View className="w-[80%]">
                    <Text className="text-base">
                        {date.toISOString().split("T")[0]}
                    </Text>
                </View>

                <Fontisto name="date" />
            </TouchableOpacity>
            <DateTimePickerModal
                date={date}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                timePickerModeAndroid="default"
                buttonTextColorIOS="forestgreen"
            />
        </View>
    );
}
