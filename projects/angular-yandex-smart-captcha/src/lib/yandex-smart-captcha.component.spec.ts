import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexSmartCaptchaComponent } from './yandex-smart-captcha.component';
import { YandexSmartCaptchaService } from './yandex-smart-captcha.service';
import { filter, firstValueFrom, take } from 'rxjs';

describe('YandexSmartCaptchaComponent', () => {
  let component: YandexSmartCaptchaComponent;
  let fixture: ComponentFixture<YandexSmartCaptchaComponent>;
  let service: YandexSmartCaptchaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YandexSmartCaptchaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YandexSmartCaptchaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(YandexSmartCaptchaService);
    await firstValueFrom(
      service.scriptStatus.pipe(
        filter((value) => value),
        take(1),
      ),
    );
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
