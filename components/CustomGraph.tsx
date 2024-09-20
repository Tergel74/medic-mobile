import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { LineChart } from "react-native-gifted-charts";
import { transform } from "@babel/core";
import NoData from "./NoData";

type CustomGraphProps = {
    data: any;
    title: string;
    containerStyle?: string;
    maxValue: number;
};

export default function CustomGraph({
    data,
    title,
    containerStyle,
    maxValue,
}: CustomGraphProps) {
    const { width } = Dimensions.get("window");
    const chartWidth = width - 110;
    data.forEach((data) => {
        data.forEach((element) => {
            (element.dataPointText = element.value.toString()),
                (element.labelTextStyle = {
                    // transform: [{ rotate: "-90deg" }, { translateX: -10 }],
                    fontSize: 10,
                }),
                (element.textShiftY = -10);
        });
    });
    const [chartReady, setChartReady] = useState(false);
    const [chartData, setChartData] = useState(data);
    const [chartSpacing, setChartSpacing] = useState(chartWidth / 7);

    useEffect(() => {
        const prepare = async () => {
            try {
                setChartData(data);
                data[0].length < 7 &&
                    setChartSpacing(chartWidth / (data[0].length + 0.5));
            } catch (err) {
                console.log(err);
            }
        };

        prepare().finally(() => {
            setChartReady(true);
        });
    }, [data, chartData]);

    const chartColors = ["forestgreen", "orange", "dodgerblue", "peru"];

    return (
        <View
            className={`justify-center items-center rounded-lg w-full h-[38vh] bg-white p-2 ${containerStyle}`}
        >
            {chartReady && chartData.length ? (
                <View className="">
                    <View className=" flex-row justify-between items-center flex-wrap w-full mb-4 ml-1 px-2">
                        <Text className="text-base font-semibold">{title}</Text>
                        <View className="flex-row items-center justify-start h-6 space-x-2">
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
                    <View className=" h-[80%]">
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
                            spacing={chartSpacing}
                            maxValue={
                                maxValue +
                                (maxValue.toString().length > 2
                                    ? +maxValue.toString()[0] * 10
                                    : 10)
                            }
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
                </View>
            ) : (
                <NoData />
            )}
        </View>
    );
}
