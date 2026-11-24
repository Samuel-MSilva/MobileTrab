import { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import EnqueteCard from '../../components/EnqueteCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import { getEnquetes, votarEnquete } from '../../services/api';

// Módulo 3 - Enquetes / Consulta Popular
// O cidadão vota uma vez por enquete e vê o resultado parcial na hora.
export default function EnquetesScreen() {
  const { dados, setDados, carregando, erro, recarregar } = useCarregar(getEnquetes);
  const [votandoId, setVotandoId] = useState(null);
  const [erroVoto, setErroVoto] = useState(null);

  const votar = async (enqueteId, opcaoId) => {
    setVotandoId(enqueteId);
    setErroVoto(null);
    try {
      const atualizada = await votarEnquete(enqueteId, opcaoId);
      setDados((lista) => lista.map((e) => (e.id === enqueteId ? atualizada : e)));
    } catch (e) {
      setErroVoto(e.message);
    } finally {
      setVotandoId(null);
    }
  };

  // Abertas primeiro
  const enquetes = [...(dados || [])].sort((a, b) => Number(a.encerrada) - Number(b.encerrada));

  return (
    <View style={styles.container}>
      <ScreenHeader title="Enquetes" />

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={carregando && !!dados} onRefresh={recarregar} />}
      >
        <View style={styles.intro}>
          <Ionicons name="people-outline" size={22} color="#1d4ed8" />
          <Text style={styles.introTexto}>
            Sua opinião ajuda a prefeitura a decidir as prioridades da cidade. Cada pessoa vota uma
            vez por enquete.
          </Text>
        </View>

        {!!erroVoto && <Text style={styles.erro}>{erroVoto}</Text>}

        {carregando && !dados && <StatusView tipo="carregando" />}
        {!!erro && <StatusView tipo="erro" mensagem={erro} onRetry={recarregar} />}
        {dados?.length === 0 && <StatusView tipo="vazio" mensagem="Nenhuma enquete no momento." />}

        {enquetes.map((enquete) => (
          <EnqueteCard
            key={enquete.id}
            enquete={enquete}
            onVotar={(opcaoId) => votar(enquete.id, opcaoId)}
            votando={votandoId === enquete.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
