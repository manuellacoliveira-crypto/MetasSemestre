import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";

// Lista de metas 🌸 Recebe as metas e duas funções: onDelete (remover) e
// onToggleConcluida (marca/desmarca como feita quando toca no texto)
export default function MetaList({ metas, onDelete, onToggleConcluida }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(meta) => meta.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            style={styles.textArea}
            onPress={() => onToggleConcluida(item.id)}
            android_ripple={{ color: "#F8BBD0" }}
          >
            <Text style={item.concluida ? styles.itemTextConcluida : styles.itemText}>
              {item.texto}
            </Text>
          </Pressable>

          <Pressable
            style={styles.deleteButton}
            android_ripple={{ color: "#ffffff55" }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>Remover</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    alignItems: "center", // Centraliza o texto de "lista vazia" na horizontal
    marginTop: 30,
  },

  emptyText: {
    fontSize: 15,
    color: "#999",
  },

  item: {
    flexDirection: "row", // Coloca o texto da meta e o botão "Remover" lado a lado
    backgroundColor: "#F3E5F5",
    borderRadius: 5,
    marginBottom: 10,
  },

  textArea: {
    flex: 1,
    padding: 12,
  },

  itemText: {
    fontSize: 16,
    color: "#6A1B9A",
  },

  itemTextConcluida: {
    fontSize: 16,
    color: "#CE93D8",
    textDecorationLine: "line-through",
  },

  deleteButton: {
    backgroundColor: "#D6006C",
    padding: 12,
    justifyContent: "center", // Centraliza o texto "Remover" verticalmente no botão
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
