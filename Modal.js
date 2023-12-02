import { useCallback, useState } from "react";
import { Pressable, ScrollView, View, Text } from "react-native";
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  RectButton,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import GenreSelector from "./GenreSelector";
import { styles } from "./styles";
import { OVERDRAG, HEIGHT } from "./constants";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Modal({ toggleSheet, initialGenres, setGenres }) {
  const [currentGenres, setCurrentGenres] = useState(initialGenres);
  const offset = useSharedValue(0);

  const save = useCallback(() => {
    setGenres(currentGenres);
    toggleSheet();
  }, [currentGenres, setGenres, toggleSheet]);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  return (
    <>
      <AnimatedPressable
        style={styles.backdrop}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={toggleSheet}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.sheet, translateY]}
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Choose</Text>
          </View>

          <ScrollView>
            {currentGenres.map((genre, index) => (
              <GenreSelector
                key={index}
                genre={genre.name}
                selected={genre.selected}
                last={index == currentGenres.length - 1}
                setCurrentGenres={setCurrentGenres}
              />
            ))}
          </ScrollView>

          <RectButton
            style={[styles.button, styles.horizontalMargin]}
            onPress={save}
          >
            <Text style={styles.buttonText}>Save</Text>
          </RectButton>
        </Animated.View>
      </GestureDetector>
    </>
  );
}
