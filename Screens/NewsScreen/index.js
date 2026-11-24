import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import TabSelector from '../../components/TabSelector';
import SearchBar from '../../components/SearchBar';
import NewsCard from '../../components/NewsCard';
import AlertCard from '../../components/AlertCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import { getNoticias, getNotificacoes, tiposNotificacao } from '../../services/api';
import { formatarData } from '../../utils/formatadores';

const ABAS = [
  { id: 'noticias', label: 'Notícias' },
  { id: 'avisos', label: 'Avisos' },
];

// Poucos itens por página para dar para ver a paginação funcionando
const POR_PAGINA = 4;

// ---------------------------------------------------------------------------
// Aba Notícias: busca + lista paginada (rolagem infinita)
// ---------------------------------------------------------------------------
function ListaNoticias({ buscaInicial }) {
  const navigation = useNavigation();
  const [busca, setBusca] = useState(buscaInicial || '');
  const [termo, setTermo] = useState(buscaInicial || '');
  const [noticias, setNoticias] = useState([]);
  const [meta, setMeta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState(null);
  const ultimaRequisicao = useRef(0);

  // Quando a Home manda uma nova busca
  useEffect(() => {
    if (buscaInicial !== undefined) {
      setBusca(buscaInicial);
      setTermo(buscaInicial);
    }
  }, [buscaInicial]);

  // Espera o usuário parar de digitar (400 ms) antes de buscar
  useEffect(() => {
    const timer = setTimeout(() => setTermo(busca.trim()), 400);
    return () => clearTimeout(timer);
  }, [busca]);

  const carregar = useCallback(
    async (pagina = 1) => {
      const id = ++ultimaRequisicao.current;
      if (pagina === 1) setCarregando(true);
      else setCarregandoMais(true);
      setErro(null);

      try {
        const resposta = await getNoticias({ page: pagina, perPage: POR_PAGINA, q: termo });
        if (id !== ultimaRequisicao.current) return; // resposta antiga, ignora
        setNoticias((anteriores) =>
          pagina === 1 ? resposta.data : [...anteriores, ...resposta.data]
        );
        setMeta(resposta.meta);
      } catch (e) {
        if (id === ultimaRequisicao.current) setErro(e.message);
      } finally {
        if (id === ultimaRequisicao.current) {
          setCarregando(false);
          setCarregandoMais(false);
        }
      }
    },
    [termo]
  );

  useEffect(() => {
    carregar(1);
  }, [carregar]);

  const carregarProxima = () => {
    if (carregando || carregandoMais || !meta) return;
    if (meta.current_page < meta.last_page) carregar(meta.current_page + 1);
  };

  const renderVazio = () => {
    if (carregando) return <StatusView tipo="carregando" />;
    if (erro) return <StatusView tipo="erro" mensagem={erro} onRetry={() => carregar(1)} />;
    return (
      <StatusView
        tipo="vazio"
        icone="search-outline"
        mensagem={termo ? `Nenhuma notícia encontrada para "${termo}".` : 'Nenhuma notícia publicada.'}
      />
    );
  };

  return (
    <FlatList
      data={noticias}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.lista}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.buscaContainer}>
          <SearchBar
            value={busca}
            onChangeText={setBusca}
            onSubmit={() => setTermo(busca.trim())}
            placeholder="Buscar por título ou resumo..."
            fundo="#e5e7eb"
          />
          {!!meta && !carregando && (
            <Text style={styles.contador}>
              {meta.total} {meta.total === 1 ? 'notícia' : 'notícias'}
            </Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <NewsCard
          title={item.titulo}
          description={item.resumo}
          imageUrl={item.imagem_capa_url}
          date={formatarData(item.publicado_em)}
          onPress={() => navigation.navigate('NewsDetails', { slug: item.slug })}
        />
      )}
      ListEmptyComponent={renderVazio}
      ListFooterComponent={
        carregandoMais ? <ActivityIndicator style={styles.rodape} color="#1d4ed8" /> : null
      }
      onEndReached={carregarProxima}
      onEndReachedThreshold={0.3}
      refreshControl={
        <RefreshControl
          refreshing={carregando && noticias.length > 0}
          onRefresh={() => carregar(1)}
        />
      }
    />
  );
}

// ---------------------------------------------------------------------------
// Aba Avisos: filtro por tipo + lista de notificações
// ---------------------------------------------------------------------------
const FILTROS = [{ id: null, rotulo: 'Todos' }].concat(
  Object.entries(tiposNotificacao).map(([id, info]) => ({ id, rotulo: info.rotulo }))
);

function ListaAvisos() {
  const [tipo, setTipo] = useState(null);
  const { dados, carregando, erro, recarregar } = useCarregar(
    () => getNotificacoes({ tipo, perPage: 50 }),
    [tipo]
  );
  const avisos = dados?.data ?? [];

  return (
    <FlatList
      data={carregando ? [] : avisos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.lista}
      ListHeaderComponent={
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtros}
        >
          {FILTROS.map((filtro) => {
            const ativo = filtro.id === tipo;
            return (
              <TouchableOpacity
                key={filtro.rotulo}
                style={[styles.filtro, ativo && styles.filtroAtivo]}
                onPress={() => setTipo(filtro.id)}
              >
                <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>
                  {filtro.rotulo}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      }
      renderItem={({ item }) => (
        <AlertCard notificacao={item} tipoInfo={tiposNotificacao[item.tipo]} />
      )}
      ListEmptyComponent={
        carregando ? (
          <StatusView tipo="carregando" />
        ) : erro ? (
          <StatusView tipo="erro" mensagem={erro} onRetry={recarregar} />
        ) : (
          <StatusView
            tipo="vazio"
            icone="notifications-off-outline"
            mensagem="Nenhum aviso ativo deste tipo."
          />
        )
      }
    />
  );
}

// ---------------------------------------------------------------------------
// Tela
// ---------------------------------------------------------------------------
export default function NewsScreen({ route }) {
  const [aba, setAba] = useState(route.params?.aba || 'noticias');

  // A Home pode abrir esta aba já em "Avisos" ou com uma busca
  useEffect(() => {
    if (route.params?.aba) setAba(route.params.aba);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Notícias e Avisos" showBack={false} />
      <TabSelector opcoes={ABAS} valor={aba} onChange={setAba} />

      {aba === 'noticias' ? (
        <ListaNoticias buscaInicial={route.params?.busca} />
      ) : (
        <ListaAvisos />
      )}
    </View>
  );
}
