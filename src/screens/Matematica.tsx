import { useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Matematica() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState("");

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("username").then(value => value && setNome(value));
    }, [])
  );

  async function chamarAPI(prompt) {
    setLoading(true);
    setResposta("");
    try {
      const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `API KEY`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3.2-Exp",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 300,
        }),
      });

      const data = await response.json();
      setResposta(data?.choices?.[0]?.message?.content || "Não foi possível gerar a resposta.");
    } catch (error) {
      console.log("Erro:", error);
      setResposta("Erro ao chamar a API.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarResposta() {
    if (!resposta) return;
    const existentes = await AsyncStorage.getItem("salvos");
    const lista = existentes ? JSON.parse(existentes) : [];
    lista.push({
      id: Date.now().toString(),
      texto: resposta
    });
    await AsyncStorage.setItem("salvos", JSON.stringify(lista));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>O que vamos estudar hoje, {nome}?</Text>
      <View style={styles.boxContainer}>
        <Botao titulo="Equação de 1° Grau"
          onPress={() => chamarAPI("Gere uma equação de primeiro grau. NÃO RESOLVA, APENAS A EQUAÇÃO. Ex: 2x + 4 = 0")}/>
        <Botao titulo="Equação de 2° Grau"
          onPress={() => chamarAPI("Gere uma equação de segundo grau. NÃO RESOLVA, APENAS A EQUAÇÃO. Ex: 2x² + 4x + 1 = 0")}/>
        <Botao titulo="Álgebra nível ENEM"
          onPress={() => chamarAPI("Gere 1 exercício de álgebra nível ENEM. NÃO RESOLVA. APENAS OS NÚMEROS, SEM ENUNCIADO.")}/>
      </View>

      {loading && <ActivityIndicator size="large" />}

      {resposta ? (
        <View style={styles.responseBox}>
          <Text style={styles.responseText}>{resposta}</Text>

          <TouchableOpacity style={styles.saveButton} onPress={salvarResposta}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
}

function Botao({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <Text style={styles.boxText}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  boxContainer: {
    width: "100%",
    gap: 15,
  },
  box: {
    backgroundColor: "#d9e6f5",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  boxText: {
    fontSize: 18,
    fontWeight: "600",
  },
  responseBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    gap: 12,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
