import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SimpleLineIcons } from "@expo/vector-icons";

type SortableTableProps = {
    containerStyle?: string;
    data: any;
    title: string;
    headers: any[];
    keys: any;
};

export default function SortableTable({
    containerStyle,
    data,
    title,
    headers,
    keys,
}: SortableTableProps) {
    const [tableData, setTableData] = useState(null);
    const [sortedField, setSortedField] = useState({
        key: "",
        keyText: "",
    });

    const sortTable = (key, asc: boolean) => {
        setSortedField({ ...sortedField, key: keys[key], keyText: key });
        var sortedData = asc
            ? tableData.sort((a, b) => a[keys[key]] - b[keys[key]])
            : tableData.sort((a, b) => b[keys[key]] - a[keys[key]]);

        setTableData(sortedData);
    };

    useEffect(() => {
        setTableData(data);
    }, [data]);

    return (
        <View
            className={`justify-center items-center rounded-lg border border-gray-100 w-[94vw] bg-white p-5 ${containerStyle}`}
        >
            {data.length ? (
                <View className="">
                    <Text className="text-base font-semibold mb-4 ml-4">
                        {title}
                    </Text>
                    <ScrollView horizontal>
                        <FlatList
                            data={tableData}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                            className="border border-gray-100"
                            ListHeaderComponent={() => (
                                <View>
                                    <FlatList
                                        horizontal
                                        scrollEnabled={false}
                                        data={headers}
                                        className="mx-3"
                                        renderItem={({ item }) => {
                                            return (
                                                <View
                                                    className={`w-24 p-3 mx-1 justify-center items-center flex-row space-x-2 ${
                                                        sortedField.keyText ==
                                                        item
                                                            ? "bg-gray-100"
                                                            : ""
                                                    }`}
                                                >
                                                    <Text className="font-bold">
                                                        {item}
                                                    </Text>
                                                    {item != "Нэр" ? (
                                                        <View>
                                                            <AntDesign
                                                                name="caretup"
                                                                size={10}
                                                                color="black"
                                                                onPress={() => {
                                                                    sortTable(
                                                                        item,
                                                                        true
                                                                    );
                                                                }}
                                                            />
                                                            <AntDesign
                                                                name="caretdown"
                                                                size={10}
                                                                color="black"
                                                                onPress={() => {
                                                                    sortTable(
                                                                        item,
                                                                        false
                                                                    );
                                                                }}
                                                            />
                                                        </View>
                                                    ) : null}
                                                </View>
                                            );
                                        }}
                                    />
                                    <View className="w-full h-[2px] bg-primary"></View>
                                </View>
                            )}
                            renderItem={({ item }) => {
                                return (
                                    <View className="h-12 flex-row items-center">
                                        <View className="w-24 justify-center h-[100%] mx-2 pl-1">
                                            <Text>{item.firstname}</Text>
                                        </View>
                                        <View
                                            className={`w-24 justify-center h-[100%] mx-2 items-center ${
                                                sortedField.key == "cnt"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <Text>{item.cnt || 0}</Text>
                                        </View>
                                        <View
                                            className={`w-24 justify-center h-[100%] items-center ${
                                                sortedField.key == "avgHour"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <Text>{item.avgHour || 0}</Text>
                                        </View>
                                        <View
                                            className={`w-24 justify-center h-[100%] mx-2 items-center ${
                                                sortedField.key == "cnt72"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <Text>{item.cnt72 || 0}</Text>
                                        </View>
                                        <View
                                            className={`w-24 justify-center h-[100%] items-center ${
                                                sortedField.key == "cntUrgent"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <Text>{item.cntUrgent || 0}</Text>
                                        </View>
                                        <View
                                            className={`w-24 justify-center h-[100%] mx-2 items-center ${
                                                sortedField.key == "urgentAvg"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <Text>{item.urgentAvg || 0}</Text>
                                        </View>
                                        <View
                                            className={`w-24 justify-center h-[100%] items-center ${
                                                sortedField.key == "cntUrgent36"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <Text>{item.cntUrgent36 || 0}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </ScrollView>
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
