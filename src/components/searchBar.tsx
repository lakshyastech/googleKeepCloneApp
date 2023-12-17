import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import Images from '../utils/theme/images';
import { ms, s, vs } from 'react-native-size-matters';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<TextInput>(null);

  const debouncedSearch = _.debounce((text: string) => {
    onSearch(text);
  }, 300);

  const handleSearch = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        searchRef.current?.focus();
      }}
    >
      <Image
        resizeMode='contain'
        source={Images.search}
        style={styles.searchBtn}
      />
      <TextInput
        ref={searchRef}
        style={styles.input}
        placeholder="Search notes..."
        placeholderTextColor={'#000'}
        value={searchText}
        onChangeText={(text) => handleSearch(text)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
    borderColor: '#000',
    borderRadius: s(10),
    margin: s(10),
    marginBottom: s(5),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: s(3),
  },
  input: {
    flex: 1,
    color: '#000',
    height: s(45),
    fontSize: s(16),
    paddingHorizontal: ms(8),
  },
  searchBtn: {
    height: s(20),
    width: s(20),
    tintColor: '#000',
  },
});

export default SearchBar;
