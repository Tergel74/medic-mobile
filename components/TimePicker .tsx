import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

interface TimePickerProps {
    date: Date;
    onChange: (hour: number, minute: number) => void;
    timePickerBtnStyle?: string;
    timePickerSTyle?: string;
}

export default function TimePicker({
    date,
    onChange,
    timePickerBtnStyle,
    timePickerSTyle,
}: TimePickerProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(
        () => setExpanded(!expanded),
        [expanded]
    );

    const [hour, setHour] = useState(date.getHours().toString());
    const [availableHours, setAvailableHours] = useState([]);
    const [minute, setMinute] = useState(date.getMinutes().toString());
    const [availableMinutes, setAvailableMinutes] = useState([]);

    const buttonRef = useRef<TouchableOpacity>(null);

    const [top, setTop] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);

    const currentTime = () => {
        let h = date.getHours();
        setHour(h.toString().length == 1 ? `0${h}` : h.toString());
        let m = date.getMinutes();
        setMinute(
            m.toString().length == 1 ? `0${m}` : (m - (m % 10) + 10).toString()
        );
    };

    const onSelect = () => {
        onChange(+hour, +minute);

        setExpanded(false);
    };

    useEffect(() => {
        const hours = [];
        const minutes = [];
        for (let h = 0; h < 24; h++)
            hours.push(`${h.toString().length == 1 ? "0" : ""}${h.toString()}`);
        setAvailableHours(hours);
        for (let m = 0; m <= 50; m += 10)
            minutes.push(
                `${m.toString()}${m.toString().length == 1 ? "0" : ""}`
            );
        setAvailableMinutes(minutes);
    }, [date]);

    return (
        <View>
            <TouchableOpacity
                ref={buttonRef}
                className={`justify-between bg-white flex-row w-[40vw] items-center px-3 rounded-lg h-10 border shadow-sm ${timePickerBtnStyle} ${
                    expanded ? "border-primary" : "border-gray-100"
                }`}
                activeOpacity={0.8}
                onPress={() => {
                    buttonRef.current.measureInWindow((x, y, width, height) => {
                        const finalTop =
                            y + height + (Platform.OS === "android" ? 0 : 3);

                        setTop(finalTop);

                        setLeft(x);
                    });
                    toggleExpanded();
                }}
            >
                <View className="w-[80%]">
                    <Text className="text-base">{`${hour}:${minute}`}</Text>
                </View>

                <AntDesign name={expanded ? "up" : "down"} size={14} />
            </TouchableOpacity>
            {expanded &&
            availableHours.length > 0 &&
            availableMinutes.length > 0 ? (
                <Modal visible={expanded} animationType="fade" transparent>
                    <TouchableWithoutFeedback
                        onPress={() => setExpanded(false)}
                    >
                        <View className="flex-1 justify-center items-center">
                            <View
                                style={[
                                    {
                                        top,
                                        left,
                                    },
                                ]}
                                className={`absolute bg-white max-w-[45vw] h-44 p-2 rounded-lg max-h-[250px] border border-gray-100 ${timePickerSTyle}`}
                            >
                                <View className="flex-row">
                                    <FlatList
                                        keyExtractor={(item) => item}
                                        className="h-32"
                                        data={availableHours}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                className={`justify-center px-2 min-w-full rounded-sm h-6 items-center ${
                                                    item === hour &&
                                                    "bg-primary"
                                                }`}
                                                onPress={() => setHour(item)}
                                            >
                                                <Text
                                                    className={`${
                                                        item === hour &&
                                                        "text-white"
                                                    }`}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        ItemSeparatorComponent={() => (
                                            <View className="h-1" />
                                        )}
                                    />
                                    <View className="w-[1px] h-[90%] bg-primary"></View>
                                    <FlatList
                                        keyExtractor={(item) => item}
                                        className="h-32 bg-red-100"
                                        data={availableMinutes}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                className={`justify-center px-2 min-w-full rounded-sm h-6 items-center ${
                                                    item === minute &&
                                                    "bg-primary"
                                                }`}
                                                onPress={() => setMinute(item)}
                                            >
                                                <Text
                                                    className={`${
                                                        item === minute &&
                                                        "text-white"
                                                    }`}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        ItemSeparatorComponent={() => (
                                            <View className="h-1" />
                                        )}
                                    />
                                </View>
                                <View className="flex-row w-full items-center justify-center h-8 rounded-sm active:bg-gray-300">
                                    <TouchableOpacity
                                        onPress={currentTime}
                                        className="justify-center items-center w-[50%] h-5"
                                    >
                                        <Text>Одоо</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={onSelect}
                                        className="bg-primary justify-center items-center w-[50%] h-5 rounded-sm"
                                    >
                                        <Text className="text-white">ОК</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}
