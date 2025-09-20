/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL?: string;
    REACT_APP_DIAGRAMS_ENDPOINT?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
