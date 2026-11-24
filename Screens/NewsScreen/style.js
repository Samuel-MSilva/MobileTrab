import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  buscaContainer: {
    paddingTop: 14,
    paddingBottom: 6,
  },
  contador: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 10,
  },
  rodape: {
    marginVertical: 16,
  },
  filtros: {
    paddingVertical: 14,
    gap: 8,
  },
  filtro: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filtroAtivo: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  filtroTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  filtroTextoAtivo: {
    color: '#ffffff',
  },
});

export default styles;
