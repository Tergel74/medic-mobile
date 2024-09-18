import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center">
                <Text className="text-center pb-2">
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    return (
        <View className="flex-1 justify-center">
            <TouchableOpacity className=""></TouchableOpacity>
            <CameraView className="flex-1" facing={facing}>
                <View className="flex-1 flex-row bg-transparent m-4">
                    <TouchableOpacity
                        className="flex-1 self-center items-center"
                        onPress={toggleCameraFacing}
                    >
                        <Text className="font-bold text-white text-24">
                            Flip Camera
                        </Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}
