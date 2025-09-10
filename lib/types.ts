import type { ElementType } from "@gnosispay/pse-sdk";

export interface PSEConfig {
  appId: string;
  gnosisPayApiAuthToken: string;
  cardToken: string;
  webViewUrl?: string;
  elementType: ElementType;
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
