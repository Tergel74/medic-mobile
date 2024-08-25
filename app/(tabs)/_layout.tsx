import { View, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { useGlobalContext } from "@/context/GlobalProvider";
import { setStorageItem } from "@/lib/storage";
import { router, SplashScreen } from "expo-router";
import { getHospitals, getServiceType } from "@/api/repositories/repository";
import Carousel from "react-native-reanimated-carousel";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

SplashScreen.preventAutoHideAsync();

export default function TabsLayout() {
    const {
        user,
        setUser,
        setIsLoggedIn,
        setHospitals,
        setHospital,
        setServiceTypes,
        hospitals,
        hospital,
    } = useGlobalContext();
    const [appIsReady, setAppIsReady] = useState(false);
    const userData = JSON.parse(user);

    useEffect(() => {
        async function prepare() {
            try {
                await getHospitals()
                    .then((res) => {
                        setHospitals(res);
                        for (var h of res) {
                            if (h.id == userData.hospitalId) {
                                setHospital(h);
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                await getServiceType()
                    .then((res) => {
                        setServiceTypes(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (err) {
                console.log(err);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    const signOut = async () => {
        await setStorageItem("token");
        await setStorageItem("userInfo");

        setUser(null);
        setIsLoggedIn(false);
        router.replace("/sign-in");
    };

    return (
        <GestureHandlerRootView onLayout={onLayoutRootView}>
            <Drawer
                screenOptions={{
                    // headerShown: false,
                    headerTintColor: "#097947",
                    headerTitleStyle: {
                        color: "#000000",
                    },
                    drawerHideStatusBarOnOpen: true,
                    drawerLabelStyle: {
                        marginLeft: -20,
                    },
                    headerStatusBarHeight: 50,
                    // headerTitle: hospital.name,
                    headerTitle: (props) => (
                        <View className="w-[60vw] h-full relative items-center">
                            <MaterialIcons
                                name="arrow-back-ios-new"
                                size={12}
                                color="black"
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "36%",
                                }}
                            />
                            <Carousel
                                loop
                                width={200}
                                height={30}
                                data={hospitals}
                                scrollAnimationDuration={1000}
                                defaultIndex={hospital.id - 1}
                                onSnapToItem={(index) =>
                                    setHospital(hospitals[index])
                                }
                                renderItem={({ index }) => (
                                    <View className="justify-center items-center flex-1">
                                        <Text className="font-semibold text-lg">
                                            {hospitals[index].name}
                                        </Text>
                                    </View>
                                )}
                                style={{
                                    height: "100%",
                                    width: 200,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            />
                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={12}
                                color="black"
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: "36%",
                                }}
                            />
                        </View>
                    ),
                }}
                drawerContent={(props) =>
                    CustomDrawerContent({ props, signOut, userData })
                }
            >
                <Drawer.Screen
                    key={"dashboard"}
                    name="dashboard"
                    options={{
                        drawerLabel: "Хянах самбар",
                        title: "Хянах самбар",
                        drawerIcon: (props: {
                            color: string;
                            size: number;
                        }) => (
                            <AntDesign
                                name="dashboard"
                                size={props.size}
                                color={props.color}
                            />
                        ),
                        drawerActiveBackgroundColor: "#84bca3",
                        drawerActiveTintColor: "#097947",
                    }}
                />
                <Drawer.Screen
                    key={"analysis"}
                    name="analysis"
                    options={{
                        drawerLabel: "Шинжилгээ",
                        title: "Шинжилгээ",
                        drawerIcon: (props: {
                            color: string;
                            size: number;
                        }) => (
                            <Ionicons
                                name="analytics"
                                size={props.size}
                                color={props.color}
                            />
                        ),
                        drawerActiveBackgroundColor: "#84bca3",
                        drawerActiveTintColor: "#097947",
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
