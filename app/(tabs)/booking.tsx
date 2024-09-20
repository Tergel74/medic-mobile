import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getBooking } from "@/api/repositories/repository";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import CustomModal from "@/components/CustomModal";
import FormField from "@/components/FormField";

export default function Booking() {
    const { hospital, user, serviceTypes } = useGlobalContext();
    const initialServiceType = {
        id: "-1",
        name: "Бүгд",
    };
    const [service, setService] = useState(initialServiceType);
    var services = [initialServiceType, ...serviceTypes];
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [booking, setBooking] = useState(null);
    const [formOpen, setFormOpen] = useState(false);

    const genders = [
        {
            name: "Эр",
            id: 1,
        },
        {
            name: "Эм",
            id: 2,
        },
    ];

    const allergyHas = [
        {
            name: "Тийм",
            id: 3,
        },
        {
            name: "Үгүй",
            id: 4,
        },
    ];

    const [customerForm, setCustomerForm] = useState({
        regNo: "",
        lastName: "",
        firstName: "",
        gender: {},
        age: "",
        hasAllergy: false,
    });

    const newBooking = async () => {};

    const searchByRegNo = async () => {};

    const getData = async () => {
        const currentDate = new Date(date);
        const booking = await getBooking(
            `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
            )}T07:30:00`,
            `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
            )}T23:59:00`,
            +service.id,
            hospital.id
        );

        setBooking(booking);
    };

    const onModalClose = () => {
        setFormOpen(false);
    };

    useEffect(() => {
        getData();
    }, [date, service, hospital]);

    return (
        <View className="h-full py-2 px-1 bg-white">
            <CustomModal
                isVisible={formOpen}
                onClose={onModalClose}
                title="Цаг захиалга"
                modalStyle="h-[70%]"
            >
                <View className="items-center mt-4">
                    <Text className="text-base">Үйлчлүүлэгчидийн мэдээлэл</Text>
                    <View className="flex-row flex-wrap justify-center items-start w-full h-[60%] py-4 px-1 gap-x-5 gap-y-1">
                        <View className="flex-row space-x-2 justify-center items-center">
                            <FormField
                                value={customerForm.regNo}
                                handleChangeText={(e: string) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        regNo: e,
                                    })
                                }
                                title="Үйлчлүүлэгч"
                                inputStyles="h-8"
                                formStyles="w-[80%]"
                                titleStyles="text-sm text-gray-700"
                            />
                            <TouchableOpacity
                                onPress={searchByRegNo}
                                className="h-8 translate-y-2.5 justify-center items-center p-2 rounded-md border border-primary"
                            >
                                <Text className="">Шалгах</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="w-[44%]">
                            <FormField
                                value={customerForm.lastName}
                                handleChangeText={(e: string) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        lastName: e,
                                    })
                                }
                                title="Овог"
                                inputStyles="h-8"
                                titleStyles="text-sm text-gray-700"
                            />
                        </View>
                        <View className="w-[44%]">
                            <FormField
                                value={customerForm.firstName}
                                handleChangeText={(e: string) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        firstName: e,
                                    })
                                }
                                title="Нэр"
                                inputStyles="h-8"
                                titleStyles="text-sm text-gray-700"
                            />
                        </View>
                        <View className="w-[44%] space-y-1">
                            <Text className="text-sm text-gray-700">Хүйс</Text>
                            <DropDown
                                data={genders}
                                onChange={(e) => {
                                    setCustomerForm({
                                        ...customerForm,
                                        gender: e,
                                    });
                                }}
                                initialValue={genders[0]}
                                dropDownBtnStyle="w-[43vw] h-8 mt-1 shadow-none"
                                dropDownStyle="max-w-[43%]"
                            />
                        </View>
                        <View className="w-[44%]">
                            <FormField
                                value={customerForm.lastName}
                                handleChangeText={(e: string) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        age: e,
                                    })
                                }
                                title="Нас"
                                inputStyles="h-8"
                                titleStyles="text-sm text-gray-700"
                            />
                        </View>
                        <View className="w-[44%] space-y-1">
                            <Text className="text-sm text-gray-700">Хүйс</Text>
                            <DropDown
                                data={allergyHas}
                                onChange={(e) => {
                                    setCustomerForm({
                                        ...customerForm,
                                        hasAllergy: e,
                                    });
                                }}
                                initialValue={allergyHas[1]}
                                dropDownBtnStyle="w-[43vw] h-8 mt-1 shadow-none"
                                dropDownStyle="max-w-[43%]"
                            />
                        </View>
                    </View>
                </View>
            </CustomModal>
            <ScrollView>
                <View className="flex-row justify-center flex-wrap">
                    <DatePicker
                        startValue={new Date()}
                        onChange={(date) => {
                            setDate(date);
                        }}
                        pickerBtnStyle="w-[92vw]"
                    />
                    {/* <DropDown
                        data={services}
                        onChange={(item) => {
                            setService(item);
                        }}
                        initialValue={initialServiceType}
                        dropDownBtnStyle="w-[45vw]"
                        dropDownStyle="min-w-[45vw]"
                    /> */}
                </View>
                {booking ? (
                    <View className="items-center justify-center mt-4 flex-1">
                        <View
                            className={`justify-center items-center mx-2 w-[92vw]`}
                        >
                            <View className="w-full">
                                <View className="p-2 flex-row justify-between items-center mb-1">
                                    <Text className="text-base font-semibold">
                                        Цаг захиалга /{date}/
                                    </Text>
                                    <View className="flex-row space-x-3">
                                        <TouchableOpacity onPress={getData}>
                                            <AntDesign
                                                name="retweet"
                                                size={24}
                                                color="forestgreen"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setFormOpen(true);
                                            }}
                                        >
                                            <AntDesign
                                                name="plus"
                                                size={24}
                                                color="forestgreen"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <FlatList
                                    data={booking}
                                    scrollEnabled={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View className="bg-white-100 h-20 flex-row items-center mb-2 rounded-lg">
                                                <View className="w-[30%] h-full flex-row items-center mr-1">
                                                    <View className="ml-2">
                                                        {item.id ? (
                                                            <View className="items-center">
                                                                <Text className="text-base">
                                                                    {item.id}
                                                                </Text>
                                                                <View className="w-[98%] h-[1px] bg-primary my-1"></View>

                                                                <View className="rounded-lg w-full bg-primary-100 p-1 items-center justify-center">
                                                                    <Text className="">
                                                                        {item.bookingDateTime.slice(
                                                                            0,
                                                                            -9
                                                                        )}
                                                                    </Text>
                                                                    <Text className="">
                                                                        {item.bookingDateTime.slice(
                                                                            10,
                                                                            -3
                                                                        )}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        ) : (
                                                            <View className="rounded-lg w-full bg-red-100 p-1 items-center justify-center">
                                                                <Text className="">
                                                                    {item.bookingDateTime.slice(
                                                                        0,
                                                                        -6
                                                                    )}
                                                                </Text>
                                                                <Text className="">
                                                                    {item.bookingDateTime.slice(
                                                                        10
                                                                    )}
                                                                </Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <View className="h-[80%] w-[1px] bg-primary mx-2"></View>
                                                </View>
                                                <View className="w-[50%] h-full -ml-2 justify-center space-y-3 p-2">
                                                    <View className="justify-center">
                                                        <View className="flex-row items-center">
                                                            <Text className="text-lg font-semibold">
                                                                {
                                                                    item.customerName
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View className="">
                                                            <Text>
                                                                {item.regno}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View className="flex-row space-x-10">
                                                        <View>
                                                            <Text>
                                                                {
                                                                    item.serviceTypeName
                                                                }{" "}
                                                                {
                                                                    item.serviceNames
                                                                }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View className="absolute right-1 justify-center items-center p-2">
                                                    {item.id ? (
                                                        <AntDesign
                                                            name="checkcircle"
                                                            size={24}
                                                            color="forestgreen"
                                                        />
                                                    ) : null}
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}
