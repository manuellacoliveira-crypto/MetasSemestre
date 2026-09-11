import { StyleSheet, TextInput, Pressable, Text } from "react-native";

// Campinho de digitar a meta + botãozinho de adicionar 💕
// Props: value e onChangeText controlam o texto, onAdd é chamado ao clicar
export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta de estudo..."
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={styles.button}
        android_ripple={{ color: "#D6006C" }}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#E91E63",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#8E24AA",
    borderRadius: 5,
    padding: 12,
    alignItems: "center", // Centraliza o texto "Adicionar" dentro do botão
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
