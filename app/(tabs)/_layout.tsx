import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function TabsLayout() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
    );
}
