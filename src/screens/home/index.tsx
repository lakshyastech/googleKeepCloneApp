import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Note from '../../components/note';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/searchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../utils/theme/images';
import styles from './style'
import { s } from 'react-native-size-matters';

interface Note {
  id: number;
  title: string;
  content: string;
  noteColor: string;
}

interface HomeProps {
  route: { params?: { note?: Note } };
  navigation: { navigate: (screen: string, params?: { note?: Note } ) => void };
}

const Home: React.FC<HomeProps> = ({ route, navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [noResultfound, setNoResultFound] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotes();
    setRefreshing(false);
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@myApp:notes');
      if (storedNotes) {
        const parsedNotes: Note[] = JSON.parse(storedNotes);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.log('Error loading notes from AsyncStorage:', error);
    }
  };

  const handleSearch = (searchText: string) => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNotes(filtered);
    setNoResultFound(notes.length > 0 && filtered.length === 0);
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setFilteredNotes([]);
    saveNotes(updatedNotes);
    setNotes(updatedNotes);
    loadNotes();
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('@myApp:notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.log('Error saving notes to AsyncStorage:', error);
    }
  };

  const renderNotes = ({ item, index }: { item: Note; index: number}) => {
    return (
      <View key={item.id}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('CreateNote', { note : item })}
        >
          <Note
            title={item.title}
            content={item.content}
            onDelete={() => handleDeleteNote(index)}
            color={item.noteColor}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyView = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <Text style={styles.emptyViewText}>No Notes Available
        </Text>
      </View>
    );
  };
  
  const renderNoResultView = () => {
    return (
      <View style={styles.noResultViewContainer}>
        <Text style={styles.emptyViewText}>No match found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={false} backgroundColor="#20232a" />
      <SearchBar onSearch={handleSearch} />
      <FlatList
       data={filteredNotes.length > 0 ? filteredNotes : (noResultfound ? [] : notes)}
        renderItem={renderNotes}
        keyExtractor={(item, index): any => index.toString()}
        contentContainerStyle={{ paddingHorizontal: s(10), paddingBottom: s(10) }}
        ListEmptyComponent={noResultfound ? renderNoResultView : renderEmptyView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.addButtonWrapper}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateNote')}>
          <Image resizeMode="contain" source={Images.add} style={styles.addButtonImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
