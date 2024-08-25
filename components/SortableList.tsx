import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type SortableListProps = {
    containerStyle?: string;
    data: any;
    title: string;
    headers: any[];
    miniHeaders: any[];
    keys: any;
};

export default function SortableList({
    data,
    title,
    containerStyle,
    headers,
    miniHeaders,
    keys,
}: SortableListProps) {
    const [listData, setListData] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);

    const toggleExpanded = (index) => {
        setExpandedIds(
            expandedIds.includes(index)
                ? expandedIds.filter((id) => id !== index)
                : [...expandedIds, index]
        );
    };

    // sorting mechanic

    useEffect(() => {
        setListData(data);
    }, [data]);

    return (
        <View
            className={`justify-center items-center mx-2 p-2 ${containerStyle}`}
        >
            {data.length ? (
                <View className="w-full">
                    <View className="flex-row justify-between items-center flex-wrap w-full mb-4 ml-1">
                        <Text className="text-base text-center font-semibold mb-4">
                            {title}
                        </Text>
                        <TouchableOpacity className="mr-1" onPress={() => {}}>
                            <FontAwesome
                                name="sort"
                                size={24}
                                color="forestgreen"
                            />
                        </TouchableOpacity>
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
                                            <View className="bg-white-100 h-56 mb-2 rounded-lg py-2">
                                                <View className="h-[20%] flex-row items-center ">
                                                    <Text className="px-4 text-base">
                                                        {item.firstname}
                                                    </Text>
                                                </View>
                                                <View className="w-full items-center">
                                                    <View className="h-[2px] w-[92%] bg-primary"></View>
                                                </View>
                                                <View className="h-[80%] px-4 space-y-2.5 justify-center">
                                                    {headers.map(
                                                        (name, index) => {
                                                            return (
                                                                <View
                                                                    key={name}
                                                                    className="flex-row justify-between"
                                                                >
                                                                    <Text className="">
                                                                        {name}
                                                                    </Text>
                                                                    <Text className="font-semibold">
                                                                        {item[
                                                                            keys[
                                                                                index
                                                                            ]
                                                                        ] !=
                                                                        null
                                                                            ? item[
                                                                                  keys[
                                                                                      index
                                                                                  ]
                                                                              ]
                                                                            : 0}
                                                                    </Text>
                                                                </View>
                                                            );
                                                        }
                                                    )}
                                                </View>
                                            </View>
                                        ) : (
                                            <View className="bg-white-100 h-14 flex-row items-center justify-center mb-2 rounded-lg">
                                                <View className="w-[40%] px-4">
                                                    <Text className="text-base">
                                                        {item.firstname}
                                                    </Text>
                                                </View>
                                                <View className="w-[60%] flex-row justify-center items-center space-x-6 p-2">
                                                    {miniHeaders.map(
                                                        (name, index) => {
                                                            return (
                                                                <View
                                                                    key={name}
                                                                    className="items-center space-y-1"
                                                                >
                                                                    <Text className="text-xs">
                                                                        {name}
                                                                    </Text>
                                                                    <Text className="font-semibold">
                                                                        {item[
                                                                            keys[
                                                                                index
                                                                            ]
                                                                        ] !=
                                                                        null
                                                                            ? item[
                                                                                  keys[
                                                                                      index
                                                                                  ]
                                                                              ]
                                                                            : 0}
                                                                    </Text>
                                                                </View>
                                                            );
                                                        }
                                                    )}
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
        </View>
    );
}
