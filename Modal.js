import { useCallback, useState } from "react";
import { Pressable, View, Text } from "react-native";
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
  useAnimatedRef,
  useScrollViewOffset,
  useAnimatedProps,
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

  const scrollEnabled = useSharedValue(true);
  const lastPositionY = useSharedValue(0);

  const animatedScrollViewRef = useAnimatedRef();
  const scrollHandler = useScrollViewOffset(animatedScrollViewRef);

  const save = useCallback(() => {
    setGenres(currentGenres);
    toggleSheet();
  }, [currentGenres, setGenres, toggleSheet]);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const scrollProps = useAnimatedProps(() => ({
    scrollEnabled: scrollEnabled.value,
  }));

  const scrollGesture = Gesture.Native();

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onStart(() => {
      scrollEnabled.value = false;
    })
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      scrollEnabled.value = true;

      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    })
    .onTouchesDown((e) => {
      lastPositionY.value = e.changedTouches[0].y;
    })
    .onTouchesMove((e, stateManager) => {
      const change = lastPositionY.value - e.changedTouches[0].y;
      lastPositionY.value = e.changedTouches[0].y;

      if (change < 0 && scrollHandler.value <= 0) {
        stateManager.activate();
      }
    })
    .simultaneousWithExternalGesture(scrollGesture);

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

          <GestureDetector gesture={scrollGesture}>
            <Animated.ScrollView
              ref={animatedScrollViewRef}
              animatedProps={scrollProps}
              scrollEventThrottle={1}
            >
              {currentGenres.map((genre, index) => (
                <GenreSelector
                  key={index}
                  genre={genre.name}
                  selected={genre.selected}
                  last={index == currentGenres.length - 1}
                  setCurrentGenres={setCurrentGenres}
                />
              ))}
            </Animated.ScrollView>
          </GestureDetector>

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
