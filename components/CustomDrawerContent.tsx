import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants";

type CustomDrawerContentProps = {
    props: any;
    signOut: () => void;
    userData: any;
};

export default function CustomDrawerContent({
    props,
    signOut,
    userData,
}: CustomDrawerContentProps) {
    const { hospital } = useGlobalContext();

    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View className="justify-center items-center">
                <Image
                    source={
                        hospital.id === 1
                            ? images.med_trauma_logo
                            : images.brilliant_logo
                    }
                    className="w-24 h-24"
                    resizeMode="contain"
                />
            </View>
            <View className="mx-3 py-2 px-8 flex-row justify-start items-center border border-gray-400 rounded-full my-2 space-x-2">
                <AntDesign name="user" size={24} color="black" />
                <View className="flex-col ">
                    <Text className="text-base font-semibold">{`${userData.lastname[0]}.${userData.firstname}`}</Text>
                    <Text className="text-sm text-gray-500">
                        {userData.role}
                    </Text>
                </View>
            </View>

            <DrawerItemList {...props} />
            <DrawerItem
                label={"Гарах"}
                onPress={signOut}
                style={{ marginTop: 10 }}
            />
        </DrawerContentScrollView>
    );
}
