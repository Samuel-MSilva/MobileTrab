import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 38,
    paddingRight: 38,
    fontSize: 13,
    color: '#1f2937',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 2,
  },
});

export default styles;
