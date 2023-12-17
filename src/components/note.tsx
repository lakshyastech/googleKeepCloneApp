import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Images from '../utils/theme/images';
import { ms, s, vs } from 'react-native-size-matters';

interface NoteProps {
  title: string;
  content: string;
  onDelete: () => void;
  color?: string;
}

const Note: React.FC<NoteProps> = ({ title, content, onDelete, color }) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: onDelete },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: color ? color : '#fff' }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {content}
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={1}>
        <Image
          resizeMode="contain"
          source={Images.delete}
          style={styles.deleteButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: vs(10),
    paddingHorizontal: ms(15),
    marginTop: vs(16),
    borderRadius: s(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: s(3),
    height: vs(90),
  },
  title: {
    fontSize: s(18),
    fontWeight: 'bold',
    marginBottom: vs(7),
  },
  content: {
    fontSize: s(16),
    width: '85%',
  },
  deleteButton: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    right: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonImage: {
    width: s(40),
    height: s(40),
  },
});

export default Note;
