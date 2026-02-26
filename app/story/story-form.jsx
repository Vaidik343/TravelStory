import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { useStory } from "../../context/StoryContext";
import { pickImage } from "../../utils/pickImage";
import InputFields from "./../../components/InputFields";
const storyForm = () => {
  // URL passes 'id' but we need 'tripId' for the API
  const { id: tripId } = useLocalSearchParams();
  const { createStory, loading } = useStory();
  console.log("🚀 ~ storyForm ~ createStory:", createStory);
  const [form, setForm] = useState({
    placeName: "",
    visitDate: "",
    story: "",
    images: null,
  });
  console.log("🚀 ~ storyForm ~ form:", form);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);

  const handleUploadImages = async () => {
    const mulImages = await pickImage(true);
    if (mulImages) {
      // Validate image sizes (max 2MB per image)
      const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
      const images = Array.isArray(mulImages) ? mulImages : [mulImages];

      const oversizedImages = images.filter(
        (img) => img.fileSize > MAX_IMAGE_SIZE,
      );

      if (oversizedImages.length > 0) {
        const sizes = oversizedImages
          .map((img) => `${(img.fileSize / (1024 * 1024)).toFixed(2)}MB`)
          .join(", ");
        Alert.alert(
          "Image Too Large",
          `Images must be under 2MB each. Selected sizes: ${sizes}`,
          [{ text: "OK" }],
        );
        return;
      }

      setForm((prev) => ({ ...prev, images: mulImages }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (!selectedDate) return;

    const formattedDate = selectedDate.toISOString().split("T")[0];

    setForm((prev) => ({
      ...prev,
      [activeDateField]: formattedDate,
    }));
  };

  const handleCreateStory = async () => {
    if (!form.placeName) {
      Alert.alert("Place name required!");
      return;
    }

    // Re-validate image sizes before submission
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
    if (form.images) {
      const images = Array.isArray(form.images) ? form.images : [form.images];
      const oversizedImages = images.filter(
        (img) => img.fileSize > MAX_IMAGE_SIZE,
      );

      if (oversizedImages.length > 0) {
        Alert.alert(
          "Image Too Large",
          "One or more images exceed 2MB. Please select smaller images.",
          [{ text: "OK" }],
        );
        return;
      }
    }

    const normalizeImage = (img) => {
      if (!img || !img.uri) return null;

      return {
        uri: img.uri,
        name: img.fileName || `image_${Date.now()}.jpg`,
        type: img.mimeType || "image/jpeg",
      };
    };
    const formData = new FormData();

    formData.append("placeName", form.placeName.trim());
    formData.append("visitDate", form.visitDate);
    formData.append("story", form.story);
    if (tripId) formData.append("tripId", tripId);

    if (Array.isArray(form.images)) {
      form.images.forEach((img) => {
        const file = normalizeImage(img);
        if (!file) return;
        formData.append("images", file);
      });
    } else if (form.images) {
      const file = normalizeImage(form.images);
      if (file) formData.append("images", file);
    }

    try {
      const result = await createStory(formData);
      console.log("🚀 ~ handleCreateStory ~ result:", result);

      if (result) {
        console.log("🚀 ~ handleCreateStory ~ tripId:", tripId);
        if (tripId) router.replace(`/story/${tripId}`);
        else router.replace("/story");
      }
    } catch (error) {
      console.log(
        "Create story error:",
        error.response?.data || error.message || error,
      );
      Alert.alert(
        "Failed to create story",
        error.response?.data?.message || error.message || "Network error",
      );
    }
  };

  return (
    <SafeAreaView className="p-2">
      <KeyboardAwareScrollView
        enableAutomaticScroll
        keyboardShouldPersistTaps="handled"
      >
        {/* header */}
        <View className="flex-row items-center mb-6">
          <Pressable onPress={() => router.back()} className="mr-3">
            {/* icon */}
          </Pressable>
          <Text className="text-3xl font-bold">Add Destination</Text>
        </View>

        {/* images uploads */}
        <Pressable
          onPress={handleUploadImages}
          className={`w-full h-48 rounded-2xl justify-center items-center mb-6 border-2 border-dashed ${
            form.images ? "border-transparent" : "border-[#d4b8a1] bg-[#f5ede3]"
          }`}
        >
          {form.images ? (
            Array.isArray(form.images) ? (
              <Image
                source={{ uri: form.images[0]?.uri || form.images[0] }}
                className="w-full h-full rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: form.images.uri || form.images }}
                className="w-full h-full rounded-2xl"
                resizeMode="cover"
              />
            )
          ) : (
            <View className="items-center">
              <Text className="text-4xl mb-2">{/* icon */}</Text>
              <Text className="text-base text-gray-900">
                Tap to add multiple images
              </Text>
            </View>
          )}
        </Pressable>

        {/* Image count and size info */}
        {form.images && (
          <View className="mb-4 px-4 py-2 bg-[#f5ede3] rounded-lg">
            <Text className="text-sm text-[#8C7B6A]">
              {Array.isArray(form.images)
                ? `${form.images.length} image${form.images.length !== 1 ? "s" : ""} selected`
                : "1 image selected"}
            </Text>
            {Array.isArray(form.images) && (
              <Text className="text-xs text-[#8C7B6A] mt-1">
                Total size:{" "}
                {(
                  form.images.reduce((acc, img) => acc + img.fileSize, 0) /
                  (1024 * 1024)
                ).toFixed(2)}
                MB
              </Text>
            )}
          </View>
        )}

        <InputFields
          title="Place Name"
          placeholder="e.g., Himachal Pradesh Adventure"
          value={form.placeName}
          onChangeText={(value) => setForm({ ...form, placeName: value })}
          otherStyles="mb-4"
        />
        <InputFields
          title="Visit Date"
          variant="date"
          placeholder="dd-mm-yyyy"
          value={form.visitDate}
          onPress={() => {
            setActiveDateField("visitDate");
            setShowDatePicker(true);
          }}
        />
        <InputFields
          title="Destination Story"
          placeholder="Write your story"
          value={form.story}
          onChangeText={(value) => setForm({ ...form, story: value })}
          otherStyles="mb-6"
          multiline
          textAlignVertical="top"
        />

        {/* Date Picker - Only show when needed */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Create Button */}
        <CustomButton
          title="Create Story"
          handlePress={handleCreateStory}
          isLoading={loading}
          className="bg-[#e68619] rounded-lg py-4 mb-6"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default storyForm;
