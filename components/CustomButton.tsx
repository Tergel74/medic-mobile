import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

type CustomButtonProps = {
    title: string;
    handlePress: any;
    containerStyles: string;
    textStyles?: string;
    isLoading?: boolean;
};

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            }`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
