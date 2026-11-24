import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

import { formatarData } from '../../utils/formatadores';

const TIPO_PADRAO = { rotulo: 'Aviso', cor: '#d97706', icone: 'information-circle-outline' };

// Card de aviso/notificação da prefeitura.
// notificacao: objeto no formato da API ({ titulo, mensagem, enviado_em, link_acao })
// tipoInfo: { rotulo, cor, icone } vindo de tiposNotificacao
// linhas: limita a mensagem (ex.: 2 na Home); sem valor mostra tudo
const AlertCard = ({ notificacao, tipoInfo = TIPO_PADRAO, linhas }) => {
  const { titulo, mensagem, enviado_em, link_acao } = notificacao;
  const { rotulo, cor, icone } = tipoInfo;

  return (
    <View style={[styles.alertCard, { borderLeftColor: cor, backgroundColor: `${cor}14` }]}>
      <Ionicons name={icone} size={22} color={cor} style={styles.icon} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.alertType, { color: cor }]}>{rotulo.toUpperCase()}</Text>
          <Text style={styles.alertDate}>{formatarData(enviado_em)}</Text>
        </View>

        <Text style={styles.alertTitle}>{titulo}</Text>
        <Text style={styles.alertText} numberOfLines={linhas}>
          {mensagem}
        </Text>

        {!!link_acao && (
          <TouchableOpacity onPress={() => Linking.openURL(link_acao)}>
            <Text style={[styles.alertLink, { color: cor }]}>Saiba mais</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AlertCard;
