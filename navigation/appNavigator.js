import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../Screens/HomeScreen';
import ServiceScreen from '../Screens/ServiceScreen';
import NewsScreen from '../Screens/NewsScreen';
import NewsDetailScreen from '../Screens/NewsDetailScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import OuvidoriaScreen from '../Screens/OuvidoriaScreen';
import UtilidadePublicaScreen from '../Screens/UtilidadePublicaScreen';
import EnquetesScreen from '../Screens/EnquetesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Ícone de cada aba: [focado, normal]
const ICONES_ABAS = {
  Home: ['home', 'home-outline'],
  Services: ['grid', 'grid-outline'],
  News: ['newspaper', 'newspaper-outline'],
  Profile: ['person', 'person-outline'],
};

// Navegação principal: quatro abas
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1d4ed8',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarIcon: ({ color, size, focused }) => {
          const [focado, normal] = ICONES_ABAS[route.name];
          return <Ionicons name={focused ? focado : normal} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Services" component={ServiceScreen} options={{ title: 'Serviços' }} />
      <Tab.Screen name="News" component={NewsScreen} options={{ title: 'Notícias' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

// Navegação geral: abas + telas secundárias (abertas por cima das abas).
// Os nomes aqui ("Ouvidoria", "UtilidadePublica", "Enquetes") são os mesmos
// do campo `rota` dos serviços no mockData.
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="NewsDetails" component={NewsDetailScreen} />
        <Stack.Screen name="Ouvidoria" component={OuvidoriaScreen} />
        <Stack.Screen name="UtilidadePublica" component={UtilidadePublicaScreen} />
        <Stack.Screen name="Enquetes" component={EnquetesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
