# Angular Yandex SmartCaptcha

[![en](https://img.shields.io/badge/english-blue?style=for-the-badge)](README.md)
[![ru](https://img.shields.io/badge/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-red?style=for-the-badge)](README.RU.md)

This library adds the Yandex SmartCaptcha component to your Angular application, providing an easy way to integrate CAPTCHA protection into your forms and other user interactions.

## Usage
To use Yandex SmartCaptcha in a template, insert the component into your HTML code and provide the necessary properties:
```html
<yandex-smart-captcha [clientKey]="yourClientKey"></yandex-smart-captcha>
```
Replace yourClientKey with your actual Yandex SmartCaptcha [client-side key](https://yandex.cloud/en/docs/smartcaptcha/concepts/keys).

## Example

```html
<form (ngSubmit)="onSubmit()">
  <yandex-smart-captcha 
    [clientKey]="yourClientKey" 
    [language]="'en'"
    (onSuccess)="onCaptchaSuccess($event)">
  </yandex-smart-captcha>
  <button type="submit">Submit</button>
</form>
```

```typescript
onCaptchaSuccess(token: string) {
  console.log('CAPTCHA Success:', token);
  // Handle the token (e.g., send to server for validation)
}
```

## API

> It's important to inform users that their data is processed by SmartCaptcha. If you hide the [notice shield](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice), you must find an alternative way to notify users about the data processing.

### Input Properties

| Property           | Description                                                                                                                                                                                                  | Type                                                                                              | Default value               | Requirement |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `[clientKey]`      | The [client-side key](https://yandex.cloud/en/docs/smartcaptcha/concepts/keys) required to run the CAPTCHA.                                                                                                  | `string`                                                                                          | -                           | Required    |
| `[language]`       | The language for the widget interface.                                                                                                                                                                       | `'ru' \| 'en' \| 'be' \| 'kk' \| 'tt' \| 'uk' \| 'uz' \| 'tr'`                                    | `window.navigator.language` | Optional    |
| `[test]`           | If `true`, the CAPTCHA runs in test mode and always shows a challenge. Use this for debugging and testing purposes only.                                                                                     | `boolean`                                                                                         | `false`                     | Optional    |
| `[webview]`        | Set to `true` when using the CAPTCHA in a **WebView** for mobile apps to improve validation precision.                                                                                                       | `boolean`                                                                                         | `false`                     | Optional    |
| `[invisible]`      | Enables [Invisible CAPTCHA](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha).                                                                                                           | `boolean`                                                                                         | `false`                     | Optional    |
| `[shieldPosition]` | Position of the [data processing notice](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice).                                                                       | `'top-left' \| 'center-left' \| 'bottom-left' \| 'top-right' \| 'center-right' \| 'bottom-right'` | `center-right`              | Optional    |
| `[hideShield]`     | Hide the [data processing notice](https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha#data-processing-notice). You must still inform users about the data processing elsewhere in your app. | `boolean`                                                                                         | `false`                     | Optional    |

### Output Events

|Event|Description|Type|
|---|---|---|
|`(onCallback)`|Triggered on callback.|`EventEmitter<string>`|
|`(onChallengeVisible)`|Triggered when the CAPTCHA challenge pop-up window is displayed.|`EventEmitter<void>`|
|`(onChallengeHidden)`|Triggered when the CAPTCHA challenge pop-up window is closed.|`EventEmitter<void>`|
|`(onNetworkError)`|Triggered when a network error occurs during CAPTCHA loading or verification.|`EventEmitter<void>`|
|`(onJavaScriptError)`|Triggered when a critical JavaScript error occurs during CAPTCHA execution.|`EventEmitter<CaptchaError>`|
|`(onSuccess)`|Triggered when user validation is successfully completed, returning the verification token.|`EventEmitter<string>`|
|`(onTokenExpired)`|Triggered when the verification token expires, indicating that a new validation attempt is needed.|`EventEmitter<void>`|

## Methods

The following methods can be called on the CAPTCHA component instance:

|Method|Description|
|---|---|
|`execute()`|Starts user validation. Useful for triggering invisible CAPTCHA on a specific event, like submitting a form.|
|`reset()`|Resets the CAPTCHA widget to its initial state, clearing any previous state or response.|
|`showError()`|Sets the widget to an error state, which can be used to indicate issues with validation or submission.|
|`getResponse()`|Returns the current CAPTCHA response token. Can be used to retrieve the token if you need to handle the submission logic manually.|
