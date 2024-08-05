import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
    id: string;
    name: string;
};

interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    dropDownBtnStyle?: string;
    dropDownStyle?: string;
    initialValue: OptionItem;
}

export default function DropDown({
    data,
    onChange,
    dropDownBtnStyle,
    dropDownStyle,
    initialValue,
}: DropDownProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(
        () => setExpanded(!expanded),
        [expanded]
    );

    const [value, setValue] = useState(initialValue.name);

    const buttonRef = useRef<View>(null);

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item.name);
        setExpanded(false);
    }, []);
    return (
        <View
            ref={buttonRef}
            onLayout={(event) => {
                // const layout = event.nativeEvent.layout;
                // const topOffset = layout.y;
                // const leftOffset = layout.x;
                // const heightOfComponent = layout.height;

                // const finalTop =
                //     topOffset +
                //     heightOfComponent +
                //     (Platform.OS === "android" ? -32 : 3);

                // setTop(finalTop);
                // setLeft(leftOffset);
                event.currentTarget.measureInWindow((x, y, width, height) => {
                    const finalTop =
                        y + height + (Platform.OS === "android" ? 0 : 3);

                    setTop(finalTop);
                    setLeft(x);
                });
            }}
        >
            <TouchableOpacity
                className={`justify-between bg-white flex-row w-[40vw] items-center p-3 rounded-lg h-12 border ${dropDownBtnStyle} ${
                    expanded ? "border-primary" : "border-gray-100"
                }`}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <View className="w-[80%]">
                    <Text className="text-base">{value}</Text>
                </View>

                <AntDesign name={expanded ? "up" : "down"} />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback
                        onPress={() => setExpanded(false)}
                    >
                        <View className="flex-1 justify-center items-center">
                            <View
                                style={[
                                    {
                                        top,
                                        left,
                                    },
                                ]}
                                className={`absolute bg-white max-w-[40vw] p-2 rounded-lg max-h-[250px] ${dropDownStyle}`}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            className={`justify-center px-2 rounded-sm h-6 ${
                                                item.name === value &&
                                                "bg-primary"
                                            }`}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text
                                                className={`${
                                                    item.name === value &&
                                                    "text-white"
                                                }`}
                                            >
                                                {item.name}
                                            </Text>
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
            ) : null}
        </View>
    );
}
