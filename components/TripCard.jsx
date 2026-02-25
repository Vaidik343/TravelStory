import { Image, Text, TouchableOpacity, View } from "react-native";

const TripCard = ({
  title,
  startDate,
  endDate,
  coverImage,
  places,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className="w-full h-[300px] rounded-3xl overflow-hidden mb-4"
    >
      <Image
        source={{ uri: coverImage }}
        className="w-full h-full"
        resizeMode="cover"
      />

      {/* Dark Overlay */}
      {/* <View className="absolute inset-0 bg-black/30" /> */}

      {/* Content */}
      <View className="absolute bottom-4 left-4 right-4">
        <Text className="text-white text-2xl font-bold">{title}</Text>

        <View className="flex-row items-center mt-1">
          <Text className="text-white/90 text-xs">
            📅 {startDate} - {endDate}
          </Text>
          <Text className="text-white/90 text-xs ml-3">
            📍 {places} place{places !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;
