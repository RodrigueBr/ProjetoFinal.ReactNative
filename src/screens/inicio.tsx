import { StyleSheet, Text, View, Image } from 'react-native';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/Matematica_Inicio.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo ao MathApi!</Text>

      <Text style={styles.subtitle}>
        Seu app para praticar matemática de forma rápida e simples.
      </Text>

      <Text style={styles.description}>
        Gere contas automaticamente, pratique quando quiser e salve suas favoritas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginHorizontal: 10,
  },
});
