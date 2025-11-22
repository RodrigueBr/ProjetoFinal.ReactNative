import { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Matematica() {
  const [nome, setNome] = useState("");

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("username").then(value => {
        if (value) setNome(value);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que vamos estudar hoje, {nome}?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
