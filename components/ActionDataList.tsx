import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Button,
    Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    SimpleLineIcons,
    Entypo,
    AntDesign,
    FontAwesome,
} from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import CustomImagePicker from "./CustomImagePicker";
import { deleteImage, getImages } from "@/api/repositories/repository";
import { Image } from "expo-image";
import CustomCameraBtn from "./CustomCameraBtn";
import { ScrollView } from "react-native-gesture-handler";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

type ActionDataListProps = {
    containerStyle?: string;
    title: string;
    data: any;
    role: string;
};

export default function ActionDataList({
    containerStyle,
    title,
    data,
    role,
}: ActionDataListProps) {
    const [listData, setListData] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [imagePickerOpenId, setImagePickerOpenId] = useState("");
    const [images, setImages] = useState(null);
    const [selectedImage, setSelectedImage] = useState();
    const [facing, setFacing] = useState<CameraType>("back");
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    const startCamera = async () => {
        console.log(cameraPermission);

        // if (!cameraPermission.granted) {
        //     return (
        //         <View className="flex-1 justify-center">
        //             <Text className="text-center pb-2">
        //                 Камер ашиглах зөвшөөрөл өгнө үү
        //             </Text>
        //             <Button
        //                 onPress={requestCameraPermission}
        //                 title="grant permission"
        //             />
        //         </View>
        //     );
        // } else {
        setCameraOpen(true);
        // }
    };

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const onModalClose = () => {
        setShowImagePicker(false);
    };

    const toggleExpanded = (index) => {
        setExpandedIds(
            expandedIds.includes(index)
                ? expandedIds.filter((id) => id !== index)
                : [...expandedIds, index]
        );
    };

    const getImgs = async (id: string) => {
        const imgResps = await getImages(id);
        setImages(imgResps);
    };

    const toggleImagePicker = async (id: string) => {
        setImagePickerOpenId(id);
        setShowImagePicker(true);
        await getImgs(id);
    };

    const toggleImageSelect = (id: any) => {
        if (selectedImage == id) {
            setSelectedImage(null);
        } else {
            setSelectedImage(id);
        }
    };

    const delImage = async () => {
        if (!selectedImage) {
            alert("Устгах зурагаа сонгоно уу");
        } else {
            await deleteImage(selectedImage);
            await getImgs(imagePickerOpenId);
        }
    };

    useEffect(() => {
        setListData(data);
    }, [data]);

    return (
        <View
            className={`justify-center items-center mx-2 w-[92vw] ${containerStyle}`}
        >
            <Modal
                className="absolute w-[90vw] h-[60vh]"
                visible={cameraOpen}
                // transparent
                // presentationStyle="formSheet"
            >
                <CameraView className="flex-1" facing={facing}>
                    <View className="flex-1 flex-row bg-transparent m-4">
                        <TouchableOpacity
                            onPress={() => {
                                setCameraOpen(false);
                            }}
                        >
                            <AntDesign
                                name="closecircle"
                                size={24}
                                color="forestgreen"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 self-center items-center"
                            onPress={toggleCameraFacing}
                        >
                            <Text className="font-bold text-white text-24">
                                Flip Camera
                            </Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </Modal>
            <CustomModal isVisible={showImagePicker} onClose={onModalClose}>
                <View className="h-40 w-full flex-row justify-center items-center">
                    <View className="h-full w-[78%] flex-row justify-center items-center">
                        {images ? (
                            <ScrollView className="">
                                <View className="flex-row flex-wrap items-center justify-center m-4">
                                    {images.map((data, index) => (
                                        <TouchableOpacity
                                            key={data.id}
                                            onPress={() => {
                                                toggleImageSelect(data.id);
                                            }}
                                            className={`rounded-lg ${
                                                selectedImage == data.id
                                                    ? "border-2 border-primary"
                                                    : ""
                                            }`}
                                        >
                                            <Image
                                                className="w-14 h-14 m-1"
                                                source={
                                                    data.imageUrl.length > 1
                                                        ? `${process.env.EXPO_PUBLIC_REACT_APP_CDN_URL}${data.imageUrl}`
                                                        : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                                }
                                                contentFit="cover"
                                                transition={1000}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        ) : (
                            <View className="justify-center items-center space-y-2">
                                <SimpleLineIcons
                                    name="drawer"
                                    size={60}
                                    color="gray"
                                />
                                <Text className="text-gray-500 text-base">
                                    Мэдээлэл байхгүй байна
                                </Text>
                            </View>
                        )}
                    </View>
                    <View className="w-[1px] h-[90%] bg-primary"></View>
                    <View className="h-full w-[22%] justify-center items-center">
                        <CustomCameraBtn
                            bookingId={imagePickerOpenId}
                            iconColor="forestgreen"
                            btnStyle="mb-2 w-10 h-10"
                            iconSize={20}
                            onPress={startCamera}
                        />
                        <CustomImagePicker
                            iconColor={"forestgreen"}
                            bookingId={imagePickerOpenId}
                            btnStyle="mb-2 w-10 h-10"
                            iconSize={20}
                            onUpload={(image) => {
                                image ? getImgs(imagePickerOpenId) : null;
                            }}
                        />
                        <TouchableOpacity
                            onPress={delImage}
                            className="w-10 h-10 border-2 border-primary justify-center items-center rounded-md"
                        >
                            <FontAwesome
                                name="trash"
                                size={20}
                                color="forestgreen"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity></TouchableOpacity> */}
                </View>
            </CustomModal>
            <View className="w-full">
                <View className="p-2 flex-row justify-start">
                    <Text className="text-base font-semibold">{title}</Text>
                    {/* back iin response yanzlah */}
                    {/* <View>
                            <Text>
                                Яаралтай:{" "}
                                {item.}
                            </Text>
                        </View> */}
                </View>
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
                                        <View className="bg-white-100 h-56 flex-row items-center mb-2 space-x-2 rounded-lg">
                                            <View className="w-[16%] h-full flex-row items-center mr-1">
                                                <View className="ml-2">
                                                    <Text className="text-base">
                                                        {item.id}
                                                    </Text>
                                                </View>
                                                <View className="h-[90%] w-[1px] bg-primary mx-2"></View>
                                            </View>
                                            <View className="w-[100%] h-full py-2 pr-1">
                                                <View className="flex-row h-20 w-[80%] items-center relative">
                                                    <View className="w-[60%] h-[60%] justify-center space-y-3 p-2">
                                                        <View className="justify-center">
                                                            <View className="flex-row space-x-3 items-center">
                                                                <Text className="text-lg font-semibold">
                                                                    {
                                                                        item.customerFirstname
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {item.age}{" "}
                                                                    Нас
                                                                </Text>
                                                            </View>
                                                            <View className="">
                                                                <Text>
                                                                    {
                                                                        item.serviceNames
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View className="flex-row space-x-10">
                                                            <View>
                                                                <Text>
                                                                    {
                                                                        item.device
                                                                    }
                                                                </Text>
                                                            </View>
                                                            <View>
                                                                <Text>
                                                                    {item.currentDateTime.slice(
                                                                        0,
                                                                        -3
                                                                    )}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className="absolute right-1 justify-center items-center p-2">
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                toggleImagePicker(
                                                                    item.id.toString()
                                                                );
                                                            }}
                                                        >
                                                            <Entypo
                                                                name="camera"
                                                                size={24}
                                                                color="forestgreen"
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View className="bg-primary w-[78%] h-[1px] my-2"></View>
                                                <View className="w-[80%] px-2">
                                                    <View className="flex-row relative items-center">
                                                        <View className="w-[85%]">
                                                            <Text className="text-sm">
                                                                {item.painful}
                                                            </Text>

                                                            <View className="mt-1">
                                                                {item.descr ? (
                                                                    <Text>
                                                                        Тайлбар:
                                                                        {
                                                                            item.descr
                                                                        }
                                                                    </Text>
                                                                ) : null}
                                                                {role ==
                                                                "Техникч" ? (
                                                                    <View className="flex-row items-center">
                                                                        <Text>
                                                                            Эмч:{" "}
                                                                        </Text>
                                                                        <View className="rounded-lg justify-center bg-primary-100 h-6 px-1">
                                                                            <Text>
                                                                                {
                                                                                    item.doctor
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                ) : role ==
                                                                  "Эмч" ? (
                                                                    <View className="">
                                                                        <Text>
                                                                            Техникч:{" "}
                                                                            {
                                                                                item.technicalUser
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                ) : (
                                                                    <View className="flex-row items-center flex-wrap">
                                                                        <View className="flex-row items-center mr-2">
                                                                            <Text>
                                                                                Эмч:{" "}
                                                                            </Text>
                                                                            <View className="rounded-lg justify-center bg-primary-100 h-6 px-1">
                                                                                <Text>
                                                                                    {
                                                                                        item.doctor
                                                                                    }
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                        <View className="flex-row items-center mt-2">
                                                                            <Text>
                                                                                Техникч:{" "}
                                                                            </Text>
                                                                            <View className="rounded-lg justify-center bg-secondary-100 h-6 px-1">
                                                                                <Text>
                                                                                    {
                                                                                        item.technicalUser
                                                                                    }
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                )}
                                                                <View className=""></View>
                                                            </View>
                                                        </View>
                                                        <View className="justify-center items-center h-full absolute right-1">
                                                            <View className="-translate-y-3">
                                                                {item.isReceived ? (
                                                                    <View className="items-center space-y-2">
                                                                        <AntDesign
                                                                            name="checkcircle"
                                                                            size={
                                                                                24
                                                                            }
                                                                            color="forestgreen"
                                                                        />
                                                                        <Text>
                                                                            {
                                                                                item.docHour
                                                                            }{" "}
                                                                            цаг
                                                                        </Text>
                                                                    </View>
                                                                ) : (
                                                                    <AntDesign
                                                                        name="closecircle"
                                                                        size={
                                                                            24
                                                                        }
                                                                        color="forestgreen"
                                                                    />
                                                                )}
                                                            </View>
                                                            <View className="flex-row absolute bottom-0 space-x-1">
                                                                <TouchableOpacity className="p-1 bg-gray-400 rounded-lg">
                                                                    <FontAwesome
                                                                        name="trash"
                                                                        size={
                                                                            18
                                                                        }
                                                                        color="white"
                                                                    />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity className="p-1 bg-gray-400 rounded-lg">
                                                                    <FontAwesome
                                                                        name="pencil"
                                                                        size={
                                                                            18
                                                                        }
                                                                        color="white"
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ) : (
                                        <View className="bg-white-100 h-20 flex-row items-center mb-2 space-x-2 rounded-lg">
                                            <View className="w-[16%] h-full flex-row items-center mr-1">
                                                <View className="ml-2">
                                                    <Text className="text-base">
                                                        {item.id}
                                                    </Text>
                                                </View>
                                                <View className="h-[80%] w-[1px] bg-primary mx-2"></View>
                                            </View>
                                            <View className="w-[60%] h-[60%] justify-center space-y-3 p-2">
                                                <View className="justify-center">
                                                    <View className="flex-row space-x-3 items-center">
                                                        <Text className="text-lg font-semibold">
                                                            {
                                                                item.customerFirstname
                                                            }
                                                        </Text>
                                                        <Text>
                                                            {item.age} Нас
                                                        </Text>
                                                    </View>
                                                    <View className="">
                                                        <Text>
                                                            {item.serviceNames}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View className="flex-row space-x-10">
                                                    <View>
                                                        <Text>
                                                            {item.device}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text>
                                                            {item.currentDateTime.slice(
                                                                0,
                                                                -3
                                                            )}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View className="absolute right-1 justify-center items-center p-2">
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        toggleImagePicker(
                                                            item.id.toString()
                                                        );
                                                    }}
                                                >
                                                    <Entypo
                                                        name="camera"
                                                        size={24}
                                                        color="forestgreen"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}
