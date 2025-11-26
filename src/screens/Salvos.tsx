import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Salvos() {
  const [lista, setLista] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  async function carregar() {
    const dados = await AsyncStorage.getItem("salvos");
    setLista(dados ? JSON.parse(dados) : []);
  }

  async function excluir(id) {
    const novaLista = lista.filter(item => item.id !== id);
    setLista(novaLista);
    await AsyncStorage.setItem("salvos", JSON.stringify(novaLista));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultados Salvos:</Text>

      {lista.map(item => (
        <View key={item.id} style={styles.salvo}>
          <Text style={styles.textoLista}>{item.texto}</Text>

          <TouchableOpacity style={styles.delBtn} onPress={() => excluir(item.id)}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  salvo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    gap: 10,
  },
  textoLista: {
    fontSize: 16,
  },
  delBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
