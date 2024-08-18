import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { LineChart } from "react-native-gifted-charts";
import { transform } from "@babel/core";

type CustomGraphProps = {
    data: any;
    title: string;
    containerStyle?: string;
};

export default function CustomGraph({
    data,
    title,
    containerStyle,
}: CustomGraphProps) {
    data.forEach((data) => {
        data.forEach((element) => {
            (element.dataPointText = element.value.toString()),
                (element.labelTextStyle = {
                    transform: [{ rotate: "-90deg" }, { translateX: -10 }],
                    fontSize: 10,
                }),
                (element.textShiftY = -10);
            element.type == "MRI"
                ? ((element.dataPointColor = "forestgreen"),
                  (element.textColor = "forestgreen"))
                : element.type == "CT"
                ? ((element.dataPointColor = "orange"),
                  (element.textColor = "orange"))
                : element.type == "PET/CT"
                ? ((element.dataPointColor = "dodgerblue"),
                  (element.textColor = "dodgerblue"))
                : ((element.dataPointColor = "peru"),
                  (element.textColor = "peru"));
        });
    });
    const [chartReady, setChartReady] = useState(false);
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        const prepare = async () => {
            try {
                setChartData(data);
            } catch (err) {
                console.log(err);
            }
        };

        prepare().finally(() => {
            setChartReady(true);
        });
    }, [data, chartData]);

    const { width } = Dimensions.get("window");
    const chartWidth = width - 120;
    const spacingWidth = chartWidth / 9;

    return (
        <View
            className={`justify-center items-center rounded-lg border border-gray-100 w-[94vw] h-[42vh] bg-white p-2 ${containerStyle}`}
        >
            {chartReady && chartData.length ? (
                <>
                    <Text className="text-base font-semibold mb-3">
                        {title}
                    </Text>
                    <View className="ml-3 w-full h-[76%]">
                        <LineChart
                            data={chartData[0]}
                            color1="forestgreen"
                            startFillColor1="forestgreen"
                            data2={chartData[1]}
                            color2="orange"
                            startFillColor2="orange"
                            data3={chartData[2]}
                            color3="dodgerblue"
                            startFillColor3="dodgerblue"
                            data4={chartData[3]}
                            color4="peru"
                            startFillColor4="peru"
                            // areaChart
                            width={chartWidth}
                            spacing={spacingWidth}
                            maxValue={120}
                            mostNegativeValue={0}
                            isAnimated
                        />
                    </View>
                    <View className="w-full h-[1px] bg-gray-400"></View>
                    <View className="flex-row items-center justify-start mt-2 w-[76%] h-4 space-x-3">
                        <View className="flex-row justify-center items-center space-x-1">
                            <View
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: "forestgreen" }}
                            ></View>
                            <Text>MRI</Text>
                        </View>
                        <View className="flex-row justify-center items-center space-x-1">
                            <View
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: "orange" }}
                            ></View>
                            <Text>CT</Text>
                        </View>
                        <View className="flex-row justify-center items-center space-x-1">
                            <View
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: "dodgerblue" }}
                            ></View>
                            <Text>PET/CT</Text>
                        </View>
                        <View className="flex-row justify-center items-center space-x-1">
                            <View
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: "peru" }}
                            ></View>
                            <Text>Рентген</Text>
                        </View>
                    </View>
                </>
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
