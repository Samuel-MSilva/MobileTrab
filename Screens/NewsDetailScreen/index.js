import { View, Text, Image, ScrollView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import { getNoticiaPorSlug } from '../../services/api';
import { formatarDataHora, htmlParaParagrafos } from '../../utils/formatadores';

// Detalhe da notícia: recebe o `slug` por parâmetro de navegação e busca
// a notícia completa (com `conteudo`), igual ao endpoint de detalhe da API.
export default function NewsDetailScreen({ route }) {
  const slug = route.params?.slug;

  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    if (!slug) throw new Error('Notícia não informada.');
    const resposta = await getNoticiaPorSlug(slug);
    return resposta.data;
  }, [slug]);

  const noticia = dados;

  const compartilhar = async () => {
    if (!noticia) return;
    try {
      await Share.share({ message: `${noticia.titulo}\n\n${noticia.resumo}` });
    } catch {
      // compartilhamento cancelado ou indisponível (ex.: navegador): não faz nada
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notícia"
        rightIcon={noticia ? 'share-social-outline' : undefined}
        onRightPress={compartilhar}
      />

      {carregando && <StatusView tipo="carregando" />}
      {!carregando && !!erro && <StatusView tipo="erro" mensagem={erro} onRetry={recarregar} />}

      {!carregando && !!noticia && (
        <ScrollView contentContainerStyle={styles.content}>
          {!!noticia.imagem_capa_url && (
            <Image source={{ uri: noticia.imagem_capa_url }} style={styles.imagem} />
          )}

          <View style={styles.corpo}>
            <Text style={styles.titulo}>{noticia.titulo}</Text>

            <View style={styles.dataLinha}>
              <Ionicons name="calendar-outline" size={14} color="#6b7280" />
              <Text style={styles.data}>
                Publicado em {formatarDataHora(noticia.publicado_em)}
              </Text>
            </View>

            {!!noticia.resumo && <Text style={styles.resumo}>{noticia.resumo}</Text>}

            <View style={styles.divisor} />

            {htmlParaParagrafos(noticia.conteudo).map((paragrafo, i) => (
              <Text key={i} style={styles.paragrafo}>
                {paragrafo}
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
