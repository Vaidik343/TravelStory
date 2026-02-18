import { TouchableOpacity } from "react-native";

const TripCard = ({
  title,
  startDate,
  endDate,
  coverImage,
  places,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex w-full h-[250px] rounded-xl overflow-hidden p-1 mb-4"
    >
      <Image
        source={{ uri: coverImage }}
        className="w-full h-full"
        resizeMode="cover"
      />

      {/* Dark Overlay */}
      <View className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <View className="absolute bottom-4 left-4 right-4">
        <Text className="text-white text-lg font-semibold">{title}</Text>

        <View className="flex-row items-center mt-1">
          <Text className="text-white/90 text-xs">
            {startDate} - {endDate}
          </Text>

          <Text className="text-white/90 text-xs ml-3">{places} places</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;
