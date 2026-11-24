import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingBottom: 32,
  },
  imagem: {
    width: '100%',
    height: 220,
    backgroundColor: '#e5e7eb',
  },
  corpo: {
    padding: 20,
  },
  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: 28,
  },
  dataLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  data: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  resumo: {
    fontSize: 15,
    color: '#374151',
    fontStyle: 'italic',
    marginTop: 14,
    lineHeight: 22,
  },
  divisor: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  paragrafo: {
    fontSize: 15,
    color: '#1f2937',
    lineHeight: 24,
    marginBottom: 14,
  },
});

export default styles;
