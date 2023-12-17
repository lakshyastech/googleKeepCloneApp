import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../utils/theme/images';
import ColorPicker from 'react-native-wheel-color-picker';
import styles from './style';

interface Note {
  title: string;
  content: string;
  noteColor: string;
}

const CreateNote: React.FC<any> = ({ route, navigation }) => {
  const { note = null } = route.params ?? {};
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [noteColor, setNoteColor] = useState(note ? note.noteColor : '#fff');
  const contentRef = useRef<TextInput>(null);
  const titleRef = useRef<TextInput>(null);

  useEffect(()=>{
    titleRef.current?.focus();
  },[])

  const handleTitleEnter = () => {
    contentRef.current?.focus();
  };

  const onColorChange = (color: string) => {
    setNoteColor(color);
  };

  const revertPicker = () => {
    setNoteColor('#fff');
  };

  const saveNote = async () => {
    try {
      Keyboard.dismiss();
      if (!title.trim() || !content.trim()) {
        Alert.alert('Error', 'Title and content cannot be empty');
        return;
      }
      const existingNotes = await AsyncStorage.getItem('@myApp:notes');
      const parsedNotes: Note[] = existingNotes ? JSON.parse(existingNotes) : [];
      const updatedNotes: Note[] = note
        ? parsedNotes.map((item) => (item.title === note.title ? { ...item, title, content, noteColor } : item))
        : [{ title, content, noteColor }, ...parsedNotes];

      await AsyncStorage.setItem('@myApp:notes', JSON.stringify(updatedNotes));
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: noteColor ? noteColor : '#fff' }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image resizeMode="contain" source={Images.back} style={styles.backBtnImage} />
          <Text style={styles.titleText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton} onPress={saveNote} activeOpacity={1}>
          <Text style={styles.titleText}>Done</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleBox}
        placeholder="Title"
        placeholderTextColor={'#949494'}
        cursorColor={'#000'}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={handleTitleEnter}
        ref={titleRef}
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.contentBox}
        placeholder="Note"
        placeholderTextColor={'#949494'}
        cursorColor={'#000'}
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline
        ref={contentRef}
        blurOnSubmit={false}
      />
      <View style={styles.colorPickerContainer}>
        <ColorPicker color={noteColor} swatchesOnly={true} onColorChange={onColorChange} />
      </View>
      <TouchableOpacity
        onPress={revertPicker}
        style={styles.undoColorButton}
      >
        <Text style={styles.undoColorButtonText}>Undo Color Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNote;
