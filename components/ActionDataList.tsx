import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
    SimpleLineIcons,
    Entypo,
    AntDesign,
    FontAwesome,
} from "@expo/vector-icons";

type ActionDataListProps = {
    containerStyle?: string;
    title: string;
    data: any;
    role: string;
};

export default function ActionDataList({
    containerStyle,
    title,
    data,
    role,
}: ActionDataListProps) {
    const [listData, setListData] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);

    const toggleExpanded = (index) => {
        setExpandedIds(
            expandedIds.includes(index)
                ? expandedIds.filter((id) => id !== index)
                : [...expandedIds, index]
        );
    };

    useEffect(() => {
        setListData(data.rows);
    }, [data]);

    return (
        <View
            className={`justify-center items-center mx-2 w-[92vw] ${containerStyle}`}
        >
            {data.count != 0 ? (
                <View className="w-full">
                    <View className="p-2 flex-row justify-start">
                        <Text className="text-base font-semibold">{title}</Text>
                        {/* back iin response yanzlah */}
                        {/* <View>
                            <Text>
                                Яаралтай:{" "}
                                {item.}
                            </Text>
                        </View> */}
                    </View>
                    <FlatList
                        data={listData}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => toggleExpanded(index)}
                                    >
                                        {expandedIds.includes(index) ? (
                                            <View className="bg-white-100 h-56 flex-row items-center mb-2 space-x-2 rounded-lg">
                                                <View className="w-[16%] h-full flex-row items-center mr-1">
                                                    <View className="ml-2">
                                                        <Text className="text-base">
                                                            {item.id}
                                                        </Text>
                                                    </View>
                                                    <View className="h-[90%] w-[1px] bg-primary mx-2"></View>
                                                </View>
                                                <View className="w-[100%] h-full py-2 pr-1">
                                                    <View className="flex-row h-20 w-[80%] items-center relative">
                                                        <View className="w-[60%] h-[60%] justify-center space-y-3 p-2">
                                                            <View className="justify-center">
                                                                <View className="flex-row space-x-3 items-center">
                                                                    <Text className="text-lg font-semibold">
                                                                        {
                                                                            item.customerFirstname
                                                                        }
                                                                    </Text>
                                                                    <Text>
                                                                        {
                                                                            item.age
                                                                        }{" "}
                                                                        Нас
                                                                    </Text>
                                                                </View>
                                                                <View className="">
                                                                    <Text>
                                                                        {
                                                                            item.serviceNames
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View className="flex-row space-x-10">
                                                                <View>
                                                                    <Text>
                                                                        {
                                                                            item.device
                                                                        }
                                                                    </Text>
                                                                </View>
                                                                <View>
                                                                    <Text>
                                                                        {item.currentDateTime.slice(
                                                                            0,
                                                                            -3
                                                                        )}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View className="absolute right-1 justify-center items-center p-2">
                                                            <TouchableOpacity>
                                                                <Entypo
                                                                    name="camera"
                                                                    size={24}
                                                                    color="forestgreen"
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View className="bg-primary w-[78%] h-[1px] my-2"></View>
                                                    <View className="w-[80%] px-2">
                                                        <View className="flex-row relative items-center">
                                                            <View className="w-[85%]">
                                                                <Text className="text-sm">
                                                                    {
                                                                        item.painful
                                                                    }
                                                                </Text>

                                                                <View className="mt-1">
                                                                    {item.descr ? (
                                                                        <Text>
                                                                            Тайлбар:
                                                                            {
                                                                                item.descr
                                                                            }
                                                                        </Text>
                                                                    ) : null}
                                                                    {role ==
                                                                    "Техникч" ? (
                                                                        <View className="flex-row items-center">
                                                                            <Text>
                                                                                Эмч:{" "}
                                                                            </Text>
                                                                            <View className="rounded-lg justify-center bg-primary-100 h-6 px-1">
                                                                                <Text>
                                                                                    {
                                                                                        item.doctor
                                                                                    }
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    ) : role ==
                                                                      "Эмч" ? (
                                                                        <View className="">
                                                                            <Text>
                                                                                Техникч:{" "}
                                                                                {
                                                                                    item.technicalUser
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                    ) : (
                                                                        <View className="flex-row items-center flex-wrap">
                                                                            <View className="flex-row items-center mr-2">
                                                                                <Text>
                                                                                    Эмч:{" "}
                                                                                </Text>
                                                                                <View className="rounded-lg justify-center bg-primary-100 h-6 px-1">
                                                                                    <Text>
                                                                                        {
                                                                                            item.doctor
                                                                                        }
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                            <View className="flex-row items-center mt-2">
                                                                                <Text>
                                                                                    Техникч:{" "}
                                                                                </Text>
                                                                                <View className="rounded-lg justify-center bg-secondary-100 h-6 px-1">
                                                                                    <Text>
                                                                                        {
                                                                                            item.technicalUser
                                                                                        }
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    )}
                                                                    <View className=""></View>
                                                                </View>
                                                            </View>
                                                            <View className="justify-center items-center h-full absolute right-1">
                                                                <View className="-translate-y-3">
                                                                    {item.isReceived ? (
                                                                        <View className="items-center space-y-2">
                                                                            <AntDesign
                                                                                name="checkcircle"
                                                                                size={
                                                                                    24
                                                                                }
                                                                                color="forestgreen"
                                                                            />
                                                                            <Text>
                                                                                {
                                                                                    item.docHour
                                                                                }{" "}
                                                                                цаг
                                                                            </Text>
                                                                        </View>
                                                                    ) : (
                                                                        <AntDesign
                                                                            name="closecircle"
                                                                            size={
                                                                                24
                                                                            }
                                                                            color="forestgreen"
                                                                        />
                                                                    )}
                                                                </View>
                                                                <View className="flex-row absolute bottom-0 space-x-1">
                                                                    <TouchableOpacity className="p-1 bg-gray-400 rounded-lg">
                                                                        <FontAwesome
                                                                            name="trash"
                                                                            size={
                                                                                18
                                                                            }
                                                                            color="white"
                                                                        />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity className="p-1 bg-gray-400 rounded-lg">
                                                                        <FontAwesome
                                                                            name="pencil"
                                                                            size={
                                                                                18
                                                                            }
                                                                            color="white"
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ) : (
                                            <View className="bg-white-100 h-20 flex-row items-center mb-2 space-x-2 rounded-lg">
                                                <View className="w-[16%] h-full flex-row items-center mr-1">
                                                    <View className="ml-2">
                                                        <Text className="text-base">
                                                            {item.id}
                                                        </Text>
                                                    </View>
                                                    <View className="h-[80%] w-[1px] bg-primary mx-2"></View>
                                                </View>
                                                <View className="w-[60%] h-[60%] justify-center space-y-3 p-2">
                                                    <View className="justify-center">
                                                        <View className="flex-row space-x-3 items-center">
                                                            <Text className="text-lg font-semibold">
                                                                {
                                                                    item.customerFirstname
                                                                }
                                                            </Text>
                                                            <Text>
                                                                {item.age} Нас
                                                            </Text>
                                                        </View>
                                                        <View className="">
                                                            <Text>
                                                                {
                                                                    item.serviceNames
                                                                }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View className="flex-row space-x-10">
                                                        <View>
                                                            <Text>
                                                                {item.device}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text>
                                                                {item.currentDateTime.slice(
                                                                    0,
                                                                    -3
                                                                )}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View className="absolute right-1 justify-center items-center p-2">
                                                    <TouchableOpacity>
                                                        <Entypo
                                                            name="camera"
                                                            size={24}
                                                            color="forestgreen"
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
            ) : (
                <View className="justify-center items-center space-y-2">
                    <SimpleLineIcons name="drawer" size={60} color="gray" />
                    <Text className="text-gray-500 text-base">
                        Мэдээлэл байхгүй байна
                    </Text>
                </View>
            )}

            <View></View>
        </View>
    );
}
