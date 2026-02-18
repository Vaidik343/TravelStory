import { Pressable, Text, View } from "react-native";

const DestinationCard = ({ onPress, title, text, image, date }) => {
  return (
    <Pressable onPress={onPress} className="bg-white rounded-lg p-4 mb-4">
      <Image
        source={{ uri: image }}
        className="w-14 h-14 rounded-lg mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-base font-medium text-[#3B2F2F]">{title}</Text>
        <Text className="text-xs text-[#8C7B6A] mt-0.5">{date}</Text>
        <Text className="text-sm text-[#6B5E52] mt-1">{text}</Text>
      </View>
      {/* Right icon */}
      <Text className="text-[#8C7B6A] ml-2">📍</Text>
    </Pressable>
  );
};

export default DestinationCard;
