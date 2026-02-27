import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import InputFields from "../../components/InputFields";
import { useAuth } from "../../context/AuthContext";

const walkingHeart = "../../assets/json/Love-is-blind.json";
const Login = () => {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  console.log("🚀 ~ Login ~ form:", form);

  const handleSubmit = async () => {
    if (form.email.trim() === "" || form.password.trim() === "") {
      Alert.alert("Please fill in all the fields!");
      return true;
    }

    try {
      const result = await login(form);
      console.log("🚀 ~ handleSubmit ~ result:", result);

      if (result) {
        setForm({ email: "", password: "" });
        router.replace("/(tabs)/MyJourneys");
      }
    } catch (error) {}
  };
  console.log("🚀 ~ handleSubmit ~ handleSubmit:", handleSubmit);
  return (
    <SafeAreaView className="p-2 bg-base h-full">
      <ScrollView>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraHeight={500}
          contentContainerStyle={{ padding: 2, paddingBottom: 25 }}
        >
          <View className="flex justify-center items-center  p-2">
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
              title="Email"
              variant="email"
              value={form.email}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  email: value,
                })
              }
              otherStyles="mt-7 text-[#3E3E3E]"
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

            <CustomButton
              title="Login"
              handlePress={handleSubmit}
              containerStyles="mt-7"
              isLoading={loading}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-900 font-normal">
                Don't have account yet?
              </Text>

              <Link
                href="/(auth)/Register"
                className="text-lg font-semibold text-[#FF9C01]"
              >
                Sign In
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
