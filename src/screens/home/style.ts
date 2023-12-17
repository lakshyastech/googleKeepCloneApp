import { StyleSheet } from "react-native";
import { vs, ms, s, mvs } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
    },
    addButtonWrapper: {
      position: 'absolute',
      bottom: vs(35),
      right: ms(25),
      borderRadius: s(40),
      overflow: 'hidden',
      width: s(80),
      height: s(80),
    },
    addButton: {
      flex: 1,
    },
    addButtonImage: {
      width: '100%',
      height: '100%',
    },
    emptyViewContainer: {
      marginTop: '90%',
      alignItems: 'center',
    },
    noResultViewContainer: {
      marginTop: '10%',
      alignItems: 'center',
    },
    emptyViewText: {
      color: '#000',
      fontSize: s(16)
    },
  });

  export default styles