# PSE React Native

A React Native library that provides a secure WebView component for integrating Gnosis Pay card functionality into your mobile applications.

## Features

- 🔒 **Secure WebView Integration** - Safely embed Gnosis Pay card interfaces
- 📱 **Cross-Platform** - Works on both iOS and Android
- ⚡ **Easy Integration** - Simple component with minimal setup
- 🎛️ **Configurable** - Flexible configuration options for different environments
- 📨 **Message Handling** - Built-in communication between WebView and React Native
- 🔄 **WebView Controls** - Programmatic navigation and reload capabilities

## Installation

```bash
npm install @gnosispay/pse-react-native
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react-native-webview
```

For Expo projects:

```bash
npx expo install react-native-webview
```

## Basic Usage

```tsx
import React, { useRef } from "react";
import { View, Button, Alert } from "react-native";
import { PSEWebView, PSEWebViewRef } from "@gnosispay/pse-react-native";

export default function PaymentScreen() {
  const webViewRef = useRef<PSEWebViewRef>(null);

  const config = {
    appId: "your-app-id",
    authToken: "your-auth-token",
    cardToken: "your-card-token",
    webViewUrl: "https://pse-backend.v2.gnosispay.com/native-webview",
  };

  const handleError = (error: string) => {
    Alert.alert("Payment Error", error);
  };

  const handleMessage = (message: any) => {
    console.log("Received message from WebView:", message);
    // Handle different message types from the WebView
  };

  const handleLoad = () => {
    console.log("WebView loaded successfully");
  };

  return (
    <View style={{ flex: 1 }}>
      <PSEWebView
        ref={webViewRef}
        config={config}
        onError={handleError}
        onMessage={handleMessage}
        onLoad={handleLoad}
        style={{ flex: 1 }}
        testID="pse-webview"
      />

      <View style={{ padding: 16 }}>
        <Button title="Reload" onPress={() => webViewRef.current?.reload()} />
        <Button title="Go Back" onPress={() => webViewRef.current?.goBack()} />
      </View>
    </View>
  );
}
```

## API Reference

### PSEWebView Props

| Prop        | Type                      | Required | Description                                      |
| ----------- | ------------------------- | -------- | ------------------------------------------------ |
| `config`    | `PSEConfig`               | ✅       | Configuration object with authentication details |
| `onError`   | `(error: string) => void` | ❌       | Callback fired when an error occurs              |
| `onMessage` | `(message: any) => void`  | ❌       | Callback fired when WebView sends a message      |
| `onLoad`    | `() => void`              | ❌       | Callback fired when WebView finishes loading     |
| `style`     | `ViewStyle`               | ❌       | Style object for the WebView container           |
| `testID`    | `string`                  | ❌       | Test identifier for testing frameworks           |

### PSEConfig

```tsx
interface PSEConfig {
  appId: string; // Your application identifier
  authToken: string; // Authentication token
  cardToken: string; // Card-specific token
  webViewUrl?: string; // Full URL where your PSE iframe is hosted
}
```

### PSEWebViewRef Methods

The component exposes these methods via ref:

```tsx
interface PSEWebViewRef {
  goBack: () => void; // Navigate back in WebView history
  reload: () => void; // Reload the current page
  postMessage: (message: string) => void; // Send message to WebView
}
```

## Message Handling

The WebView can send various message types. Handle them in your `onMessage` callback:

```tsx
const handleMessage = (message: any) => {
  switch (message.type) {
    case "error":
      console.error("WebView error:", message.message);
      break;
    case "success":
      console.log("Operation successful:", message.data);
      break;
    case "navigation":
      console.log("Navigation event:", message.url);
      break;
    default:
      console.log("Unknown message type:", message);
  }
};
```

## Error Handling

The component provides comprehensive error handling:

```tsx
const handleError = (error: string) => {
  // Common error scenarios:
  // - Network connectivity issues
  // - Invalid authentication tokens
  // - WebView loading failures
  // - Backend service unavailable

  console.error("PSE WebView Error:", error);

  // Show user-friendly error message
  Alert.alert(
    "Payment Error",
    "Unable to load payment interface. Please try again.",
    [{ text: "OK", onPress: () => webViewRef.current?.reload() }]
  );
};
```

## Configuration Environments

### Production

```tsx
const config = {
  appId: "your-prod-app-id",
  authToken: "your-prod-auth-token",
  cardToken: "your-prod-card-token",
  webViewUrl: "https://pse-backend.v2.gnosispay.com/native-webview",
};
```

### Staging/Testing

```tsx
const config = {
  appId: "your-staging-app-id",
  authToken: "your-staging-auth-token",
  cardToken: "your-staging-card-token",
  webViewUrl: "https://pse-backend-staging.v2.gnosispay.com/native-webview",
};
```

## Requirements

- React Native >= 0.70.0
- React >= 18.0.0
- react-native-webview >= 13.0.0

## Development

This repository includes an example app to test the library:

### Running the Example App

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd pse-react-native
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the example app:

   ```bash
   npx expo start
   ```

4. Open the app in your preferred development environment:
   - iOS Simulator
   - Android Emulator
   - Physical device with Expo Go

### Building the Library

```bash
npm run build
```

This compiles the TypeScript source files and generates the distribution files in the `lib/` directory.

## Troubleshooting

### Common Issues

**WebView not loading:**

- Verify your authentication tokens are valid
- Check network connectivity
- Ensure the webViewUrl is accessible

**Authentication errors:**

- Double-check your appId, authToken, and cardToken
- Verify tokens haven't expired
- Contact your PSE provider for token validation

**Build errors:**

- Ensure react-native-webview is properly installed
- Check that peer dependencies match the required versions
- Clear your Metro cache: `npx expo start --clear`

## License

[Add your license information here]

## Support

For technical support or questions about integration, please contact your PSE provider or create an issue in this repository.
