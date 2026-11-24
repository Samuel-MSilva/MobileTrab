import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

import Badge from '../Badge';
import { formatarDataHora } from '../../utils/formatadores';

// Card de um chamado da Ouvidoria.
// categoria: { nome, icone }  |  status: { rotulo, cor }
const OcorrenciaCard = ({ ocorrencia, categoria, status }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={styles.iconBox}>
          <Ionicons name={categoria?.icone || 'document-text-outline'} size={20} color="#1d4ed8" />
        </View>

        <View style={styles.cabecalho}>
          <Text style={styles.categoria}>{categoria?.nome || ocorrencia.categoria}</Text>
          <Text style={styles.protocolo}>Protocolo {ocorrencia.protocolo}</Text>
        </View>

        {!!status && <Badge label={status.rotulo} cor={status.cor} />}
      </View>

      <Text style={styles.descricao}>{ocorrencia.descricao}</Text>

      <View style={styles.linha}>
        <Ionicons name="location-outline" size={14} color="#6b7280" />
        <Text style={styles.linhaTexto}>{ocorrencia.endereco}</Text>
      </View>

      <View style={styles.linha}>
        <Ionicons name="time-outline" size={14} color="#6b7280" />
        <Text style={styles.linhaTexto}>
          Aberto em {formatarDataHora(ocorrencia.criadoEm)}
        </Text>
      </View>
    </View>
  );
};

export default OcorrenciaCard;
