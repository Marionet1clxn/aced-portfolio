# Настройка EmailJS для формы контактов

## Шаг 1: Регистрация на EmailJS

1. Зайдите на [emailjs.com](https://emailjs.com)
2. Зарегистрируйтесь (бесплатный план позволяет 200 писем в месяц)
3. Подтвердите email

## Шаг 2: Настройка Email Service (SMTP - рекомендуется)

1. В панели EmailJS перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите **"SMTP"** (рекомендуется) или "Outlook"
4. Для SMTP настройте:
   - **SMTP Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **Username**: `levserduk76@gmail.com`
   - **Password**: Используйте пароль приложения Gmail
5. Скопируйте **Service ID** (например: `service_abc123`)

### Как получить пароль приложения Gmail:

1. Включите двухфакторную аутентификацию в Google
2. Перейдите в [Настройки безопасности Google](https://myaccount.google.com/apppasswords)
3. Выберите "Почта" и "Другое (пользовательское имя)"
4. Введите название (например: "EmailJS")
5. Скопируйте сгенерированный пароль (16 символов)

## Шаг 3: Создание Email Template

1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Настройте шаблон:

**Subject:**
```
Новое сообщение с портфолио от {{from_name}}
```

**Body:**
```
Имя: {{from_name}}
Контакты: {{from_contact}}

Сообщение:
{{message}}

---
Отправлено с сайта портфолио
```

4. Сохраните и скопируйте **Template ID** (например: `template_xyz789`)

## Шаг 4: Получение Public Key

1. Перейдите в "Account" → "API Keys"
2. Скопируйте **Public Key** (например: `user_def456`)

## Шаг 5: Обновление кода

Замените в файле `src/AcedPortfolio.jsx`:

```javascript
// Строка 25
window.emailjs.init("YOUR_PUBLIC_KEY"); // Замените на ваш ключ

// Строка 58
"YOUR_SMTP_SERVICE_ID", // Замените на SMTP Service ID
"YOUR_TEMPLATE_ID", // Замените на ваш Template ID
```

Например:
```javascript
window.emailjs.init("user_def456");
// ...
await window.emailjs.send(
  "service_abc123",
  "template_xyz789",
  {
    from_name: formData.name,
    from_contact: formData.contact,
    message: formData.message,
    to_email: "levserduk76@gmail.com",
    reply_to: formData.contact,
  }
);
```

## Альтернатива: Fallback режим

Если EmailJS не настроен, форма автоматически откроет почтовый клиент с заполненными данными.

## Решение проблем

### Ошибка 412 Gmail API:
- Используйте SMTP вместо Gmail API
- Или настройте Outlook сервис
- Или используйте fallback режим

### Ошибка аутентификации:
- Проверьте пароль приложения Gmail
- Убедитесь, что двухфакторная аутентификация включена
- Попробуйте пересоздать пароль приложения

## Тестирование

1. Запустите проект: `npm run dev`
2. Заполните форму на сайте
3. Нажмите "Отправить"
4. Проверьте почту

## Безопасность

- Public Key безопасно использовать в фронтенде
- EmailJS автоматически ограничивает количество запросов
- Данные передаются через HTTPS
- Пароль приложения безопаснее обычного пароля 