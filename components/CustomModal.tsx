import { View, Text, Modal } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

type CustomModalProps = {
    isVisible: boolean;
    children: any;
    onClose: any;
    modalStyle?: string;
    title: string;
};

export default function CustomModal({
    isVisible,
    children,
    onClose,
    modalStyle,
    title,
}: CustomModalProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View
                className={`h-[28%] bg-white w-full rounded-t-3xl items-center absolute bottom-0 border border-t-2 border-primary ${modalStyle}`}
            >
                <View className="h-14 w-full p-4 flex-row items-center justify-between">
                    <Text className="text-base">{title}</Text>
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
