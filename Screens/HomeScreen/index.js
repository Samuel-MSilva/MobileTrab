import { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

import Header from '../../components/Header';
import AlertCard from '../../components/AlertCard';
import SectionHeader from '../../components/SectionHeader';
import ServiceCard from '../../components/ServiceCard';
import NewsCard from '../../components/NewsCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import {
  getTenant,
  getNotificacoes,
  getServicos,
  getNoticias,
  tiposNotificacao,
} from '../../services/api';
import { formatarData } from '../../utils/formatadores';

// Busca tudo o que a Home mostra de uma vez só.
async function carregarHome() {
  const [tenantResp, avisosResp, servicos, noticiasResp] = await Promise.all([
    getTenant(),
    getNotificacoes({ perPage: 2 }),
    getServicos(),
    getNoticias({ perPage: 3 }),
  ]);

  return {
    tenant: tenantResp.data,
    avisos: avisosResp.data,
    totalAvisos: avisosResp.meta.total,
    servicos,
    noticias: noticiasResp.data,
  };
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState('');
  const { dados, carregando, erro, recarregar } = useCarregar(carregarHome);

  const buscar = (texto) => {
    const termo = (texto || '').trim();
    if (!termo) return;
    navigation.navigate('News', { aba: 'noticias', busca: termo });
    setBusca('');
  };

  const abrirNoticia = (noticia) => navigation.navigate('NewsDetails', { slug: noticia.slug });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={carregando && !!dados} onRefresh={recarregar} />
      }
    >
      <Header
        nomePrefeitura={dados?.tenant?.nome}
        busca={busca}
        onChangeBusca={setBusca}
        onBuscar={buscar}
        temAvisos={dados?.totalAvisos > 0}
        onNotificacoesPress={() => navigation.navigate('News', { aba: 'avisos' })}
      />

      {!dados && carregando && <StatusView tipo="carregando" />}
      {!dados && !!erro && <StatusView tipo="erro" mensagem={erro} onRetry={recarregar} />}

      {!!dados && (
        <>
          {dados.avisos.length > 0 && (
            <>
              <SectionHeader
                title="Avisos da Prefeitura"
                actionLabel={dados.totalAvisos > dados.avisos.length ? 'Ver todos' : undefined}
                onActionPress={() => navigation.navigate('News', { aba: 'avisos' })}
              />
              <View style={styles.section}>
                {dados.avisos.map((aviso) => (
                  <AlertCard
                    key={aviso.id}
                    notificacao={aviso}
                    tipoInfo={tiposNotificacao[aviso.tipo]}
                    linhas={2}
                  />
                ))}
              </View>
            </>
          )}

          <SectionHeader
            title="Serviços e Utilidades"
            actionLabel="Ver todos"
            onActionPress={() => navigation.navigate('Services')}
          />
          <View style={styles.utilitiesGrid}>
            {dados.servicos.map((servico) => (
              <ServiceCard
                key={servico.id}
                title={servico.nome}
                icon={servico.icone}
                onPress={() => navigation.navigate(servico.rota)}
              />
            ))}
          </View>

          <SectionHeader
            title="Últimas Notícias"
            actionLabel="Ver todas"
            onActionPress={() => navigation.navigate('News', { aba: 'noticias' })}
          />
          <View style={styles.section}>
            {dados.noticias.map((noticia) => (
              <NewsCard
                key={noticia.id}
                title={noticia.titulo}
                description={noticia.resumo}
                imageUrl={noticia.imagem_capa_url}
                date={formatarData(noticia.publicado_em)}
                onPress={() => abrirNoticia(noticia)}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}
