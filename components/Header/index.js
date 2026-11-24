import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

import SearchBar from '../SearchBar';

// Cabeçalho azul da Home: marca, sino de avisos e barra de busca.
const Header = ({
  nomePrefeitura,
  busca,
  onChangeBusca,
  onBuscar,
  onNotificacoesPress,
  temAvisos = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <View style={styles.headerTop}>
        <View style={styles.headerBrand}>
          <View style={styles.logoIconContainer}>
            <FontAwesome5 name="city" size={18} color="#fff" />
          </View>

          <View>
            <Text style={styles.welcomeText}>{nomePrefeitura || 'Bem-vindo ao'}</Text>
            <Text style={styles.appTitle}>Minha Prefeitura</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={onNotificacoesPress}
          accessibilityLabel="Ver avisos"
        >
          <Ionicons name="notifications-outline" size={20} color="#fff" />
          {temAvisos && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View>

      <SearchBar
        value={busca}
        onChangeText={onChangeBusca}
        onSubmit={onBuscar}
        placeholder="Buscar notícias..."
      />
    </View>
  );
};

export default Header;
