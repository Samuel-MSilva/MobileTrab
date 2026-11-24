import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';

import ScreenHeader from '../../components/ScreenHeader';
import TabSelector from '../../components/TabSelector';
import PrimaryButton from '../../components/PrimaryButton';
import OcorrenciaCard from '../../components/OcorrenciaCard';
import StatusView from '../../components/StatusView';

import useCarregar from '../../hooks/useCarregar';
import {
  getCategoriasOcorrencia,
  getOcorrencias,
  criarOcorrencia,
  statusOcorrencia,
} from '../../services/api';

const ABAS = [
  { id: 'novo', label: 'Novo chamado' },
  { id: 'acompanhar', label: 'Meus chamados' },
];

const LIMITE_DESCRICAO = 500;

// Módulo 1 - Ouvidoria / Fala Cidadão
// Registrar problemas da cidade (buraco, lâmpada, poda...) e acompanhar o status.
export default function OuvidoriaScreen({ route }) {
  const [aba, setAba] = useState(route.params?.aba || 'novo');

  // formulário
  const [categoria, setCategoria] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState(null);
  const [chamadoCriado, setChamadoCriado] = useState(null);

  const categorias = useCarregar(getCategoriasOcorrencia);
  const ocorrencias = useCarregar(getOcorrencias);

  const buscarCategoria = (id) => categorias.dados?.find((c) => c.id === id);

  const enviar = async () => {
    if (!categoria) return setErroForm('Escolha o tipo do problema.');
    if (descricao.trim().length < 10) return setErroForm('Descreva o problema (mínimo 10 caracteres).');
    if (endereco.trim().length < 5) return setErroForm('Informe o endereço ou um ponto de referência.');

    setErroForm(null);
    setEnviando(true);
    try {
      const novo = await criarOcorrencia({ categoria, descricao, endereco });
      setChamadoCriado(novo);
      setCategoria(null);
      setDescricao('');
      setEndereco('');
      await ocorrencias.recarregar();
      setAba('acompanhar');
    } catch (e) {
      setErroForm(e.message);
    } finally {
      setEnviando(false);
    }
  };

  const renderFormulario = () => (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>1. Qual é o problema?</Text>

      {categorias.carregando && <StatusView tipo="carregando" />}
      {!!categorias.erro && (
        <StatusView tipo="erro" mensagem={categorias.erro} onRetry={categorias.recarregar} />
      )}

      <View style={styles.categorias}>
        {(categorias.dados || []).map((cat) => {
          const ativa = cat.id === categoria;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoria, ativa && styles.categoriaAtiva]}
              onPress={() => setCategoria(cat.id)}
              activeOpacity={0.8}
            >
              <Ionicons name={cat.icone} size={22} color={ativa ? '#ffffff' : '#1d4ed8'} />
              <Text style={[styles.categoriaTexto, ativa && styles.categoriaTextoAtivo]}>
                {cat.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>2. Descreva o que está acontecendo</Text>
      <TextInput
        style={[styles.input, styles.inputGrande]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex.: Buraco grande perto do ponto de ônibus, já causou acidentes."
        placeholderTextColor="#9ca3af"
        multiline
        maxLength={LIMITE_DESCRICAO}
        textAlignVertical="top"
      />
      <Text style={styles.contador}>
        {descricao.length}/{LIMITE_DESCRICAO}
      </Text>

      <Text style={styles.label}>3. Onde fica?</Text>
      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Rua, número, bairro ou ponto de referência"
        placeholderTextColor="#9ca3af"
      />

      {!!erroForm && (
        <View style={styles.erroBox}>
          <Ionicons name="alert-circle-outline" size={16} color="#E53935" />
          <Text style={styles.erroTexto}>{erroForm}</Text>
        </View>
      )}

      <View style={styles.botao}>
        <PrimaryButton
          title="Enviar chamado"
          icone="send-outline"
          onPress={enviar}
          carregando={enviando}
        />
      </View>
    </ScrollView>
  );

  const renderAcompanhamento = () => (
    <ScrollView contentContainerStyle={styles.content}>
      {!!chamadoCriado && (
        <View style={styles.sucessoBox}>
          <Ionicons name="checkmark-circle" size={22} color="#43A047" />
          <View style={styles.sucessoConteudo}>
            <Text style={styles.sucessoTitulo}>Chamado registrado!</Text>
            <Text style={styles.sucessoTexto}>
              Protocolo {chamadoCriado.protocolo}. Acompanhe o andamento por aqui.
            </Text>
          </View>
          <TouchableOpacity onPress={() => setChamadoCriado(null)}>
            <Ionicons name="close" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>
      )}

      {ocorrencias.carregando && !ocorrencias.dados && <StatusView tipo="carregando" />}
      {!!ocorrencias.erro && (
        <StatusView tipo="erro" mensagem={ocorrencias.erro} onRetry={ocorrencias.recarregar} />
      )}
      {ocorrencias.dados?.length === 0 && (
        <StatusView tipo="vazio" mensagem="Você ainda não abriu nenhum chamado." />
      )}

      {(ocorrencias.dados || []).map((oc) => (
        <OcorrenciaCard
          key={oc.id}
          ocorrencia={oc}
          categoria={buscarCategoria(oc.categoria)}
          status={statusOcorrencia[oc.status]}
        />
      ))}
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Ouvidoria - Fala Cidadão" />
      <TabSelector opcoes={ABAS} valor={aba} onChange={setAba} />
      {aba === 'novo' ? renderFormulario() : renderAcompanhamento()}
    </KeyboardAvoidingView>
  );
}
