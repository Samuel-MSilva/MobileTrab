import { View, Text } from 'react-native';
import styles from './style';

// Etiqueta colorida (status de chamado, "De plantão hoje", "Encerrada"...).
const Badge = ({ label, cor = '#1d4ed8' }) => {
  return (
    <View style={[styles.badge, { backgroundColor: `${cor}1A` }]}>
      <Text style={[styles.texto, { color: cor }]}>{label}</Text>
    </View>
  );
};

export default Badge;
