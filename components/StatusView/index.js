import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

// Mostra os estados de uma busca de dados: carregando, erro ou lista vazia.
// tipo: 'carregando' | 'erro' | 'vazio'
const StatusView = ({ tipo, mensagem, onRetry, icone }) => {
  if (tipo === 'carregando') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text style={styles.mensagem}>{mensagem || 'Carregando...'}</Text>
      </View>
    );
  }

  const ehErro = tipo === 'erro';

  return (
    <View style={styles.container}>
      <Ionicons
        name={icone || (ehErro ? 'cloud-offline-outline' : 'file-tray-outline')}
        size={40}
        color={ehErro ? '#E53935' : '#9ca3af'}
      />
      <Text style={styles.mensagem}>
        {mensagem || (ehErro ? 'Não foi possível carregar.' : 'Nada por aqui ainda.')}
      </Text>

      {ehErro && !!onRetry && (
        <TouchableOpacity style={styles.botao} onPress={onRetry}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StatusView;
