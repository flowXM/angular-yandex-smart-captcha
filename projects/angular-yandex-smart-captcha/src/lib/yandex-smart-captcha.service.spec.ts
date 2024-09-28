import { TestBed } from '@angular/core/testing';

import { YandexSmartCaptchaService } from './yandex-smart-captcha.service';
import { filter, firstValueFrom, take } from 'rxjs';

describe('YandexSmartCaptchaService', () => {
  let service: YandexSmartCaptchaService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YandexSmartCaptchaService);
    await firstValueFrom(
      service.scriptStatus.pipe(
        filter((value) => value),
        take(1),
      ),
    );
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('window object should have smartCaptcha', () => {
    expect(window.smartCaptcha).toBeDefined();
  });

  it('service should have smartCaptcha', () => {
    expect(service.smartCaptcha).toBeDefined();
  });
});
