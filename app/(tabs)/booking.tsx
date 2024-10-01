import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DatePicker from "@/components/DatePicker";
import DropDown from "@/components/DropDown";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
    findByBookingId,
    findByRegNo,
    getBooking,
    getCeItems,
    getDeviceModels,
    getHospitalServices,
    saveCustomerForm,
} from "@/api/repositories/repository";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import CustomModal from "@/components/CustomModal";
import FormField from "@/components/FormField";
import TimePicker from "@/components/TimePicker ";

export default function Booking() {
    const { hospital, user, serviceTypes } = useGlobalContext();
    // const initialServiceType = {
    //     id: "-1",
    //     name: "Бүгд",
    // };
    // const [service, setService] = useState(initialServiceType);
    const initialCeItem = {
        id: "-2",
        name: "",
    };
    const [services, setServices] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [ceItems, setCeItems] = useState([initialCeItem]);
    const [deviceModels, setDeviceModels] = useState(null);
    // const [bookingDate, setBookingDate] = useState(new Date().toISOString());
    // const [bookingDateTime, setBookingDateTime] = useState<Date>();
    const [booking, setBooking] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState<any>();
    const [bookingInfo, setBookingInfo] = useState<any>();
    const [bookingInfoDate, setBookingInfoDate] = useState({
        date: "",
        time: "",
    });

    const genders = [
        {
            name: "Эм",
            id: 1,
        },
        {
            name: "Эр",
            id: 2,
        },
    ];

    const allergyHas = [
        {
            name: "Үгүй",
            value: false,
            id: 3,
        },
        {
            name: "Тийм",
            value: true,
            id: 4,
        },
    ];

    // const [customerForm, setCustomerForm] = useState({
    //     regNo: "",
    //     lastName: "",
    //     firstName: "",
    //     gender: {},
    //     age: "",
    //     hasAllergy: false,
    // });
    const [customerForm, setCustomerForm] = useState({
        descr: "",
        ceiAmount: "",
    });
    const [customerCe, setCustomerCe] = useState(null);
    const [customerDeviceModel, setCustomerDeviceModel] = useState(null);

    // const searchByRegNo = async () => {
    //     if (customerForm.regNo.length > 0) {
    //         const res = await findByRegNo(customerForm.regNo, hospital.id, 2);
    //         console.log(res);

    //         if (res.cusomer) {
    //             const customer = res.customer;
    //             setCustomerForm({
    //                 ...customerForm,
    //                 lastName: customer.lastname,
    //                 firstName: customer.firstname,
    //                 age: customer.age.toString(),
    //                 gender: genders[customer.gender],
    //                 hasAllergy: allergyHas[customer.hasAllergy].value,
    //             });
    //         } else {
    //             setCustomerForm({
    //                 regNo: "",
    //                 lastName: "",
    //                 firstName: "",
    //                 gender: {},
    //                 age: "",
    //                 hasAllergy: false,
    //             });
    //         }
    //     } else {
    //         alert("Үйлчлүүлэгчийн Регистерийн дугаарыг оруулна уу");
    //     }
    // };

    const getStartingData = async () => {
        const services = await getHospitalServices(hospital.id);
        setServices(services);
        const ce = await getCeItems();
        setCeItems(ce);
        const deviceModels = await getDeviceModels(hospital.id, 2);
        setDeviceModels(deviceModels);
        setCustomerDeviceModel(deviceModels[0]);
    };

    const getData = async () => {
        const currentDate = new Date(date);
        const booking = await getBooking(
            `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
            )}T00:00:00`,
            `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
            )}T23:59:00`,
            2,
            hospital.id
        );

        setBooking(booking);
    };

    const openCustomerForm = async (id, status, date) => {
        if (status == 1) {
            setFormOpen(true);
            setBookingInfoDate({
                ...bookingInfoDate,
                date: date.slice(0, 10),
                time: date.slice(10, 16),
            });
            await findByBookingId(id, hospital.id, 2).then((res) => {
                if (res) {
                    setCustomerInfo(res.customer);
                    setBookingInfo(res.bookingData);
                }
            });
        }
    };

    const onModalClose = () => {
        setFormOpen(false);
        setCustomerForm({
            descr: "",
            ceiAmount: "",
        });
        setCustomerDeviceModel(null);
        setCustomerCe(null);
    };

    const submitCustomerForm = async () => {
        bookingInfo.currentDate = new Date();

        if (customerCe) {
            bookingInfo.isCe = true;
            bookingInfo.ceitemid = customerCe.id;
            bookingInfo.ceGram = +customerForm.ceiAmount;
        }
        if (customerForm.descr.length > 0) {
            bookingInfo.painful = customerForm.descr;
        }
        if (customerDeviceModel) {
            bookingInfo.deviceId = customerDeviceModel.id;
        }
        // if (customerCe) {
        //     bookData.isCe = true;
        //     bookData.ceitemid = customerCe.id;
        //     bookData.ceGram = +customerForm.ceiAmount;
        // }
        // if (customerForm.descr.length > 0) {
        //     bookData.painful = customerForm.descr;
        // }
        // if (customerDeviceModel) {
        //     bookingInfo.deviceId = customerDeviceModel.id;
        // }

        await saveCustomerForm({
            bookingData: bookingInfo,
            customerData: customerInfo,
        }).then(async (res) => {
            if (res) {
                onModalClose();
                await getData();
            }
        });
    };

    useEffect(() => {
        getData();
        getStartingData();
    }, [date, hospital]);

    return (
        <View className="h-full py-2 px-1 bg-white">
            <CustomModal
                isVisible={formOpen}
                onClose={onModalClose}
                title="Цаг захиалга"
                modalStyle="h-[66%]"
            >
                <View className="h-full w-full">
                    {deviceModels && ceItems ? (
                        <View className="items-center mt-4">
                            <Text className="text-base">Mэдээлэл</Text>
                            <View className=" flex-row flex-wrap justify-center items-center space-y-3 mt-2">
                                <View className="flex-row justify-center items-center w-full">
                                    <DropDown
                                        data={deviceModels}
                                        onChange={(e) => {
                                            setCustomerDeviceModel(e);
                                        }}
                                        initialValue={deviceModels[0]}
                                        dropDownBtnStyle="w-[33vw] h-8 mt-1 mr-2 shadow-none"
                                        dropDownStyle="max-w-[33vw]"
                                    />
                                    <DropDown
                                        data={ceItems}
                                        onChange={(e) => {
                                            setCustomerCe(e);
                                        }}
                                        initialValue={initialCeItem}
                                        dropDownBtnStyle="w-[33vw] h-8 mt-1 mr-2 shadow-none"
                                        dropDownStyle="max-w-[33vw]"
                                    />
                                    <View className="w-[20vw]">
                                        <FormField
                                            value={customerForm.ceiAmount}
                                            handleChangeText={(e: string) =>
                                                setCustomerForm({
                                                    ...customerForm,
                                                    ceiAmount: e,
                                                })
                                            }
                                            placeHolder="Хэмжээ"
                                            inputStyles="h-8 mt-1"
                                            titleStyles="text-sm text-gray-700"
                                        />
                                    </View>
                                </View>
                                <View className="w-full px-5">
                                    <FormField
                                        value={customerForm.descr}
                                        handleChangeText={(e: string) =>
                                            setCustomerForm({
                                                ...customerForm,
                                                descr: e,
                                            })
                                        }
                                        placeHolder="Зовиур"
                                        title="Зовиур"
                                        inputStyles="h-10 mt-1"
                                        titleStyles="text-sm text-gray-700"
                                    />
                                </View>
                            </View>
                        </View>
                    ) : null}
                    {customerInfo && bookingInfo ? (
                        <View className="items-center mt-2 h-[42%]">
                            <Text className="text-base">
                                Үйлчлүүлэгчидийн мэдээлэл
                            </Text>
                            <View className="items-center mt-3">
                                <View className="flex-row justify-between items-center w-full px-8">
                                    <View className="flex-col ">
                                        <Text className="text-xl">
                                            {customerInfo.lastname}{" "}
                                            {customerInfo.firstname}
                                        </Text>
                                        <Text className="text-base">
                                            {customerInfo.regno}
                                        </Text>
                                    </View>
                                    <View className="justify-center items-center p-3 rounded-lg">
                                        <Text className="text-base font-semibold">
                                            {bookingInfo.preBookingId}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-center items-center gap-x-2">
                                    <View className="justify-center pl-4 py-2 w-[45%] bg-primary-100 rounded-xl mt-3 space-y-1 h-40">
                                        <Text className="text-base">
                                            Нас: {customerInfo.age}
                                        </Text>
                                        <Text className="text-base">
                                            Хүйс:{" "}
                                            {genders[customerInfo.gender].name}
                                        </Text>
                                        <Text className="text-base">
                                            Харшилтай эсэх:{" "}
                                            {
                                                allergyHas[
                                                    customerInfo.hasAllergy
                                                ].name
                                            }
                                        </Text>
                                    </View>
                                    <View className="justify-center pl-4 w-[42%] bg-secondary-100 rounded-lg h-40 space-y-1 mt-2">
                                        <Text className="text-base">
                                            Огноо: {bookingInfoDate.date}
                                        </Text>
                                        <Text className="text-base">
                                            Хугацаа: {bookingInfoDate.time}
                                        </Text>
                                        {services.length > 0 &&
                                        bookingInfo.bookingservices.length >
                                            0 ? (
                                            <View className="space-y-1">
                                                <Text className="text-base">
                                                    Үйлчилгээ:{" "}
                                                    {
                                                        bookingInfo
                                                            .bookingservices[0]
                                                            .service.name
                                                    }
                                                </Text>
                                                <Text className="text-base">
                                                    Тал:{" "}
                                                    {
                                                        bookingInfo
                                                            .bookingservices[0]
                                                            .side
                                                    }
                                                </Text>
                                            </View>
                                        ) : null}
                                    </View>
                                </View>
                            </View>

                            {/* <View className="flex-row flex-wrap justify-center items-center w-full h-full py-4 px-1 gap-x-2 gap-y-1">
                            <View className="flex-row space-x-1 justify-center items-center w-[46%]">
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
                                    formStyles="w-[68%]"
                                    titleStyles="text-sm text-gray-700"
                                />
                                <TouchableOpacity
                                    onPress={searchByRegNo}
                                    className="h-8 translate-y-2.5 justify-center items-center p-1 rounded-md border border-primary"
                                >
                                    <Text className="text-sm text-center">
                                        Шалгах
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className="w-[46%]">
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
                            <View className="w-[46%]">
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
                            <View className="w-[46%] space-y-1">
                                <Text className="text-sm text-gray-700">
                                    Хүйс
                                </Text>
                                <DropDown
                                    data={genders}
                                    onChange={(e) => {
                                        setCustomerForm({
                                            ...customerForm,
                                            gender: e,
                                        });
                                    }}
                                    initialValue={genders[0]}
                                    dropDownBtnStyle="w-full h-8 mt-1 shadow-none"
                                    dropDownStyle="max-w-[45vw]"
                                />
                            </View>
                            <View className="w-[46%]">
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
                            <View className="w-[46%] space-y-1">
                                <Text className="text-sm text-gray-700">
                                    Хүйс
                                </Text>
                                <DropDown
                                    data={allergyHas}
                                    onChange={(e) => {
                                        setCustomerForm({
                                            ...customerForm,
                                            hasAllergy: e,
                                        });
                                    }}
                                    initialValue={allergyHas[0]}
                                    dropDownBtnStyle="w-full h-8 mt-1 shadow-none"
                                    dropDownStyle="max-w-[45vw]"
                                />
                            </View>
                        </View> */}
                        </View>
                    ) : null}
                    <View className="items-center">
                        <TouchableOpacity
                            className="w-[90%] mx-5 h-10 mt-8 rounded-lg justify-center items-center bg-primary"
                            onPress={() => {
                                if (
                                    !customerForm.ceiAmount ||
                                    !customerForm.descr ||
                                    customerCe.id == "-2"
                                ) {
                                    alert(
                                        "Цаг захиалгын мэдээллийг бүрэн оруулна уу"
                                    );
                                } else {
                                    submitCustomerForm();
                                }
                            }}
                        >
                            <Text className="text-white">Хадгалах</Text>
                        </TouchableOpacity>
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
                                    </View>
                                </View>
                                <FlatList
                                    data={booking}
                                    scrollEnabled={false}
                                    // initialScrollIndex={38}
                                    // getItemLayout={(data, index) => ({
                                    //     length: 80,
                                    //     offset: 80 * index,
                                    //     index,
                                    // })}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    openCustomerForm(
                                                        item.id,
                                                        item.status,
                                                        item.bookingDateTime.slice(
                                                            0,
                                                            -3
                                                        )
                                                    );
                                                }}
                                                className="bg-white-100 h-20 flex-row items-center mb-2 rounded-lg"
                                            >
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
                                                        item.status == 0 ? (
                                                            <View className="py-1 px-2 h-8 rounded-xl bg-secondary-100 justify-center items-center">
                                                                <Text>
                                                                    Захиалсан
                                                                </Text>
                                                            </View>
                                                        ) : item.status == 1 ? (
                                                            <View className="py-1 px-2 h-8 rounded-xl bg-blue-100 justify-center items-center">
                                                                <Text>
                                                                    Баталсан
                                                                </Text>
                                                            </View>
                                                        ) : item.status == 3 ? (
                                                            <View className="py-1 px-2 h-8 rounded-xl bg-primary-100 justify-center items-center">
                                                                <Text>
                                                                    Орсон
                                                                </Text>
                                                            </View>
                                                        ) : null
                                                    ) : null}
                                                </View>
                                            </TouchableOpacity>
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

// analysis - edit, delete, camera - delete -> status 2
// booking - shine route -> zuvhun batalsan, zahialsan
