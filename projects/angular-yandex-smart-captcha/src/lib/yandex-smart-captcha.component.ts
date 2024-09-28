import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  CaptchaError,
  ShieldPosition,
  Language,
} from './yandex-smart-captcha.types';
import { YandexSmartCaptchaService } from './yandex-smart-captcha.service';

/**
 * This component displays a Yandex SmartCaptcha - A service for verifying
 * queries to identify user requests and block bots.
 *
 * Usage example:
 * @example
 * <yandex-smart-captcha
 *   [clientKey]=""
 *   (onSuccess)="console.log($event)"
 * ></yandex-smart-captcha>
 */
@Component({
  selector: 'yandex-smart-captcha',
  standalone: true,
  template: '<div #captcha></div>',
})
export class YandexSmartCaptchaComponent implements AfterViewInit, OnDestroy {
  private widgetId?: number;

  /**
   * Client-side key
   */
  @Input({ required: true }) clientKey?: string;

  /**
   * Widget language
   */
  @Input() language?: Language = undefined;

  /**
   * Running CAPTCHA in test mode. The user will always get a challenge.
   * Use this property for debugging and testing only
   */
  @Input() test?: boolean = undefined;

  /**
   * Running CAPTCHA in **WebView**. You can use it to make user response validation more precise when adding CAPTCHA to mobile apps via **WebView**.
   */
  @Input() webview?: boolean = undefined;

  /**
   * Invisible CAPTCHA
   */
  @Input() invisible?: boolean = undefined;

  /**
   * Position of the data processing notice section.
   */
  @Input() shieldPosition?: ShieldPosition = undefined;

  /**
   * Hide the data processing notice section.
   */
  @Input() hideShield?: boolean = undefined;

  /**
   * Callback handler function
   */
  @Output() onCallback: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Callback when opening a call pop-up window
   */
  @Output() onChallengeVisible: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Callback when closing the challenge pop-up window
   */
  @Output() onChallengeHidden: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Callback when a network error occurred
   */
  @Output() onNetworkError: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Callback when a critical JS error occurred
   */
  @Output() onJavaScriptError: EventEmitter<CaptchaError> =
    new EventEmitter<CaptchaError>();

  /**
   * Callback on successful user validation
   */
  @Output() onSuccess: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Callback when an invalid verification token is received
   */
  @Output() onTokenExpired: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('captcha', { read: ElementRef })
  captcha?: ElementRef<HTMLDivElement>;

  constructor(private captchaService: YandexSmartCaptchaService) {}

  ngAfterViewInit() {
    this.captchaService
      .renderCaptcha(this, this.captcha!.nativeElement, {
        sitekey: this.clientKey!,
        callback: (token: string) => this.onCallback.emit(token),
        hl: this.language,
        test: this.test,
        webview: this.webview,
        invisible: this.invisible,
        shieldPosition: this.shieldPosition,
        hideShield: this.hideShield,
      })
      .subscribe((id: number) => {
        this.widgetId = id;
      });
  }

  /**
   * The `showError` method sets error state
   */
  showError(): void {
    this.captchaService.showError(this.widgetId!);
  }

  /**
   * The `execute` method starts user validation. It is used to initiate the
   * invisible CAPTCHA test at a certain event, e.g., when the user clicks
   * the Submit button of an authentication form.
   */
  execute(): void {
    this.captchaService.execute(this.widgetId!);
  }

  /**
   * The `reset` method resets the widget to the initial state.
   */
  reset(): void {
    this.captchaService.reset(this.widgetId!);
  }

  /**
   * @returns The current value of the user token.
   */
  getResponse(): string {
    return this.captchaService.getResponse(this.widgetId!);
  }

  ngOnDestroy(): void {
    this.captchaService.destroy(this.widgetId!);
  }
}
