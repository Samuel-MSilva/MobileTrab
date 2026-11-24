import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  intro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  introTexto: {
    flex: 1,
    fontSize: 12,
    color: '#1e3a8a',
    marginLeft: 10,
    lineHeight: 17,
  },
  erro: {
    fontSize: 13,
    color: '#b71c1c',
    backgroundColor: '#fdecea',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default styles;
