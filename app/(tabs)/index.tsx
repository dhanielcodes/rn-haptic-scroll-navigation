import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useRef, useState } from "react";

export default function HomeScreen() {
  const data = [
    "Clubs",
    "Lounges",
    "Cafes",
    "Clubbs",
    "Loungges",
    "Caffes",
    "Clurbs",
    "Loungees",
    "Cafeas",
    "Cafeass",
  ];

  const [active, setActive] = useState(0); // Track active item
  const flatListRef = useRef<FlatList<string>>(null);

  // Store animated values for each item
  const rotateValues = data.map(() => useRef(new Animated.Value(0)).current);

  // Function to start the rotation when an item is pressed
  const startRotation = (index: number) => {
    setActive(index);

    // Reset rotation for the selected item
    rotateValues[index].setValue(0);

    // Animate rotation
    Animated.timing(rotateValues[index], {
      toValue: 1, // Rotate to 10 degrees
      duration: 500, // Animation duration
      useNativeDriver: true, // Enable native driver
    }).start();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        renderItem={({ item, index }) => {
          // Interpolate the rotateValue to map it to degrees
          const rotateInterpolation = rotateValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "-10deg"], // Rotate from 0 to -10 degrees
          });

          return (
            <TouchableOpacity
              onPress={() => {
                Haptics.selectionAsync();
                startRotation(index);
              }}
            >
              <Animated.View
                style={
                  active === index
                    ? [
                      styles.pinActive,
                      { transform: [{ rotate: rotateInterpolation }] }, // Apply rotation
                    ]
                    : styles.pin
                }
              >
                <Text
                  style={active === index ? styles.pinTextActive : styles.pinText}
                >
                  {item}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        onScroll={({ nativeEvent }) => {
          const offsetX = nativeEvent.contentOffset.x;
          const viewableItems = data.map((_, i) => {
            return {
              index: i,
              isVisible: offsetX > i * 44 && offsetX < (i + 1) * 44,
            };
          });
          const visibleItem = viewableItems.find((item) => item.isVisible);
          if (visibleItem) {
            startRotation(visibleItem.index);
            Haptics.selectionAsync();
            setActive(visibleItem.index);
          }
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  pin: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#6c6c6c",
    borderRadius: 999,
    alignSelf: "flex-start",
    marginLeft: 7,
  },
  pinText: {
    color: "#6c6c6c",
  },
  pinActive: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 999,
    alignSelf: "flex-start",
    marginLeft: 7,
  },
  pinTextActive: {
    color: "#000",
  },
});
