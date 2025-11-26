import { StyleSheet, Text, View, Image } from 'react-native';

export default function Sobre() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/Sobre.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sobre o MathApi</Text>

      <Text style={styles.description}>
        O MathApi foi desenvolvido com o intuito de ajudar pessoas a praticar
        álgebra matemática de forma simples e rápida.
      </Text>

      <Text style={styles.description}>
        O aplicativo foi criado utilizando React Native e faz requisições para a
        API DeepSeek, disponibilizada gratuitamente pelo site HuggingFace.
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
    width: 250,
    height: 250,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
