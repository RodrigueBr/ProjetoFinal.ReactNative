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
          "Authorization": `Bearer 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`,
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
      <View style={styles.btnContainer}>
        <Botao titulo="Equação de 1° Grau"
          onPress={() => chamarAPI("Gere uma equação de primeiro grau. NÃO RESOLVA, APENAS A EQUAÇÃO, SEM COMENTÁRIOS OU CONVERSA. Ex: Equação de Primeiro Grau: 2x + 4 = 0 (obs: coloca os números sempre na linha de baixo)")}/>
        <Botao titulo="Equação de 2° Grau"
          onPress={() => chamarAPI("Gere uma equação de segundo grau. NÃO RESOLVA, APENAS A EQUAÇÃO, SEM COMENTÁRIOS OU CONVERSA. Ex: Equação de Segundo Grau: 2x² + 4x + 1 = 0 (obs: coloca os números sempre na linha de baixo)")}/>
        <Botao titulo="Álgebra nível ENEM"
          onPress={() => chamarAPI("Gere 1 exercício de álgebra nível ENEM. NÃO RESOLVA. APENAS OS NÚMEROS, SEM COMENTÁRIOS OU CONVERSA E SEM ENUNCIADO; EX: Álgebra Enem: (Reposta gerada) (obs: coloca a resposta sempre na linha de baixo).")}/>
      </View>

      {loading && <ActivityIndicator size="large" />}

      {resposta ? (
        <View style={styles.btnAjustar}>
          <Text style={styles.textopadrao}>{resposta}</Text>

          <TouchableOpacity style={styles.saveBtn} onPress={salvarResposta}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
}

function Botao({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{titulo}</Text>
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
  btnContainer: {
    width: "100%",
    gap: 15,
  },
  btn: {
    backgroundColor: "#d9e6f5",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
  },
  btnAjustar: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    gap: 12,
  },
  textopadrao: {
    fontSize: 16,
    lineHeight: 22,
  },
  saveBtn: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
