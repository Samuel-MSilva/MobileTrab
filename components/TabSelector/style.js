import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 3,
    marginHorizontal: 16,
    marginTop: 14,
  },
  aba: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  abaAtiva: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  texto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  textoAtivo: {
    color: '#1d4ed8',
  },
});

export default styles;
