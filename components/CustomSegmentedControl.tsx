import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

type CustomSegmentedControlProps = {
    options: string[];
    selectedOption: string;
    onOptionPress?: (option: string) => void;
    containerStyle?: string;
};

const CustomSegmentedControl: React.FC<CustomSegmentedControlProps> =
    React.memo(({ options, selectedOption, onOptionPress, containerStyle }) => {
        const { width: windowWidth } = useWindowDimensions();

        const internalPadding = 20;
        const segmentedControlWidth = windowWidth - 60;

        const itemWidth =
            (segmentedControlWidth - internalPadding) / options.length;

        const rStyle = useAnimatedStyle(() => {
            return {
                left: withTiming(
                    itemWidth * options.indexOf(selectedOption) +
                        internalPadding / 2
                ),
            };
        }, [selectedOption, options, itemWidth]);

        return (
            <View
                className={`flex-row h-10 mt-2 bg-white border border-gray-100 rounded-xl ${containerStyle}`}
            >
                <Animated.View
                    style={[
                        {
                            width: itemWidth,
                        },
                        rStyle,
                        styles.activeBox,
                    ]}
                    // className="absolute rounded-lg h-[80%] top-[10%]"
                />
                {options.map((option, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onOptionPress?.(option);
                            }}
                            key={index}
                            style={[
                                {
                                    width: itemWidth,
                                },
                                styles.labelContainer,
                            ]}
                        >
                            <Text style={styles.label}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    });

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 55,
        backgroundColor: "gray",
    },
    activeBox: {
        position: "absolute",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        elevation: 3,
        height: "80%",
        top: "10%",
        backgroundColor: "forestgreen",
    },
    labelContainer: { justifyContent: "center", alignItems: "center" },
    label: {
        fontFamily: "SF-Compact-Rounded-Medium",
        fontSize: 16,
    },
});

export { CustomSegmentedControl };
