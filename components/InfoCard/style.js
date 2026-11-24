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
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cabecalho: {
    flex: 1,
    marginHorizontal: 12,
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitulo: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  badge: {
    marginTop: 6,
  },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  acaoTexto: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linhaTexto: {
    flex: 1,
    fontSize: 12,
    color: '#4b5563',
    marginLeft: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagTexto: {
    fontSize: 11,
    color: '#374151',
  },
});

export default styles;
