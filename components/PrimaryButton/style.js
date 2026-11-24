import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    height: 48,
    borderRadius: 10,
  },
  botaoInativo: {
    backgroundColor: '#93c5fd',
  },
  icone: {
    marginRight: 8,
  },
  texto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default styles;
