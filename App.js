import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import Modal from "./Modal";
import { styles } from "./styles";
import { GENRES } from "./genres";

const INITIAL_GENRES = GENRES.map((genre) => ({
  name: genre,
  selected: false,
}));

function Genre({ genre, last }) {
  return (
    <View style={last ? [] : styles.bottomSeparator}>
      <Text style={styles.genreText}>{genre}</Text>
    </View>
  );
}

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [genres, setGenres] = useState(INITIAL_GENRES);

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return (
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.contentWrapper}>
          <Text style={styles.headerText}>Your favorite genres</Text>

          <View style={styles.fill}>
            {genres.find(x => x.selected) ? (
              <ScrollView>
                {genres.filter(x => x.selected).map((genre, index) => (
                  <Genre
                    key={index}
                    genre={genre.name}
                    last={index == genres.length - 1}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={[styles.fill, styles.alignCenter]}>
                <Text style={styles.hintText}>
                  You don't have any favorite genres yet
                </Text>
              </View>
            )}
          </View>

          <RectButton style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Select genres</Text>
          </RectButton>
        </View>

        {modalVisible && (
          <Modal toggleSheet={toggleModal} initialGenres={genres} setGenres={setGenres} />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
