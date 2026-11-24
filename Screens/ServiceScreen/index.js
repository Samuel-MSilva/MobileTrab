import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import ServiceCard from '../../components/ServiceCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import { getServicos } from '../../services/api';

// Aba Serviços: lista completa dos serviços do app, cada um abre seu módulo.
export default function ServiceScreen() {
  const navigation = useNavigation();
  const { dados: servicos, carregando, erro, recarregar } = useCarregar(getServicos);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Serviços" showBack={false} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          Escolha um serviço para falar com a prefeitura, consultar informações ou participar das
          decisões da cidade.
        </Text>

        {carregando && <StatusView tipo="carregando" />}
        {!carregando && !!erro && <StatusView tipo="erro" mensagem={erro} onRetry={recarregar} />}

        {!carregando &&
          !!servicos &&
          servicos.map((servico) => (
            <ServiceCard
              key={servico.id}
              variante="lista"
              title={servico.nome}
              description={servico.descricao}
              icon={servico.icone}
              onPress={() => navigation.navigate(servico.rota)}
            />
          ))}
      </ScrollView>
    </View>
  );
}
