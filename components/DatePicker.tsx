import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    Platform,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

type DatePickerProps = {
    onChange: (date: string) => void;
    pickerBtnStyle?: string;
};

export default function DatePicker({
    onChange,
    pickerBtnStyle,
}: DatePickerProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(
        () => setExpanded(!expanded),
        [expanded]
    );

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    );

    const buttonRef = useRef<View>(null);

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        onChange(`${selectedYear.toString()}-0${selectedMonth.toString()}-01`);
        toggleExpanded();
    };

    const years = Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
    );

    return (
        <View
            ref={buttonRef}
            onLayout={(event) => {
                event.currentTarget.measureInWindow((x, y, width, height) => {
                    const finalTop =
                        y + height + (Platform.OS === "android" ? 0 : 3);

                    setTop(finalTop);
                    setLeft(x);
                });
            }}
        >
            <TouchableOpacity
                className={`justify-between bg-white flex-row w-[40vw] items-center p-3 rounded-lg h-12 border ${
                    expanded ? "border-primary" : "border-gray-100"
                } ${pickerBtnStyle}`}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <View className="w-[80%]">
                    <Text className="text-base">{`${selectedYear}-0${selectedMonth}`}</Text>
                </View>

                <Fontisto name="date" />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent className="relative">
                    <TouchableWithoutFeedback
                        onPress={() => setExpanded(false)}
                    >
                        <View className="flex-1 justify-center items-center">
                            <View
                                style={[
                                    {
                                        top: top,
                                        left,
                                    },
                                ]}
                                className={`absolute bg-white p-1 rounded-lg max-w-[64vw]`}
                            >
                                <View className="p-3 rounded-sm">
                                    <ScrollView horizontal>
                                        {years.map((year) => (
                                            <TouchableOpacity
                                                key={year}
                                                onPress={() =>
                                                    handleYearChange(year)
                                                }
                                                className="px-3 mb-2"
                                            >
                                                <Text
                                                    className={`text-base ${
                                                        year === selectedYear &&
                                                        "font-bold text-primary"
                                                    }`}
                                                >
                                                    {year}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                    <View className="flex-row flex-wrap justify-center">
                                        {months.map((month, index) => (
                                            <TouchableOpacity
                                                key={month}
                                                onPress={() =>
                                                    handleMonthChange(index + 1)
                                                }
                                                className="w-[25%] p-2 items-center"
                                            >
                                                <View
                                                    className={`border border-gray-100 w-12 h-8 rounded-md justify-center items-center ${
                                                        index + 1 ===
                                                            selectedMonth &&
                                                        "bg-primary"
                                                    }`}
                                                >
                                                    <Text
                                                        className={`text-base ${
                                                            index + 1 ===
                                                                selectedMonth &&
                                                            "text-white"
                                                        }`}
                                                    >
                                                        {month}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}
