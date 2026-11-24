import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

import Badge from '../Badge';
import { formatarData } from '../../utils/formatadores';

// Card de enquete.
// Antes do voto: mostra as opções como botões.
// Depois do voto (ou se encerrada): mostra o resultado em barras com %.
// enquete: { pergunta, descricao, encerraEm, opcoes, encerrada, votoUsuario }
// onVotar(opcaoId)  |  votando: true enquanto o voto é enviado
const EnqueteCard = ({ enquete, onVotar, votando = false }) => {
  const { pergunta, descricao, encerraEm, opcoes, encerrada, votoUsuario } = enquete;
  const podeVotar = !encerrada && votoUsuario == null;
  const totalVotos = opcoes.reduce((soma, o) => soma + o.votos, 0);

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Badge
          label={encerrada ? 'Encerrada' : 'Aberta'}
          cor={encerrada ? '#6b7280' : '#43A047'}
        />
        <Text style={styles.prazo}>
          {encerrada ? 'Encerrou em' : 'Até'} {formatarData(encerraEm)}
        </Text>
      </View>

      <Text style={styles.pergunta}>{pergunta}</Text>
      {!!descricao && <Text style={styles.descricao}>{descricao}</Text>}

      {podeVotar ? (
        <View style={styles.opcoes}>
          {opcoes.map((opcao) => (
            <TouchableOpacity
              key={opcao.id}
              style={styles.opcaoBotao}
              onPress={() => onVotar(opcao.id)}
              disabled={votando}
              activeOpacity={0.8}
            >
              <View style={styles.radio} />
              <Text style={styles.opcaoTexto}>{opcao.texto}</Text>
            </TouchableOpacity>
          ))}
          {votando && <ActivityIndicator style={styles.spinner} color="#1d4ed8" />}
        </View>
      ) : (
        <View style={styles.opcoes}>
          {opcoes.map((opcao) => {
            const pct = totalVotos ? Math.round((opcao.votos / totalVotos) * 100) : 0;
            const meuVoto = opcao.id === votoUsuario;

            return (
              <View key={opcao.id} style={styles.resultado}>
                <View style={styles.resultadoTopo}>
                  <View style={styles.resultadoNome}>
                    {meuVoto && (
                      <Ionicons name="checkmark-circle" size={15} color="#1d4ed8" style={styles.check} />
                    )}
                    <Text style={[styles.opcaoTexto, meuVoto && styles.meuVoto]}>{opcao.texto}</Text>
                  </View>
                  <Text style={styles.pct}>{pct}%</Text>
                </View>
                <View style={styles.barraFundo}>
                  <View
                    style={[styles.barra, { width: `${pct}%` }, meuVoto && styles.barraMeuVoto]}
                  />
                </View>
              </View>
            );
          })}

          <Text style={styles.total}>
            {totalVotos} votos
            {votoUsuario != null ? ' · Obrigado por participar!' : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

export default EnqueteCard;
