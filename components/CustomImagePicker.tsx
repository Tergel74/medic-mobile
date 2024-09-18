import * as ImagePicker from "expo-image-picker";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { postImage } from "@/api/repositories/repository";

type CustomImagePickerProps = {
    bookingId: string;
    iconColor: string;
};

export default function CustomImagePicker({
    bookingId,
    iconColor,
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
                    const imageResp = await postImage(bookingId, form);
                }
            }
        }
    };
    return (
        <TouchableOpacity
            onPress={pickImageAsync}
            className="w-8 h-8 border-2 border-primary justify-center items-center rounded-md"
        >
            <MaterialIcons name="insert-photo" size={24} color={iconColor} />
        </TouchableOpacity>
    );
}
