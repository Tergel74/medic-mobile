import { View, Text, Modal } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomModal({ isVisible, children, onClose }) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View className="h-[30%] bg-white w-full rounded-t-3xl items-center absolute bottom-0">
                <View className="h-[25%] w-full p-4 flex-row items-center justify-between">
                    <Text className="text-lg">Зураг сонгох</Text>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons
                            name="close"
                            color="forestgreen"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
                <View className="w-[94%] h-[1px] bg-primary"></View>
                <View className="h-full w-full">{children}</View>
            </View>
        </Modal>
    );
}
