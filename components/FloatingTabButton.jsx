import { StyleSheet, TouchableOpacity, View } from "react-native";

/**
 * A circular elevated button that floats above the tab bar.
 * Used for the center “+” action in the bottom navigation.
 *
 * The component expects to receive the props from react-navigation's
 * `tabBarButton` option, including `children` (usually the icon) and
 * `onPress`.
 */
const FloatingTabButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e68619",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FloatingTabButton;
