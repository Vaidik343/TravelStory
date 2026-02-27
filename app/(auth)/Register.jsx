import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import InputFields from "../../components/InputFields";
import { useUser } from "../../context/UserContext";

const walkingHeart = "../../assets/json/Love-is-blind.json";

const Register = () => {
  const { createUser, loading } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });
  console.log("🚀 ~ Register ~ form:", form);

  const handleSubmit = async () => {
    if (form.email === "" || form.name === "" || form.password === "") {
      Alert.alert("Please fill in all the fields!");
    }

    try {
      const result = await createUser(form);
      console.log("🚀 ~ handleSubmit ~ result:", result);

      if (result) {
        setForm({ name: "", email: "", password: "" });
        router.replace("/(tabs)/MyJourneys");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  console.log("🚀 ~ handleSubmit ~ handleSubmit:", handleSubmit);

  return (
    <SafeAreaView className="bg-base h-full px-2.5">
      <ScrollView>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraHeight={800}
          contentContainerStyle={{ padding: 2, paddingBottom: 100 }}
        >
          {/* add images of gif just like aora */}
          <View className="flex justify-center items-center  ">
            <LottieView
              source={require(walkingHeart)}
              autoPlay
              loop
              style={{ width: 380, height: 300 }}
            />
            <Text className="text-orange-500 font-semibold text-xl italic">
              Close Your Eyes. Open the World
            </Text>
          </View>

          <View>
            <InputFields
              title="Name"
              variant="text"
              value={form.name}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  name: value,
                })
              }
              otherStyles="mt-7"
            />

            <InputFields
              title="Email"
              variant="email"
              value={form.email}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  email: value,
                })
              }
              otherStyles="mt-7"
            />
            <InputFields
              title="Password"
              variant="password"
              value={form.password}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  password: value,
                })
              }
              otherStyles="mt-7"
            />

            <InputFields
              title="Profile"
              value={form.profile}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  profile: value,
                })
              }
              otherStyles="mt-7"
            />

            <CustomButton
              title="Register"
              handlePress={handleSubmit}
              containerStyles="mt-7"
              isLoading={loading}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-900 font-normal">
                Have an account already?
              </Text>

              <Link
                href="/(auth)/Login"
                className="text-lg font-semibold text-[#FF9C01]"
              >
                Login
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
