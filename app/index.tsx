import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types"; // Import the type
import { StackNavigationProp } from "@react-navigation/stack"; // Import the type for stack navigation

// Define the navigation prop type using the RootStackParamList
type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp>(); // Use the typed navigation

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.254.176:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Login successful", `Welcome ${data.user.name}`);
      } else {
        Alert.alert("Login failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Register"
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
