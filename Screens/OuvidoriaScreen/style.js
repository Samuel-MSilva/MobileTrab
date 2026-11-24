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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    marginTop: 6,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoria: {
    width: '31.5%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  categoriaAtiva: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  categoriaTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginTop: 6,
    textAlign: 'center',
  },
  categoriaTextoAtivo: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 12,
  },
  inputGrande: {
    minHeight: 100,
    marginBottom: 4,
  },
  contador: {
    alignSelf: 'flex-end',
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 8,
  },
  erroBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdecea',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  erroTexto: {
    flex: 1,
    fontSize: 13,
    color: '#b71c1c',
    marginLeft: 6,
  },
  botao: {
    marginTop: 4,
  },
  sucessoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  sucessoConteudo: {
    flex: 1,
    marginHorizontal: 10,
  },
  sucessoTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  sucessoTexto: {
    fontSize: 12,
    color: '#2e7d32',
    marginTop: 2,
  },
});

export default styles;
