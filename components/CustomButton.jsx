import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  textStyle,
  containerStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-[#FF9C01] rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
    >
      <Text className={`text-lg font-semibold text-white ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
