import { useState } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import TabSelector from '../../components/TabSelector';
import InfoCard from '../../components/InfoCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import { getTelefonesUteis, getFarmaciasPlantao, getPontosColeta } from '../../services/api';

const ABAS = [
  { id: 'telefones', label: 'Telefones' },
  { id: 'farmacias', label: 'Farmácias' },
  { id: 'coleta', label: 'Ecopontos' },
];

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Ícone e cor por categoria de telefone
const ESTILO_TELEFONE = {
  Emergência: { icone: 'medkit-outline', cor: '#E53935' },
  Segurança: { icone: 'shield-checkmark-outline', cor: '#6d28d9' },
  Prefeitura: { icone: 'business-outline', cor: '#1d4ed8' },
};

const ligar = (numero) => Linking.openURL(`tel:${numero.replace(/\D/g, '')}`);

// Mostra carregando / erro / vazio ou a lista
function Conteudo({ estado, vazio, children }) {
  if (estado.carregando) return <StatusView tipo="carregando" />;
  if (estado.erro) return <StatusView tipo="erro" mensagem={estado.erro} onRetry={estado.recarregar} />;
  if (!estado.dados?.length) return <StatusView tipo="vazio" mensagem={vazio} />;
  return children(estado.dados);
}

function Telefones() {
  const estado = useCarregar(getTelefonesUteis);
  return (
    <Conteudo estado={estado} vazio="Nenhum telefone cadastrado.">
      {(telefones) =>
        telefones.map((tel) => {
          const estilo = ESTILO_TELEFONE[tel.categoria] || ESTILO_TELEFONE.Prefeitura;
          return (
            <InfoCard
              key={tel.id}
              icone={estilo.icone}
              cor={estilo.cor}
              titulo={`${tel.nome} · ${tel.numero}`}
              subtitulo={tel.descricao}
              acao={{ label: 'Ligar', icone: 'call', onPress: () => ligar(tel.numero) }}
            />
          );
        })
      }
    </Conteudo>
  );
}

function Farmacias() {
  const estado = useCarregar(getFarmaciasPlantao);
  const hoje = new Date().getDay();

  return (
    <Conteudo estado={estado} vazio="Nenhuma farmácia cadastrada.">
      {(farmacias) => {
        // Quem está de plantão hoje aparece primeiro
        const ordenadas = [...farmacias].sort(
          (a, b) => Number(b.plantao.includes(hoje)) - Number(a.plantao.includes(hoje))
        );

        return (
          <>
            <Text style={styles.dica}>Hoje é {DIAS[hoje]}. Farmácias de plantão aparecem primeiro.</Text>
            {ordenadas.map((farmacia) => {
              const deplantao = farmacia.plantao.includes(hoje);
              return (
                <InfoCard
                  key={farmacia.id}
                  icone="medical-outline"
                  cor="#43A047"
                  titulo={farmacia.nome}
                  badge={
                    deplantao
                      ? { label: 'De plantão hoje', cor: '#43A047' }
                      : { label: 'Fora do plantão hoje', cor: '#6b7280' }
                  }
                  linhas={[
                    { icone: 'location-outline', texto: farmacia.endereco },
                    { icone: 'time-outline', texto: farmacia.horario },
                    {
                      icone: 'calendar-outline',
                      texto: `Plantão: ${farmacia.plantao.map((d) => DIAS[d]).join(', ')}`,
                    },
                  ]}
                  acao={{ label: 'Ligar', icone: 'call', onPress: () => ligar(farmacia.telefone) }}
                />
              );
            })}
          </>
        );
      }}
    </Conteudo>
  );
}

function Ecopontos() {
  const estado = useCarregar(getPontosColeta);
  return (
    <Conteudo estado={estado} vazio="Nenhum ecoponto cadastrado.">
      {(pontos) => (
        <>
          <Text style={styles.dica}>
            Leve o material limpo e separado. Veja abaixo o que cada ponto recebe.
          </Text>
          {pontos.map((ponto) => (
            <InfoCard
              key={ponto.id}
              icone="leaf-outline"
              cor="#0f766e"
              titulo={ponto.nome}
              linhas={[
                { icone: 'location-outline', texto: ponto.endereco },
                { icone: 'time-outline', texto: ponto.horario },
              ]}
              tags={ponto.materiais}
            />
          ))}
        </>
      )}
    </Conteudo>
  );
}

// Módulo 2 - Utilidade Pública
// Telefones úteis (com ligação direta), farmácias de plantão e ecopontos.
export default function UtilidadePublicaScreen({ route }) {
  const [aba, setAba] = useState(route.params?.aba || 'telefones');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Utilidade Pública" />
      <TabSelector opcoes={ABAS} valor={aba} onChange={setAba} />

      <ScrollView contentContainerStyle={styles.content}>
        {aba === 'telefones' && <Telefones />}
        {aba === 'farmacias' && <Farmacias />}
        {aba === 'coleta' && <Ecopontos />}
      </ScrollView>
    </View>
  );
}
