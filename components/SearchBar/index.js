import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

// Campo de busca reutilizável (Home e tela de Notícias).
// fundo: cor de fundo do campo (branco no header azul, cinza em telas brancas)
const SearchBar = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Buscar...',
  fundo = '#ffffff',
}) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={18} color="#9ca3af" style={styles.searchIcon} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => onSubmit?.(value)}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        returnKeyType="search"
        style={[styles.searchInput, { backgroundColor: fundo }]}
      />

      {!!value && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChangeText?.('')}
          accessibilityLabel="Limpar busca"
        >
          <Ionicons name="close-circle" size={18} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
