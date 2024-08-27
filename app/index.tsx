import { Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, router, SplashScreen } from "expo-router";
import CustomButton from "@/components/CustomButton";

export default function Index() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) {
        return <Redirect href="/dashboard" />;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <SafeAreaView className="h-full bg-white justify-center items-center px-4">
            <Image
                source={images.logo}
                className="w-28 h-28"
                resizeMode="contain"
            />
            <CustomButton
                title="Нэвтрэх"
                containerStyles="mt-10 w-[50%] bg-primary rounded-full"
                handlePress={() => router.push("/sign-in")}
                textStyles="text-white"
            />
        </SafeAreaView>
    );
}
