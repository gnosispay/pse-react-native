import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Alert, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import type { PSEWebViewProps, PSEWebViewRef } from "./types";

const PSEWebView = forwardRef<PSEWebViewRef, PSEWebViewProps>(
  ({ config, onError, onMessage, onLoad, style, testID }, ref) => {
    const webViewRef = useRef<WebView>(null);

    useImperativeHandle(ref, () => ({
      goBack: () => {
        webViewRef.current?.goBack();
      },
      reload: () => {
        webViewRef.current?.reload();
      },
      postMessage: (message: string) => {
        webViewRef.current?.postMessage(message);
      },
    }));

    const handleWebViewLoad = () => {
      // Send parameters to webview after it loads
      const params = {
        appId: config.appId.trim(),
        gnosisPayApiAuthToken: config.gnosisPayApiAuthToken.trim(),
        cardToken: config.cardToken.trim(),
        elementType: config.elementType,
      };

      const message = JSON.stringify(params);
      webViewRef.current?.postMessage(message);

      console.log("PSE: Message sent to WebView:", message);
      onLoad?.();
    };

    const handleWebViewMessage = (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        console.log("PSE: Message from WebView:", data);

        // Handle error messages from the webview
        if (data.type === "error") {
          const errorMessage = data.message || "Unknown WebView error";
          onError?.(errorMessage);
          Alert.alert("PSE WebView Error", errorMessage);
        }

        // Pass all messages to the parent component
        onMessage?.(data);
      } catch (error) {
        console.log("PSE: Failed to parse WebView message:", error);
        onError?.("Failed to parse WebView message");
      }
    };

    const handleWebViewError = (syntheticEvent: any) => {
      const { nativeEvent } = syntheticEvent;
      const errorMessage = `Failed to load PSE WebView: ${nativeEvent.description}`;
      console.error("PSE: WebView Error:", errorMessage);
      onError?.(errorMessage);
      Alert.alert("PSE WebView Error", errorMessage);
    };

    const webViewUrl = config.webViewUrl;
    if (!webViewUrl) {
      throw new Error("webViewUrl is required");
    }

    return (
      <WebView
        ref={webViewRef}
        source={{ uri: webViewUrl }}
        style={[styles.webview, style]}
        startInLoadingState={true}
        scalesPageToFit={true}
        onLoad={handleWebViewLoad}
        onMessage={handleWebViewMessage}
        onError={handleWebViewError}
        javaScriptEnabled={true}
        testID={testID}
      />
    );
  }
);

PSEWebView.displayName = "PSEWebView";

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default PSEWebView;
