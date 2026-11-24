import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

// Seletor de abas internas de uma tela (ex.: Notícias | Avisos).
// opcoes: [{ id, label }]  |  valor: id selecionado  |  onChange(id)
const TabSelector = ({ opcoes, valor, onChange }) => {
  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const ativo = opcao.id === valor;
        return (
          <TouchableOpacity
            key={opcao.id}
            style={[styles.aba, ativo && styles.abaAtiva]}
            onPress={() => onChange(opcao.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>{opcao.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabSelector;
