import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  newsImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e5e7eb',
  },
  newsContent: {
    padding: 12,
  },
  newsDate: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 5,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 18,
  },
});

export default styles;
