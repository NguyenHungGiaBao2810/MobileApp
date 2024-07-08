declare module 'react-native-loading-placeholder' {
    import * as React from 'react';
    import { ViewProps } from 'react-native';
  
    export interface PlaceholderProps extends ViewProps {
      Animation?: React.ComponentType<any>;
      Left?: React.ComponentType<any>;
      Right?: React.ComponentType<any>;
      style?: any;
    }
  
    export const Placeholder: React.FC<PlaceholderProps>;
    export const PlaceholderMedia: React.FC<ViewProps>;
    export const PlaceholderLine: React.FC<ViewProps>;
  }