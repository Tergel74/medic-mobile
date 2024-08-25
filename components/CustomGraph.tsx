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
    const chartWidth = width - 90;
    const spacingWidth = chartWidth / 9;
    const chartColors = ["forestgreen", "orange", "dodgerblue", "peru"];

    return (
        <View
            className={`justify-center items-center rounded-lg w-[90vw] h-[40vh] bg-white ${containerStyle}`}
            // className={`justify-center items-center rounded-lg border border-gray-100 w-[94vw] h-[42vh] bg-white p-2 ${containerStyle}`}
        >
            {chartReady && chartData.length ? (
                <>
                    <View className=" flex-row justify-between items-center flex-wrap w-full mb-4 ml-1">
                        <Text className="text-base font-semibold">{title}</Text>
                        <View className="flex-row items-center justify-start h-6 space-x-4">
                            {chartData.length > 1 ? (
                                chartData.map((data, index) => (
                                    <View
                                        key={index}
                                        className="flex-row justify-center items-center space-x-1"
                                    >
                                        <View
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    chartColors[index],
                                            }}
                                        ></View>
                                        <Text className="text-base font-semibold">
                                            {data[0].type}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <View className="flex-row justify-center items-center space-x-1">
                                    <View
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor: "forestgreen",
                                        }}
                                    ></View>
                                    <Text>{chartData[0][0].type}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View className="w-full -ml-3 h-[80%]">
                        <LineChart
                            data={chartData[0]}
                            color1="forestgreen"
                            startFillColor1="rgba(34, 139, 34, 0.2)"
                            data2={chartData[1]}
                            color2="orange"
                            startFillColor2="rgba(255, 165, 0, 0.2)"
                            data3={chartData[2]}
                            color3="dodgerblue"
                            startFillColor3="rgba(30, 144, 255, 0.2)"
                            data4={chartData[3]}
                            color4="peru"
                            startFillColor4="rgba(205, 133, 63, 0.2)"
                            // areaChart
                            width={chartWidth}
                            spacing={spacingWidth}
                            maxValue={110}
                            mostNegativeValue={0}
                            isAnimated
                            curved
                            lineGradient={false}
                            // intersectionAreaConfig={{
                            //     fillColor: "rgba(255, 0, 0, 0.2)",
                            // }}
                            dataPointsColor1="forestgreen"
                            dataPointsColor2="orange"
                            dataPointsColor3="dodgerblue"
                            dataPointsColor4="peru"
                            // textColor="black"
                        />
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
