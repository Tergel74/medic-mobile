import { View, Text } from "react-native";
import React from "react";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";

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
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View className="mx-3 py-2 px-8 flex-row justify-start items-center border border-gray-400 rounded-full my-2 space-x-2">
                <AntDesign name="user" size={30} color="black" />
                <View className="flex-col ">
                    <Text className="text-lg font-semibold">{`${userData.lastname[0]}.${userData.firstname}`}</Text>
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
