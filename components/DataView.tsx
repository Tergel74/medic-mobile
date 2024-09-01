import { View, Text } from "react-native";
import React from "react";

type DataViewProps = {
    title: string;
    data: number;
    containerStyle?: string;
    icon: React.ReactNode;
};

export default function DataView({
    title,
    data,
    containerStyle,
    icon,
}: DataViewProps) {
    return (
        <View
            className={`bg-white w-[44%] h-[8vh] mb-3 rounded-lg p-4 justify-center items-center flex-row ${containerStyle}`}
        >
            <View className="w-12 h-12 bg-white rounded-lg items-center justify-center p-2 mr-3">
                {icon}
            </View>
            <View className="text-pretty w-20">
                <Text className="text-xs text-gray-500" style={{}}>
                    {title}
                </Text>
                <Text className="text-2xl">{data != null ? data : 0}</Text>
            </View>
        </View>
    );
}
