import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import InputFields from "../../components/InputFields";
import { useAuth } from "../../context/AuthContext";

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
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default Login;
