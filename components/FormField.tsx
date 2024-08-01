import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type FormFieldProps = {
    title?: string;
    value: string;
    placeHolder?: string;
    handleChangeText: any;
    formStyles: string;
    keyboardType?: string;
};

const FormField = ({
    title,
    value,
    placeHolder,
    handleChangeText,
    formStyles,
    keyboardType,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${formStyles}`}>
            {title && <Text className="text-base">{title}</Text>}

            <View className="border-2 border-gray-400 w-full h-16 px-4 rounded-lg focus:border-primary items-center flex-row">
                <TextInput
                    className="flex-1 text-base"
                    value={value}
                    placeholder={placeHolder}
                    placeholderTextColor="#808080"
                    onChangeText={handleChangeText}
                    secureTextEntry={
                        keyboardType === "password" && !showPassword
                    }
                />

                {keyboardType === "password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <Ionicons
                                name="eye-outline"
                                color="grey"
                                size={20}
                            />
                        ) : (
                            <Ionicons
                                name="eye-off-outline"
                                color="grey"
                                size={20}
                            />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
