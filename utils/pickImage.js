import * as ImagePicker from "expo-image-picker";

// pickImage(multiple = false)
// - when multiple=false (default) returns a single asset object or null
// - when multiple=true returns an array of assets or null
export const pickImage = async (multiple = false) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: !multiple,
    aspect: [4, 3],
    quality: 0.8,
    allowsMultipleSelection: multiple,
  });
  console.log("🚀 ~ pickImage ~ result:", result);

  if (!result.canceled) {
    return multiple ? result.assets : result.assets[0];
  }

  return null;
};
console.log("🚀 ~ pickImage ~ pickImage:", pickImage);
