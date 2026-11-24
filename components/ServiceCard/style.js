import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gridItem: {
    width: '23%',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  listContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  listDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
    lineHeight: 17,
  },
});

export default styles;
