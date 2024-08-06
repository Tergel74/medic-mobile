import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useGlobalContext } from "@/context/GlobalProvider";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { CustomSegmentedControl } from "./CustomSegmentedControl";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

type CustomColumnChartProps = {
    data: any;
    title: string;
    containerStyle?: string;
};

const CustomColumnChart = ({
    data,
    title,
    containerStyle,
}: CustomColumnChartProps) => {
    data.forEach((data) => {
        data.forEach((element) => {
            (element.topLabelComponent = () => (
                <Text
                    style={{
                        fontSize: 12,
                        marginBottom: 6,
                        textAlign: "center",
                    }}
                >
                    {element.value}
                </Text>
            )),
                element.type == "MRI"
                    ? (element.frontColor = "forestgreen")
                    : element.type == "CT"
                    ? (element.frontColor = "orange")
                    : element.type == "PET/CT"
                    ? (element.frontColor = "dodgerblue")
                    : (element.frontColor = "peru");
        });
    });
    const { serviceTypes } = useGlobalContext();
    const [chartData, setChartData] = useState(data[0]);
    const [chartReady, setChartReady] = useState(false);
    const extractedTypes = new Set(data.flat().map((item) => item.type));

    const types = serviceTypes
        .filter((serviceType) => extractedTypes.has(serviceType.name))
        .map((serviceType) => serviceType.name);
    const [chartType, setChartType] = useState(
        data[0] ? data[0][0].type : "MRI"
    );

    useEffect(() => {
        const prepare = async () => {
            try {
                for (const i in data) {
                    if (chartType == data[i][0].type) {
                        setChartData(data[i]);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        prepare().finally(() => {
            setChartReady(true);
        });
    }, [chartType, chartData, data]);

    const { width } = Dimensions.get("window");
    const chartWidth = width - 120;
    const barWidth = chartWidth / 9;

    return (
        <View
            className={`justify-center items-center rounded-lg border border-gray-100 w-[94vw] h-[42vh] bg-white p-2 ${containerStyle}`}
        >
            <Text className="text-base font-semibold mb-3">{title}</Text>
            {chartReady && data.length ? (
                <>
                    <BarChart
                        data={chartData}
                        height={200}
                        barWidth={barWidth}
                        width={chartWidth}
                        spacing={8}
                        noOfSections={4}
                        minHeight={3}
                        barBorderRadius={3}
                        yAxisThickness={0}
                        yAxisTextStyle={{ color: "gray[100]" }}
                        xAxisThickness={0}
                        xAxisLabelTextStyle={{
                            color: "gray[100]",
                            fontSize: 12,
                        }}
                        isAnimated
                    />
                    <CustomSegmentedControl
                        options={types}
                        selectedOption={types[0]}
                        onOptionPress={setChartType}
                    />
                    {/* <SegmentedControl
                        values={["hi", "hi"]}
                        enabled
                        className="w-full h-12 bg-red-300"
                    /> */}
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
};

export default CustomColumnChart;
