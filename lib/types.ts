export interface PSEConfig {
  appId: string;
  authToken: string;
  cardToken: string;
  webViewUrl?: string;
}

export interface PSEWebViewProps {
  config: PSEConfig;
  onError?: (error: string) => void;
  onMessage?: (message: any) => void;
  onLoad?: () => void;
  style?: any;
  testID?: string;
}

export interface PSEWebViewRef {
  goBack: () => void;
  reload: () => void;
  postMessage: (message: string) => void;
}
