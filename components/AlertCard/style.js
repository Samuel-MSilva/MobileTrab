import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  alertCard: {
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    marginTop: 2,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertType: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  alertDate: {
    fontSize: 10,
    color: '#6b7280',
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 3,
  },
  alertText: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 2,
    lineHeight: 17,
  },
  alertLink: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});

export default styles;
