import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, Text, TextInput, View } from "react-native";

const InputFields = ({
  title = "",
  placeholder = "",
  value,
  onChangeText,
  variant = "text",
  otherStyles = "",
  onPress,
  ...props
}) => {
  const isPassword = variant === "password";
  const isEmail = variant === "email";
  const isDate = variant === "date";

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title ? <Text className="text-base text-gray-950">{title}</Text> : null}

      {isDate ? (
        <Pressable
          onPress={onPress}
          className="w-full px-4 py-3 bg-white border border-[#d4b8a1] rounded-lg flex-row items-center"
        >
          <Text className="text-[#8C7B6A] mr-2">
            <FontAwesome5 name="calendar" size={14} color="#8C7B6A" />
          </Text>
          <Text className="text-gray-900 flex-1">{value || placeholder}</Text>
        </Pressable>
      ) : (
        <View className="w-full">
          <TextInput
            className="w-full px-4 py-3 bg-white border border-[#d4b8a1] rounded-lg text-gray-900"
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor="#8C7B6A"
            editable={!isDate}
            secureTextEntry={isPassword}
            autoCapitalize={isEmail ? "none" : "sentences"}
            pointerEvents={isDate ? "none" : "auto"}
            {...props}
          />
        </View>
      )}
    </View>
  );
};

export default InputFields;
