import { StyleSheet } from "react-native";
import { vs, ms, s } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: vs(5),
      paddingVertical: vs(10),
      paddingHorizontal: s(7),
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    doneButton: {},
    titleText: {
      color: '#000',
      fontSize: s(16),
    },
    backBtnImage: {
      width: s(20),
      height: s(20),
      tintColor: '#000',
    },
    titleBox: {
      paddingHorizontal: s(15),
      paddingVertical: vs(0),
      fontSize: s(26),
      color: '#000',
      paddingBottom: vs(4),
    },
    contentBox: {
      height: '55%',
      paddingHorizontal: s(15),
      paddingVertical: 0,
      marginTop: vs(5),
      textAlignVertical: 'top',
      fontSize: s(22),
      color: '#000',
    },
    colorPickerContainer: {
      marginHorizontal: s(15),
      position: 'absolute',
      bottom: vs(60),
    },
    undoColorButton: {
      marginHorizontal: 15,
      position: 'absolute',
      bottom: vs(10),
      width: '95%',
      backgroundColor: '#0177D6',
      alignItems: 'center',
      justifyContent: 'center',
      padding: s(10),
      alignSelf: 'center',
      borderRadius: s(8),
    },
    undoColorButtonText: {
      color: 'white',
      fontSize: s(14),
    },
  });

  export default styles