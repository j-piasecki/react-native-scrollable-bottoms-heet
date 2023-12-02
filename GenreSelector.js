import { useCallback } from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { styles } from "./styles";
import { BUTTON_COLOR } from "./colors";

export default function Genre({ genre, last, selected, setCurrentGenres }) {
  const toggleSelection = useCallback(() => {
    setCurrentGenres((currentGenres) => {
      return currentGenres.map((currentGenre) => {
        if (currentGenre.name == genre) {
          return { ...currentGenre, selected: !currentGenre.selected };
        }
        return currentGenre;
      });
    });
  }, [genre, setCurrentGenres, selected]);

  return (
    <View style={[last ? undefined : styles.bottomSeparator]}>
      <RectButton onPress={toggleSelection}>
        <View style={styles.selectableItem}>
          <Checkbox value={selected} color={BUTTON_COLOR}/>
          <Text style={[styles.genreText, styles.horizontalMargin]}>
            {genre}
          </Text>
        </View>
      </RectButton>
    </View>
  );
}