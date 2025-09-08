import React, { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PSEWebView, type PSEWebViewRef } from "@/lib";

export default function HomeScreen() {
  const [appId, setAppId] = useState("gp_a1b2c3d4e5f678901234567890123456");
  const [authToken, setAuthToken] = useState("");
  const [cardToken, setCardToken] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef<PSEWebViewRef>(null);

  const handleLoadWebView = () => {
    if (!appId.trim()) {
      Alert.alert("Error", "Please enter an App ID");
      return;
    }
    if (!authToken.trim()) {
      Alert.alert("Error", "Please enter a Gnosis Pay API auth token");
      return;
    }
    if (!cardToken.trim()) {
      Alert.alert("Error", "Please enter a card token");
      return;
    }

    setShowWebView(true);
  };

  const handleGoBack = () => {
    setShowWebView(false);
  };

  const handleWebViewError = (error: string) => {
    console.log("PSE WebView Error:", error);
    // Additional error handling can be added here
  };

  const handleWebViewMessage = (message: any) => {
    console.log("Message from PSE WebView:", message);
    // Handle specific message types as needed
  };

  const handleWebViewLoad = () => {
    console.log("PSE WebView loaded successfully");
  };

  if (showWebView) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            App ID: {appId}
          </ThemedText>
        </ThemedView>
        <PSEWebView
          ref={webViewRef}
          config={{
            appId: appId.trim(),
            authToken: authToken.trim(),
            cardToken: cardToken.trim(),
          }}
          onError={handleWebViewError}
          onMessage={handleWebViewMessage}
          onLoad={handleWebViewLoad}
          style={styles.webview}
          testID="pse-webview"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Card Details</ThemedText>
          <ThemedText style={styles.subtitle}>
            Enter PSE App ID, auth token, and card token to view card details
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            PSE App ID
          </ThemedText>
          <TextInput
            style={styles.textInput}
            value={appId}
            onChangeText={setAppId}
            placeholder="Enter App ID"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Gnosis Pay API Auth Token
          </ThemedText>
          <TextInput
            style={styles.textInput}
            value={authToken}
            onChangeText={setAuthToken}
            placeholder="Enter Gnosis Pay API auth token"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Card Token
          </ThemedText>
          <TextInput
            style={styles.textInput}
            value={cardToken}
            onChangeText={setCardToken}
            placeholder="Enter card token"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handleLoadWebView}>
          <ThemedText style={styles.buttonText}>Load Card Details</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f8f8f8",
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  headerTitle: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
