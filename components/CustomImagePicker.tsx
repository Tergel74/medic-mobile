import * as ImagePicker from "expo-image-picker";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { postImages } from "@/api/repositories/repository";

type CustomImagePickerProps = {
    bookingId: string;
    iconColor: string;
    btnStyle?: string;
    iconSize: number;
    onUpload: any;
};

export default function CustomImagePicker({
    bookingId,
    iconColor,
    btnStyle,
    iconSize,
    onUpload,
}: CustomImagePickerProps) {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            for (const i in result.assets) {
                const form = new FormData();
                try {
                    form.append(
                        "image",
                        JSON.parse(
                            JSON.stringify({
                                name: result.assets[i].fileName,
                                type: result.assets[i].mimeType,
                                uri: result.assets[i].uri,
                            })
                        )
                    );
                } catch (err) {
                    console.log(err);
                    alert("There was a problem with uploading the image!");
                } finally {
                    const imageResp = await postImages(bookingId, form);
                    onUpload(imageResp);
                }
            }
        }
    };
    return (
        <TouchableOpacity
            onPress={pickImageAsync}
            className={`w-14 h-14 border-2 border-primary justify-center items-center rounded-md ${btnStyle}`}
        >
            <MaterialIcons
                name="insert-photo"
                size={iconSize}
                color={iconColor}
            />
        </TouchableOpacity>
    );
}
