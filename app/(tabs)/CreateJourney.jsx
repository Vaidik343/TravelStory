import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields from "../../components/InputFields";
import { useTrip } from "../../context/TripContext";
import { pickImage } from "../../utils/pickImage";
import CustomButton from "./../../components/CustomButton"; 

const CreateJourney = () => {
  const { loading, createTrip } = useTrip();
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    summary: "",
    coverImage: null,
  });
  console.log("🚀 ~ CreateJourney ~ form:", form)

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);

  const handlePickImage = async () => {
    const image = await pickImage();
    if (image) {
      setForm((prev) => ({ ...prev, coverImage: image }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (!selectedDate) return;
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setForm((prev) => ({ ...prev, [activeDateField]: formattedDate }));
  };

  const handleCreateTrip = async () => {
    if (!form.title) {
      Alert.alert("Title field required!");
      return;
    }

    const fields = {
      title: form.title.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      summary: form.summary,
    };

    try {
      const result = await createTrip(fields, form.coverImage || null);
      console.log("🚀 ~ handleCreateTrip ~ result:", result);
      if (result) {
        router.push("/(tabs)/MyJourneys");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };
  console.log("🚀 ~ handleCreateTrip ~ handleCreateTrip:", handleCreateTrip)

  return (
    <SafeAreaView className="flex-1 bg-[#f8f6f1]">
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={140}
        contentContainerStyle={{ padding: 24, paddingBottom: 160 }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <Pressable onPress={() => router.back()} className="mr-3">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-3xl font-bold text-gray-950">New Journey</Text>
        </View>

        {/* Cover Image Picker */}
        <Pressable
          onPress={handlePickImage}
          className={`w-full h-48 rounded-2xl justify-center items-center mb-6 border-2 border-dashed ${form.coverImage
              ? "border-transparent"
              : "border-[#d4b8a1] bg-[#f5ede3]"
            }`}
        >
          {form.coverImage ? (
            <Image
              source={{ uri: form.coverImage.uri }}
              className="w-full h-full rounded-2xl"
              resizeMode="cover"
            />
          ) : (
            <View className="items-center">
              <Feather name="camera" size={28} color="gray" />
              <Text className="text-[#8C7B6A] text-center mt-2">
                Add cover photo
              </Text>
            </View>
          )}
        </Pressable>

        {/* Trip Title */}
        <InputFields
          title="Trip Title"
          placeholder="e.g., Himachal Pradesh Adventure"
          value={form.title}
          onChangeText={(value) => setForm({ ...form, title: value })}
          otherStyles="mb-4"
        />

        {/* Dates */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-1">
            <InputFields
              title="Start Date"
              variant="date"
              placeholder="dd-mm-yyyy"
              value={form.startDate}
              onPress={() => {
                setActiveDateField("startDate");
                setShowDatePicker(true);
              }}
            />
          </View>
          <View className="flex-1">
            <InputFields
              title="End Date"
              variant="date"
              placeholder="dd-mm-yyyy"
              value={form.endDate}
              onPress={() => {
                setActiveDateField("endDate");
                setShowDatePicker(true);
              }}
            />
          </View>
        </View>

        {/* Trip Summary */}
        <InputFields
          title="Trip Summary"
          placeholder="Write a brief summary of your journey..."
          value={form.summary}
          onChangeText={(value) => setForm({ ...form, summary: value })}
          otherStyles="mb-6"
          multiline
          textAlignVertical="top"
        />

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <CustomButton
          title="Create Journey"
          handlePress={handleCreateTrip}
          isLoading={loading}
          className="bg-[#e68619] rounded-lg py-4 mb-6"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateJourney;
