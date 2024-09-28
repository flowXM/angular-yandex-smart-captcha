import { EventEmitter } from '@angular/core';

type SubscribeEvent =
  | 'challenge-visible'
  | 'challenge-hidden'
  | 'network-error'
  | 'javascript-error'
  | 'success'
  | 'token-expired';

export type Language = 'ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr';

export type ShieldPosition =
  | 'top-left'
  | 'center-left'
  | 'bottom-left'
  | 'top-right'
  | 'center-right'
  | 'bottom-right';

export type CaptchaError = {
  filename: string;
  message: string;
  col: number;
  line: number;
};

export interface RenderParams {
  sitekey: string;
  callback?: (token: string) => void;
  hl?: Language;
  test?: boolean;
  webview?: boolean;
  invisible?: boolean;
  shieldPosition?: ShieldPosition;
  hideShield?: boolean;
}

export interface SmartCaptcha {
  render: (container: HTMLElement | string, params: RenderParams) => number;

  getResponse: (widgetId?: number) => string;
  execute: (widgetId?: number) => void;
  reset: (widgetId?: number) => void;
  showError: (widgetId?: number) => void;
  destroy: (widgetId?: number) => void;
  subscribe(
    widgetId: number,
    event: SubscribeEvent,
    callback: Function,
  ): () => void;
}

export interface YandexSmartCaptcha {
  onCallback: EventEmitter<string>;
  onChallengeVisible: EventEmitter<void>;
  onChallengeHidden: EventEmitter<void>;
  onNetworkError: EventEmitter<void>;
  onJavaScriptError: EventEmitter<CaptchaError>;
  onSuccess: EventEmitter<string>;
  onTokenExpired: EventEmitter<void>;
}

declare global {
  interface Window {
    smartCaptcha: SmartCaptcha;
  }
}
