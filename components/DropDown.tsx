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

    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item.name);
        setExpanded(false);
    }, []);
    return (
        <View
            ref={buttonRef}
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const topOffset = layout.y;
                const heightOfComponent = layout.height;

                const finalValue =
                    topOffset +
                    heightOfComponent +
                    (Platform.OS === "android" ? -32 : 3);

                setTop(finalValue);
            }}
        >
            <TouchableOpacity
                className={`justify-between bg-white flex-row w-[40vw] items-center p-3 rounded-lg h-12 ${dropDownBtnStyle}`}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <View className="w-[80%]">
                    <Text className="text-base">{value}</Text>
                </View>

                <AntDesign name={expanded ? "caretup" : "caretdown"} />
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
                                    },
                                ]}
                                className={`absolute bg-white w-[40vw] p-3 rounded-lg max-h-[250px] ${dropDownStyle}`}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            className="justify-center h-6"
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text>{item.name}</Text>
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
