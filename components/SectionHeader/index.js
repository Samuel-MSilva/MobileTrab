import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

// Título de seção com ação opcional à direita (ex.: "Ver todas").
const SectionHeader = ({ title, actionLabel, onActionPress }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {!!actionLabel && (
          <TouchableOpacity onPress={onActionPress}>
            <Text style={styles.sectionAction}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SectionHeader;
