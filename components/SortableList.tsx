import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Platform,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import NoData from "./NoData";

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
    const [sortOpen, setSortOpen] = useState(false);

    const toggleSort = useCallback(() => setSortOpen(!sortOpen), [sortOpen]);

    const buttonRef = useRef<View>(null);
    const [top, setTop] = useState(0);
    const [right, setRight] = useState(0);
    const { width } = Dimensions.get("window");

    const toggleExpanded = (index) => {
        setExpandedIds(
            expandedIds.includes(index)
                ? expandedIds.filter((id) => id !== index)
                : [...expandedIds, index]
        );
    };

    // sorting mechanic
    const sortDataAsc = () => {};
    const sortDataDesc = () => {};

    const openSortModal = () => {};

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
                        <View
                            ref={buttonRef}
                            onLayout={(event) => {
                                event.currentTarget.measureInWindow(
                                    (x, y, w, h) => {
                                        const finalTop =
                                            y +
                                            h +
                                            (Platform.OS === "android" ? 0 : 3);

                                        setTop(finalTop);
                                        setRight(width - x - 20);
                                    }
                                );
                            }}
                        >
                            <TouchableOpacity
                                className="mr-1"
                                // onPress={toggleSort}
                            >
                                <FontAwesome
                                    name="sort"
                                    size={24}
                                    color="forestgreen"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* {sortOpen ? ( */}
                    <Modal
                        visible={sortOpen}
                        animationType="fade"
                        transparent
                        className="w-60 h-60 bg-primary"
                    >
                        <TouchableWithoutFeedback
                            onPress={() => setSortOpen(false)}
                        >
                            <View className="flex-1 justify-center items-center">
                                <View
                                    style={[{}]}
                                    className={`absolute bg-white max-w-[44vw] p-2 rounded-lg max-h-[250px] border border-gray-100`}
                                >
                                    <FlatList
                                        keyExtractor={(item) =>
                                            miniHeaders.indexOf(item).toString()
                                        }
                                        data={miniHeaders}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                className={`justify-center px-2 min-w-full rounded-sm h-6 `}
                                                onPress={() => {}}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        ItemSeparatorComponent={() => (
                                            <View className="h-1" />
                                        )}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    {/* ) : null} */}

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
                                                            return index < 3 ? (
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
                                                            ) : null;
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
                <NoData />
            )}
        </View>
    );
}
