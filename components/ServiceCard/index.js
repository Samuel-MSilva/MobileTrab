import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

// Atalho de serviço.
// variante 'grade': quadradinho com ícone e nome (Home)
// variante 'lista': linha com ícone, nome e descrição (aba Serviços)
// icon: nome de ícone do Ionicons (mesmo padrão do mockData)
const ServiceCard = ({ title, description, icon, onPress, variante = 'grade' }) => {
  if (variante === 'lista') {
    return (
      <TouchableOpacity style={styles.listItem} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={22} color="#1d4ed8" />
        </View>

        <View style={styles.listContent}>
          <Text style={styles.listTitle}>{title}</Text>
          {!!description && <Text style={styles.listDescription}>{description}</Text>}
        </View>

        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color="#1d4ed8" />
      </View>
      <Text style={styles.gridText} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;
