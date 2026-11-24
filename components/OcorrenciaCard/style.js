import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    marginBottom: 10,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cabecalho: {
    flex: 1,
    marginHorizontal: 12,
  },
  categoria: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  protocolo: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  descricao: {
    fontSize: 13,
    color: '#374151',
    marginTop: 10,
    lineHeight: 18,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  linhaTexto: {
    flex: 1,
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
});

export default styles;
