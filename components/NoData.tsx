import { View, Text } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function NoData() {
    return (
        <View className="justify-center items-center space-y-2">
            <SimpleLineIcons name="drawer" size={60} color="gray" />
            <Text className="text-gray-500 text-base">
                Мэдээлэл байхгүй байна
            </Text>
        </View>
    );
}
