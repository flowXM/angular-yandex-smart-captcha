import { Component } from '@angular/core';
import { YandexSmartCaptchaComponent } from 'angular-yandex-smart-captcha';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [YandexSmartCaptchaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly environment = environment;

  logToken(token: string) {
    console.log(token);
  }
}
