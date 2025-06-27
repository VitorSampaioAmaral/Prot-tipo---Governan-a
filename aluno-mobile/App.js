import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://img.icons8.com/color/96/student-male--v1.png'}} style={styles.avatar} />
      <Text style={styles.title}>Olá, João!</Text>
      <Text style={styles.text}>
        Você está usando o ProFuturo no seu tablet com OfflineBox.
        Aqui, você pode jogar missões e resolver desafios alinhados ao currículo da BNCC, mesmo sem internet!
      </Text>
      <Button title="Iniciar Missão" onPress={() => navigation.navigate('Missoes')} />
      <Text style={styles.footer}>
        Seu professor receberá relatórios automáticos por pendrive e adaptará as aulas conforme o perfil da turma.
      </Text>
    </View>
  );
}

function MissoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Missões e Desafios</Text>
      <Text style={styles.text}>
        - Missão 1: Resolver desafios de matemática do 7º ano{'\n'}
        - Missão 2: Explorar a história do Brasil em Realidade Aumentada{'\n'}
        - Missão 3: Jogo de ciências sobre ecossistemas locais
      </Text>
      <Text style={styles.reward}>Complete missões para ganhar recompensas e subir no ranking!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="Missoes" component={MissoesScreen} options={{ title: 'Missões' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#1a237e' },
  text: { fontSize: 16, marginBottom: 24, textAlign: 'center', color: '#333' },
  reward: { fontSize: 16, color: '#388e3c', marginTop: 16, fontWeight: 'bold', textAlign: 'center' },
  avatar: { width: 96, height: 96, marginBottom: 16 },
  footer: { fontSize: 13, color: '#607d8b', marginTop: 32, textAlign: 'center' }
});