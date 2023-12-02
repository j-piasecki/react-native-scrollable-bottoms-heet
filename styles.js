import { StyleSheet } from 'react-native';
import * as Colors from './colors';
import * as Consts from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    paddingVertical: 24,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    color: Colors.HEADER_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  fill: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    color: Colors.GENRE_COLOR,
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
  bottomSeparator: {
    borderBottomColor: Colors.SEPARATOR_COLOR,
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: Colors.BUTTON_COLOR,
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.BUTTON_TEXT_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hintText: {
    color: Colors.HINT_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  sheet: {
    backgroundColor: Colors.MODAL_COLOR,
    paddingTop: 16,
    paddingBottom: 56,
    height: Consts.HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: -Consts.OVERDRAG * 1.2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.BACKDROP_COLOR,
    zIndex: 1,
  },
  horizontalMargin: {
    marginHorizontal: 16,
  },
  selectableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalHeaderText: {
    color: Colors.HEADER_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
  },
});