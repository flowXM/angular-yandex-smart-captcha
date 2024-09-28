# Angular Yandex SmartCaptcha

[![en](https://img.shields.io/badge/english-blue?style=for-the-badge)](README.md)
[![ru](https://img.shields.io/badge/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-red?style=for-the-badge)](README.RU.md)

Эта библиотека добавляет компонент Yandex SmartCaptcha в ваше Angular приложение, обеспечивая простой способ интеграции CAPTCHA для защиты ваших форм и других взаимодействий с пользователями.

## Использование

Для использования Yandex SmartCaptcha в шаблоне вставьте компонент в ваш HTML-код и укажите необходимые свойства:
```html
<yandex-smart-captcha [clientKey]="yourClientKey"></yandex-smart-captcha>
```
Замените `yourClientKey` на ваш действительный [клиентский ключ](https://yandex.cloud/ru/docs/smartcaptcha/concepts/keys).

## Пример

```html
<form (ngSubmit)="onSubmit()">
  <yandex-smart-captcha 
    [clientKey]="yourClientKey" 
    [language]="'ru'"
    (onSuccess)="onCaptchaSuccess($event)">
  </yandex-smart-captcha>
  <button type="submit">Отправить</button>
</form>
```

```typescript
onCaptchaSuccess(token: string) {
  console.log('CAPTCHA успешно пройдена:', token);
  // Обработка токена (например, отправка на сервер для валидации)
}
```

## API

> Важно проинформировать пользователей о том, что их данные обрабатываются SmartCaptcha. Если вы скрываете [уведомление о обработке данных](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice), вы должны найти альтернативный способ уведомления пользователей.

### Свойства (Input Properties)

| Свойство             | Описание                                                                                                                                                                                                  | Тип                                                                                              | Значение по умолчанию       | Требуется   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------- | ----------- |
| `[clientKey]`        | [Клиентский ключ](https://yandex.cloud/ru/docs/smartcaptcha/concepts/keys), необходимый для запуска CAPTCHA.                                                                                             | `string`                                                                                          | -                           | Да          |
| `[language]`         | Язык интерфейса виджета.                                                                                                                                                                                   | `'ru' \| 'en' \| 'be' \| 'kk' \| 'tt' \| 'uk' \| 'uz' \| 'tr'`                                    | `window.navigator.language` | Опционально |
| `[test]`             | Если `true`, CAPTCHA работает в тестовом режиме и всегда показывает проверку. Используйте это свойство только для отладки и тестирования.                                                                  | `boolean`                                                                                         | `false`                     | Опционально |
| `[webview]`          | Установите значение `true`, если CAPTCHA используется в **WebView** для мобильных приложений, чтобы улучшить точность проверки.                                                                             | `boolean`                                                                                         | `false`                     | Опционально |
| `[invisible]`        | Включает [невидимую CAPTCHA](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha).                                                                                                       | `boolean`                                                                                         | `false`                     | Опционально |
| `[shieldPosition]`   | Положение [уведомления о обработке данных](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice).                                                                  | `'top-left' \| 'center-left' \| 'bottom-left' \| 'top-right' \| 'center-right' \| 'bottom-right'` | `center-right`              | Опционально |
| `[hideShield]`       | Скрывает [уведомление о обработке данных](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice). Вы должны по-прежнему информировать пользователей о обработке данных. | `boolean`                                                                                         | `false`                     | Опционально |

### События (Output Events)

| Событие              | Описание                                                            | Тип                        |
| -------------------- | ------------------------------------------------------------------- | -------------------------- |
| `(onCallback)`       | Срабатывает при вызове обратного вызова.                            | `EventEmitter<string>`     |
| `(onChallengeVisible)`| Срабатывает, когда отображается всплывающее окно проверки CAPTCHA. | `EventEmitter<void>`       |
| `(onChallengeHidden)`| Срабатывает, когда всплывающее окно проверки CAPTCHA закрывается.   | `EventEmitter<void>`       |
| `(onNetworkError)`   | Срабатывает при сетевой ошибке во время загрузки или проверки CAPTCHA.| `EventEmitter<void>`       |
| `(onJavaScriptError)`| Срабатывает при критической ошибке JavaScript во время выполнения CAPTCHA. | `EventEmitter<CaptchaError>`|
| `(onSuccess)`        | Срабатывает, когда проверка пользователя успешно завершена, возвращая токен проверки. | `EventEmitter<string>`     |
| `(onTokenExpired)`   | Срабатывает, когда срок действия токена истекает, указывая на необходимость повторной проверки. | `EventEmitter<void>`       |

## Методы

Ниже приведены методы, которые можно вызывать у экземпляра компонента CAPTCHA:

| Метод        | Описание                                                           |
| ------------ | ------------------------------------------------------------------ |
| `execute()`  | Запускает проверку пользователя. Полезно для запуска невидимой CAPTCHA при выполнении определенного действия, например, отправке формы. |
| `reset()`    | Сбрасывает виджет CAPTCHA в исходное состояние, удаляя предыдущие данные или ответы. |
| `showError()`| Переводит виджет в состояние ошибки, что может быть использовано для указания на проблемы с проверкой или отправкой. |
| `getResponse()` | Возвращает текущий ответ CAPTCHA (токен). Может быть использован для ручной обработки логики отправки данных. |
