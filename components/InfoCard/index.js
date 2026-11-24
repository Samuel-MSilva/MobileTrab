import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

import Badge from '../Badge';

// Card genérico de informação (telefones, farmácias, ecopontos...).
// icone / cor: ícone Ionicons à esquerda
// linhas: [{ icone, texto }] linhas de detalhe (endereço, horário...)
// tags: ['Papel', 'Vidro'] chips pequenos
// badge: { label, cor } etiqueta ao lado do título
// acao: { label, icone, onPress } botão à direita (ex.: Ligar)
const InfoCard = ({ icone, cor = '#1d4ed8', titulo, subtitulo, linhas = [], tags = [], badge, acao }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={[styles.iconBox, { backgroundColor: `${cor}1A` }]}>
          <Ionicons name={icone} size={20} color={cor} />
        </View>

        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>{titulo}</Text>
          {!!subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
          {!!badge && (
            <View style={styles.badge}>
              <Badge label={badge.label} cor={badge.cor} />
            </View>
          )}
        </View>

        {!!acao && (
          <TouchableOpacity style={[styles.acao, { backgroundColor: cor }]} onPress={acao.onPress}>
            <Ionicons name={acao.icone} size={16} color="#ffffff" />
            <Text style={styles.acaoTexto}>{acao.label}</Text>
          </TouchableOpacity>
        )}
      </View>

      {linhas.map((linha, i) => (
        <View key={i} style={styles.linha}>
          <Ionicons name={linha.icone} size={14} color="#6b7280" />
          <Text style={styles.linhaTexto}>{linha.texto}</Text>
        </View>
      ))}

      {tags.length > 0 && (
        <View style={styles.tags}>
          {tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagTexto}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default InfoCard;
