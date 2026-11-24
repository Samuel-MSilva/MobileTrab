import { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import ServiceCard from '../../components/ServiceCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import { getUsuario, getTenant, getOcorrencias } from '../../services/api';
import { formatarData } from '../../utils/formatadores';

async function carregarPerfil() {
  const [usuario, tenantResp, ocorrencias] = await Promise.all([
    getUsuario(),
    getTenant(),
    getOcorrencias(),
  ]);
  return {
    usuario,
    tenant: tenantResp.data,
    chamadosAbertos: ocorrencias.filter((o) => o.status !== 'resolvido').length,
    chamadosTotal: ocorrencias.length,
  };
}

// "Maria da Silva" -> "MS" (primeiro e último nome)
const iniciais = (nome) => {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] || '';
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
};

// Aba Perfil: dados do cidadão (simulado) e atalhos para "minhas coisas".
export default function ProfileScreen() {
  const navigation = useNavigation();
  const { dados, carregando, erro, recarregar } = useCarregar(carregarPerfil);

  // Atualiza o número de chamados sempre que a aba volta a aparecer
  useFocusEffect(
    useCallback(() => {
      recarregar();
    }, [recarregar])
  );

  const atalhos = [
    {
      id: 'chamados',
      titulo: 'Meus chamados',
      descricao: 'Acompanhe o andamento das suas solicitações.',
      icone: 'chatbubbles-outline',
      abrir: () => navigation.navigate('Ouvidoria', { aba: 'acompanhar' }),
    },
    {
      id: 'enquetes',
      titulo: 'Enquetes',
      descricao: 'Participe das consultas populares abertas.',
      icone: 'stats-chart-outline',
      abrir: () => navigation.navigate('Enquetes'),
    },
    {
      id: 'telefones',
      titulo: 'Telefones úteis',
      descricao: 'SAMU, Bombeiros, Defesa Civil e outros.',
      icone: 'call-outline',
      abrir: () => navigation.navigate('UtilidadePublica', { aba: 'telefones' }),
    },
    {
      id: 'farmacias',
      titulo: 'Farmácias de plantão',
      descricao: 'Veja quem está aberto hoje.',
      icone: 'medical-outline',
      abrir: () => navigation.navigate('UtilidadePublica', { aba: 'farmacias' }),
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Perfil" showBack={false} />

      {!dados && carregando && <StatusView tipo="carregando" />}
      {!dados && !!erro && <StatusView tipo="erro" mensagem={erro} onRetry={recarregar} />}

      {!!dados && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.cartao}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>{iniciais(dados.usuario.nome)}</Text>
            </View>
            <Text style={styles.nome}>{dados.usuario.nome}</Text>
            <Text style={styles.email}>{dados.usuario.email}</Text>

            <View style={styles.infoLinha}>
              <Ionicons name="location-outline" size={14} color="#6b7280" />
              <Text style={styles.infoTexto}>
                {dados.usuario.bairro} · {dados.tenant.nome}
              </Text>
            </View>
            <Text style={styles.desde}>
              Cidadão cadastrado desde {formatarData(dados.usuario.cidadaoDesde)}
            </Text>

            <View style={styles.numeros}>
              <View style={styles.numero}>
                <Text style={styles.numeroValor}>{dados.chamadosAbertos}</Text>
                <Text style={styles.numeroRotulo}>Chamados em aberto</Text>
              </View>
              <View style={styles.separador} />
              <View style={styles.numero}>
                <Text style={styles.numeroValor}>{dados.chamadosTotal}</Text>
                <Text style={styles.numeroRotulo}>Chamados no total</Text>
              </View>
            </View>
          </View>

          <Text style={styles.secao}>Atalhos</Text>
          {atalhos.map((atalho) => (
            <ServiceCard
              key={atalho.id}
              variante="lista"
              title={atalho.titulo}
              description={atalho.descricao}
              icon={atalho.icone}
              onPress={atalho.abrir}
            />
          ))}

          <Text style={styles.rodape}>
            Minha Prefeitura · versão 1.0.0{'\n'}Dados simulados para fins acadêmicos.
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
