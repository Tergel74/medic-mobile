import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import Camera from "./Camera";

type CustomCameraBtnProps = {
    bookingId: string;
    iconColor: string;
    btnStyle?: string;
    iconSize: number;
    onPress: any;
};

export default function CustomCameraBtn({
    bookingId,
    iconColor,
    btnStyle,
    iconSize,
    onPress,
}: CustomCameraBtnProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-14 h-14 border-2 border-primary justify-center items-center rounded-md ${btnStyle}`}
        >
            <Entypo name="camera" size={iconSize} color={iconColor} />
        </TouchableOpacity>
    );
}
