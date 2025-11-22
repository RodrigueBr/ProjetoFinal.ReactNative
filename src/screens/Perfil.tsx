import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function loadName() {
      const savedName = await AsyncStorage.getItem("username");
      if (savedName) setNome(savedName);
    }
    loadName();
  }, []);

  async function botaoSalvar() {
    if (nome.trim() === "") {
      Alert.alert("ERROR", "Digite um nome antes de salvar.");
      return;
    }
    await AsyncStorage.setItem("username", nome.trim());
    Alert.alert("Sucesso!", "Nome salvo com sucesso!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERFIL</Text>
      <Text style={styles.label}>Seu nome:</Text>
      <TextInput style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}/>
      <TouchableOpacity style={styles.button} onPress={botaoSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    marginTop: 30,
    fontSize: 18,
  },
  input: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#000000ff",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
