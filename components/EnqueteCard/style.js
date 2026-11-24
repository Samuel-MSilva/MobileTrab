import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prazo: {
    fontSize: 11,
    color: '#6b7280',
  },
  pergunta: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 10,
  },
  descricao: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    lineHeight: 17,
  },
  opcoes: {
    marginTop: 12,
  },
  opcaoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1d4ed8',
    marginRight: 10,
  },
  opcaoTexto: {
    fontSize: 13,
    color: '#374151',
  },
  spinner: {
    marginTop: 4,
  },
  resultado: {
    marginBottom: 10,
  },
  resultadoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resultadoNome: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  check: {
    marginRight: 4,
  },
  meuVoto: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  pct: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 8,
  },
  barraFundo: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barra: {
    height: 8,
    backgroundColor: '#93c5fd',
    borderRadius: 4,
  },
  barraMeuVoto: {
    backgroundColor: '#1d4ed8',
  },
  total: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default styles;
