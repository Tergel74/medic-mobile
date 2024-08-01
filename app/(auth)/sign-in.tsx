import { View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Redirect, router } from "expo-router";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/api/repositories/auth.repository";
import { setStorageItem } from "@/lib/storage";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function SignIn() {
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Error", "Please fill in all the fields");
        } else {
            setIsSubmitting(true);

            try {
                const user = await signIn(form.email, form.password);

                await setStorageItem("token", user.token);
                await setStorageItem("userInfo", JSON.stringify(user.profile));

                setUser(user.profile);
                setIsLoggedIn(true);
                router.replace("/home");
            } catch (error: any) {
                Alert.alert("Error", error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full flex-col items-center">
            <View className="h-[25vh] justify-center">
                <Image
                    source={images.logo}
                    className="w-28 h-28"
                    resizeMode="contain"
                />
            </View>
            <View className="h-[100%] w-full bg-white rounded-[60px] items-center px-4">
                <FormField
                    value={form.email}
                    handleChangeText={(e: string) =>
                        setForm({ ...form, email: e })
                    }
                    placeHolder="Нэвтрэх нэр"
                    formStyles="mt-28"
                />
                <FormField
                    value={form.password}
                    handleChangeText={(e: string) =>
                        setForm({ ...form, password: e })
                    }
                    placeHolder="Нууц үг"
                    formStyles="mt-7"
                    keyboardType="password"
                />
                <CustomButton
                    title="Нэвтрэх"
                    containerStyles="w-full mt-7"
                    handlePress={submit}
                    isLoading={isSubmitting}
                />
            </View>
        </SafeAreaView>
    );
}
