import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { setStorageItem } from "@/lib/storage";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

export default function home() {
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const signOut = async () => {
        await setStorageItem("token");
        await setStorageItem("userInfo");

        setUser(null);
        setIsLoggedIn(false);
        router.replace("/sign-in");
    };
    return (
        <SafeAreaView className="h-full justify-center items-center px-4">
            <CustomButton
                title="Гарах"
                containerStyles="w-full"
                handlePress={() => signOut()}
            />
        </SafeAreaView>
    );
}
