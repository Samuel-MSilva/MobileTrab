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
  cartao: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTexto: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
  },
  email: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoTexto: {
    fontSize: 12,
    color: '#4b5563',
    marginLeft: 4,
  },
  desde: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  numeros: {
    flexDirection: 'row',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    alignSelf: 'stretch',
  },
  numero: {
    flex: 1,
    alignItems: 'center',
  },
  numeroValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  numeroRotulo: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  separador: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  secao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 22,
    marginBottom: 10,
  },
  rodape: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
});

export default styles;
