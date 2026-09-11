import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MetaInput from "./components/MetaInput";
import MetaList from "./components/MetaList";

const STORAGE_KEY = "@metas_semestre";

export default function App() {
  const [texto, setTexto] = useState("");
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // useEffect que CARREGA as metas do AsyncStorage quando o app abre 💜
  useEffect(() => {
    async function carregarMetas() {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvo != null) {
          setMetas(JSON.parse(salvo));
        }
      } catch (erro) {
        Alert.alert("Erro", "Não deu pra carregar as metas salvas.");
      }
      setCarregando(false);
    }

    carregarMetas();
  }, []);

  // useEffect que SALVA toda vez que a lista de metas muda ✨
  // (o if evita salvar um array vazio por cima do que já tava salvo,
  // antes do primeiro useEffect terminar de carregar)
  useEffect(() => {
    if (carregando) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert("Erro", "Não deu pra salvar as metas.");
      }
    }

    salvarMetas();
  }, [metas, carregando]);

  function handleAdd() {
    if (texto.trim() === "") {
      Alert.alert("Ops", "Digite uma meta antes de adicionar.");
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: texto,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas([...metas, novaMeta]);
    setTexto("");
  }

  function handleDelete(id) {
    const novaLista = metas.filter((meta) => meta.id !== id);
    setMetas(novaLista);
  }

  function handleToggleConcluida(id) {
    const novaLista = metas.map((meta) => {
      if (meta.id === id) {
        return { ...meta, concluida: !meta.concluida };
      }
      return meta;
    });
    setMetas(novaLista);
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.length - pendentes;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.counter}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

        <MetaList
          metas={metas}
          onDelete={handleDelete}
          onToggleConcluida={handleToggleConcluida}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Espaço em volta de tudo, pra não colar o conteúdo na borda da tela
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row", // Coloca o ícone (se tiver) e o título lado a lado
    alignItems: "center", // Centraliza tudo verticalmente dentro do cabeçalho
    marginBottom: 20,
  },

  headerIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
    borderRadius: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D6006C",
  },

  counter: {
    fontSize: 13,
    color: "#7B1FA2",
  },
});
