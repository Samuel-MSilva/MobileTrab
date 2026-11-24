import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

// Botão principal (azul). Mostra um spinner enquanto `carregando`.
const PrimaryButton = ({ title, onPress, icone, disabled = false, carregando = false }) => {
  const inativo = disabled || carregando;

  return (
    <TouchableOpacity
      style={[styles.botao, inativo && styles.botaoInativo]}
      onPress={onPress}
      disabled={inativo}
      activeOpacity={0.85}
    >
      {carregando ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          {!!icone && <Ionicons name={icone} size={18} color="#ffffff" style={styles.icone} />}
          <Text style={styles.texto}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
