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

export default function TabTwoScreen() {
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

  const [active, setActive] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  /*   const onChange = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      console.log("Visible items:", viewableItems);
      const firstViewableItem = viewableItems[0];
      setActive(firstViewableItem.index);
      Haptics.selectionAsync();
    }
  }).current; */
  /*   const scrollToItem = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: false });
    }
  }; */
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Function to start the rotation animation
  const startRotation = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-10deg'],
  });

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
        //onViewableItemsChanged={onChange}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              //  setActive(index);
              Haptics.selectionAsync();
              // scrollToItem(index);
            }}
          >
            <Animated.View style={active === index ? [
              styles.pinActive,
              /* { transform: [{ rotate: rotateInterpolation }] } */, // Apply rotation
            ] : styles.pin}>
              <Text
                style={active === index ? styles.pinTextActive : styles.pinText}
              >
                {item}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        )}
        onScroll={({ nativeEvent }) => {
          const offsetX = nativeEvent.contentOffset.x;
          const viewableItems = data.map((_, i) => {
            return {
              index: i,
              isVisible: offsetX > i * 43 && offsetX < (i + 1) * 43,
            };
          });
          const visibleItem = viewableItems.find((item) => item.isVisible);
          if (visibleItem) {
            Haptics.selectionAsync();
            startRotation()
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "transparent",
    borderBottomWidth: 2,
    alignSelf: "flex-start",
    marginLeft: 7,
  },
  pinText: {
    color: "#fff",
  },
  pinActive: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "#fff",
    alignSelf: "flex-start",
    //transform: [{ rotate: "-10deg" }],
    marginLeft: 7,
  },
  pinTextActive: {
    color: "#fff",
  },
});
