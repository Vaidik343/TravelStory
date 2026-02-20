import { Image, Pressable, Text, View } from "react-native";

const DestinationCard = ({ onPress, title, text, image, date }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-xl p-3 mb-4 flex-row items-center shadow-sm"
    >
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-[#3B2F2F] mb-1">
          {title}
        </Text>
        <Text className="text-xs text-[#8C7B6A] mb-1">{date}</Text>
        <Text
          className="text-sm text-[#6B5E52]"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </View>
      {/* Right icon */}
      <Text className="text-xl text-[#8C7B6A] ml-3">📍</Text>
    </Pressable>
  );
};

export default DestinationCard;
