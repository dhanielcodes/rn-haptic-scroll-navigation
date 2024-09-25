import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
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
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 200,
        }}
        style={styles.container}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setActive(index);
              Haptics.selectionAsync();
              // scrollToItem(index);
            }}
          >
            <View style={active === index ? styles.pinActive : styles.pin}>
              <Text
                style={active === index ? styles.pinTextActive : styles.pinText}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onScroll={({ nativeEvent }) => {
          const offsetX = nativeEvent.contentOffset.x;
          const viewableItems = data.map((_, i) => {
            return {
              index: i,
              isVisible: offsetX >= i * 44 && offsetX < (i + 1) * 44,
            };
          });
          const visibleItem = viewableItems.find((item) => item.isVisible);
          if (visibleItem) {
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
    transform: [{ rotate: "-10deg" }],
    marginLeft: 7,
  },
  pinTextActive: {
    color: "#000",
  },
});
