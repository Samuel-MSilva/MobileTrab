import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';

// Card de notícia usado na Home e na aba Notícias.
// imageUrl: endereço da imagem (campo imagem_capa_url da API)
const NewsCard = ({ title, description, imageUrl, date, onPress }) => {
  return (
    <TouchableOpacity style={styles.newsCard} onPress={onPress} activeOpacity={0.8}>
      {!!imageUrl && <Image source={{ uri: imageUrl }} style={styles.newsImage} />}

      <View style={styles.newsContent}>
        <Text style={styles.newsDate}>{date}</Text>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
