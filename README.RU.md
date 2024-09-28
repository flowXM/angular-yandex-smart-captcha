# Angular Yandex SmartCaptcha
[![en](https://img.shields.io/badge/english-blue?style=for-the-badge)](README.md)
[![ru](https://img.shields.io/badge/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-red?style=for-the-badge)](README.RU.md)

Добавляет компонент Yandex SmartCaptcha в приложение Angular

## Использование

```html
<yandex-smart-captcha [clientKey]="..."></yandex-smart-captcha>
```

## API

> Вы обязаны уведомлять пользователей о том, что их данные обрабатывает SmartCaptcha. Если вы скрываете [блок с уведомлением](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice), сообщите пользователям иным способом о том, что SmartCaptcha обрабатывает их данные.

| Свойство               | Описание                                                                                                                                                | Тип                                                                                               | Значение по умолчанию       | Наличие     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `[clientKey]`         | [Ключ клиентской части](https://yandex.cloud/ru/docs/smartcaptcha/concepts/keys)                                                                        | `string`                                                                                          | Отсутствует                 | Обязательно |
| `[language]`           | Язык виджета                                                                                                                                            | `'ru' \| 'en' \| 'be' \| 'kk' \| 'tt' \| 'uk' \| 'uz' \| 'tr'`                                    | `window.navigator.language` | -           |
| `[test]`               | Включение работы капчи в режиме тестирования. Пользователь всегда будет получать задание. Используйте это свойство только для отладки и тестирования.   | `boolean`                                                                                         | `false`                     | -           |
| `[webview]`            | Запуск капчи в **WebView**. Используется для повышения точности оценки пользователей при добавлении капчи в мобильные приложения с помощью **WebView**. | `boolean`                                                                                         | `false`                     | -           |
| `[invisible]`          | [Невидимая капча](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha)                                                                 | `boolean`                                                                                         | `false`                     | -           |
| `[shieldPosition]`     | Расположение [блока](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice) с уведомлением об обработке данных.   | `'top-left' \| 'center-left' \| 'bottom-left' \| 'top-right' \| 'center-right' \| 'bottom-right'` | `center-right`           | -           |
| `[hideShield]`         | Скрыть [блок](https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice) с уведомлением об обработке данных.          | `boolean`                                                                                         | `false`                     | -           |
| `(onCallback)`         | Функция-обработчик                                                                                                                                      | `EventEmitter<string>`                                                                            | Отсутствует                 | -           |
| `(onChallengeVisible)` | Открытие всплывающего окна с заданием                                                                                                                   | `EventEmitter<void>`                                                                              | Отсутствует                 | -           |
| `(onChallengeHidden)`  | Закрытие всплывающего окна с заданием                                                                                                                   | `EventEmitter<void>`                                                                              | Отсутствует                 | -           |
| `(onNetworkError)`     | Возникла сетевая ошибка                                                                                                                                 | `EventEmitter<void>`                                                                              | Отсутствует                 | -           |
| `(onJavaScriptError)`  | Возникла критическая ошибка JS                                                                                                                          | `EventEmitter<CaptchaError>`                                                                      | Отсутствует                 | -           |
| `(onSuccess)`          | Успешная валидация пользователя, возвращается токен для проверки достоверности на стороне сервера                                                       | `EventEmitter<string>`                                                                            | Отсутствует                 | -           |
| `(onTokenExpired)`     | Токен прохождения проверки стал не валидным                                                                                                             | `EventEmitter<void>`                                                                              | Отсутствует                 | -           |

## Методы

| Название        | Описание                                                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `execute()`     | Запускает проверку пользователя. Используется чтобы начать проверку невидимой капчи при каком-то событии, например, при нажатии на кнопку отправки формы аутентификации. |
| `reset()`       | Сбрасывает состояние виджета до начального.                                                                                                                                |
| `showError()`   | Устанавливает состояние виджета как ошибочный, и меняет вид виджета на ошибочный                                                                                       |
| `getResponse()` | Возвращает текущее значение токена                                                                                                                                                       |
