import { View, Text } from "react-native";
import React from "react";

type DataViewProps = {
    title: string;
    data: number;
    containerStyle?: string;
};

export default function DataView({
    title,
    data,
    containerStyle,
}: DataViewProps) {
    return (
        <View
            className={`bg-white w-[45%] mt-4 h-[12vh] border border-gray-100 rounded-lg p-4 justify-center ${containerStyle}`}
        >
            <Text className="text-base">{title}</Text>
            <Text className="text-2xl font-bold mt-1">
                {data != null ? data : 0}
            </Text>
        </View>
    );
}
