# Angular Yandex SmartCaptcha

Adds Yandex SmartCaptcha component to Angular application

## Usage

```html
<yandex-smart-captcha [clientKey]="..."></yandex-smart-captcha>
```

## API

> You must notify users that their data is processed by SmartCaptcha. If you hide the [notice shield](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice), find another way to tell users that SmartCaptcha processes their data.

| Property               | Description                                                                                                                                     | Type                                                                                              | Default value               | Requirement |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| `[clientKey]`          | [Client-side key](https://yandex.cloud/en/docs/smartcaptcha/concepts/keys)                                                                      | `string`                                                                                          | -                           | Required |
| `[language]`           | Widget language                                                                                                                                 | `'ru' \| 'en' \| 'be' \| 'kk' \| 'tt' \| 'uk' \| 'uz' \| 'tr'`                                    | `window.navigator.language` | -        |
| `[test]`               | Running CAPTCHA in test mode. The user will always get a challenge. Use this property for debugging and testing only                            | `boolean`                                                                                         | `false`                     | -        |
| `[webview]`            | Running CAPTCHA in **WebView**. You can use it to make user response validation more precise when adding CAPTCHA to mobile apps via **WebView** | `boolean`                                                                                         | `false`                     | -        |
| `[invisible]`          | [Invisible CAPTCHA](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha)                                                       | `boolean`                                                                                         | `false`                     | -        |
| `[shieldPosition]`     | Position of the [data processing notice section](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice)   | `'top-left' \| 'center-left' \| 'bottom-left' \| 'top-right' \| 'center-right' \| 'bottom-right'` | `center-right`              | -        |
| `[hideShield]`         | Hide the [data processing notice section](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice)          | `boolean`                                                                                         | `false`                     | -        |
| `(onCallback)`         | Handler function                                                                                                                                | `EventEmitter<string>`                                                                            | -                           | -        |
| `(onChallengeVisible)` | Opening the challenge pop-up window                                                                                                             | `EventEmitter<void>`                                                                              | -                           | -        |
| `(onChallengeHidden)`  | Closing the challenge pop-up window                                                                                                             | `EventEmitter<void>`                                                                              | -                           | -        |
| `(onNetworkError)`     | A network error occurred                                                                                                                        | `EventEmitter<void>`                                                                              | -                           | -        |
| `(onJavaScriptError)`  | A critical JS error occurred                                                                                                                    | `EventEmitter<CaptchaError>`                                                                      | -                           | -        |
| `(onSuccess)`          | Successful user validation                                                                                                                      | `EventEmitter<string>`                                                                            | -                           | -        |
| `(onTokenExpired)`     | Invalidated verification token                                                                                                                  | `EventEmitter<void>`                                                                              | -                           | -        |

## Methods

| Name            | Description                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `execute()`     | The `execute` method starts user validation. It is used to initiate the invisible CAPTCHA test at a certain event, e.g., when the user clicks the **Submit** button of an authentication form. |
| `reset()`       | The `reset` method resets the widget to the initial state.                                                                                                                                     |
| `showError()`   | Sets the widget state as erroneous, and changes the widget view to erroneous                                                                                                                   |
| `getResponse()` | The `getResponse` method returns the current value of the user token.                                                                                                                          |
