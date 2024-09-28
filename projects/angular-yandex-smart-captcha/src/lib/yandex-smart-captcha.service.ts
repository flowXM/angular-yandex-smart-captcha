import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  take,
} from 'rxjs';
import { DOCUMENT } from '@angular/common';
import {
  CaptchaError,
  RenderParams,
  SmartCaptcha,
  YandexSmartCaptcha,
} from './yandex-smart-captcha.types';

@Injectable({
  providedIn: 'root',
})
export class YandexSmartCaptchaService {
  private renderer: Renderer2;
  private readonly scriptUrl: string =
    'https://smartcaptcha.yandexcloud.net/captcha.js';
  scriptStatus = new BehaviorSubject<boolean>(false);

  public smartCaptcha?: SmartCaptcha;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadJsScript();
  }

  private setStatus(value: boolean): void {
    this.scriptStatus.next(value);
  }

  private loadJsScript = (): HTMLScriptElement => {
    const script = this.renderer.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.src = this.scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.smartCaptcha = window.smartCaptcha;
      this.setStatus(true);
    };
    script.onerror = () => {
      throw new Error('Could not load the Yandex SmartCaptcha.');
    };
    this.renderer.appendChild(this.document.head, script);
    return script;
  };

  public renderCaptcha = (
    component: YandexSmartCaptcha,
    element: HTMLElement | string,
    params: RenderParams,
  ): Observable<number> => {
    return this.scriptStatus.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => {
        const widgetId = this.smartCaptcha!.render(element, params);
        this.subscribe(component, widgetId);
        return widgetId;
      }),
    );
  };

  public showError(widgetId: number): void {
    this.smartCaptcha?.showError(widgetId);
  }

  public destroy(widgetId: number): void {
    this.smartCaptcha?.destroy(widgetId);
  }

  public reset(widgetId: number): void {
    this.smartCaptcha?.reset(widgetId);
  }

  public execute(widgetId: number): void {
    this.smartCaptcha?.execute(widgetId);
  }

  public getResponse(widgetId: number): string {
    return this.smartCaptcha ? this.smartCaptcha.getResponse(widgetId) : '';
  }

  private subscribe = (component: YandexSmartCaptcha, widgetId: number) => {
    if (this.smartCaptcha) {
      this.smartCaptcha.subscribe(widgetId, 'challenge-visible', () =>
        component.onChallengeVisible.emit(),
      );
      this.smartCaptcha.subscribe(widgetId, 'challenge-hidden', () =>
        component.onChallengeHidden.emit(),
      );
      this.smartCaptcha.subscribe(widgetId, 'network-error', () =>
        component.onNetworkError.emit(),
      );
      this.smartCaptcha.subscribe(
        widgetId,
        'javascript-error',
        (error: CaptchaError) => component.onJavaScriptError.emit(error),
      );
      this.smartCaptcha.subscribe(widgetId, 'success', (token: string) =>
        component.onSuccess.emit(token),
      );
      this.smartCaptcha.subscribe(widgetId, 'token-expired', () =>
        component.onTokenExpired.emit(),
      );
    }
  };
}
