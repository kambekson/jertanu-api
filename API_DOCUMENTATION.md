# API Документация для Frontend Разработчика

## Базовый URL
```
http://localhost:3000
```

## Аутентификация

### Регистрация пользователя
```http
POST /auth/register/user
```

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "profile": {
    "firstName": "Иван",
    "lastName": "Иванов",
    "phone": "+77777777777"
  }
}
```

**Ответ:**
```json
{
  "message": "Регистрация прошла успешно.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "USER",
    "profile": {
      "firstName": "Иван",
      "lastName": "Иванов",
      "phone": "+77777777777"
    }
  },
  "token": "jwt_token"
}
```

### Регистрация тур-агентства
```http
POST /auth/register/agency
```

**Тело запроса:**
```json
{
  "email": "agency@example.com",
  "password": "password123",
  "profile": {
    "companyName": "ТурАгентство",
    "description": "Описание компании",
    "phone": "+77777777777",
    "address": "Адрес компании"
  }
}
```

**Ответ:**
```json
{
  "message": "Регистрация прошла успешно.",
  "user": {
    "id": "uuid",
    "email": "agency@example.com",
    "role": "TOUR_AGENCY",
    "profile": {
      "companyName": "ТурАгентство",
      "description": "Описание компании",
      "phone": "+77777777777",
      "address": "Адрес компании"
    }
  },
  "token": "jwt_token"
}
```

### Вход в систему
```http
POST /auth/sign-in
```

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "access_token": "jwt_token",
  "refresh_token": "refresh_token"
}
```

### Обновление токена
```http
POST /auth/refresh
```

**Тело запроса:**
```json
{
  "refresh": "refresh_token"
}
```

**Ответ:**
```json
{
  "access_token": "new_jwt_token",
  "refresh_token": "new_refresh_token"
}
```

## Туры

### Создание тура (только для тур-агентств)
```http
POST /tours
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Тело запроса:**
```json
{
  "title": "Название тура",
  "description": "Описание тура",
  "city": "Город",
  "price": 1000.00,
  "discountPercentage": 10,
  "type": "ETHNO",
  "status": "REGULAR",
  "startDate": "2024-03-20",
  "endDate": "2024-03-25"
}
```

### Получение всех туров
```http
GET /tours
```

### Получение тура по ID
```http
GET /tours/:id
```

### Обновление тура (только для тур-агентств)
```http
PATCH /tours/:id
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Тело запроса:**
```json
{
  "title": "Обновленное название",
  "description": "Обновленное описание",
  "price": 1200.00,
  "discountPercentage": 15
}
```

### Удаление тура (только для тур-агентств)
```http
DELETE /tours/:id
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

## Отзывы

### Добавление отзыва
```http
POST /tours/:id/reviews
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Тело запроса:**
```json
{
  "rating": 5,
  "comment": "Отличный тур!"
}
```

## Избранное

### Добавление тура в избранное
```http
POST /tours/:id/favorite
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

### Удаление тура из избранного
```http
DELETE /tours/:id/favorite
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

### Получение избранных туров
```http
GET /tours/favorites/my
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

## Типы данных

### TourType
```typescript
enum TourType {
  ETHNO = 'ethno',
  NATURE = 'nature',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
  OTHER = 'other'
}
```

### TourStatus
```typescript
enum TourStatus {
  REGULAR = 'regular',
  HOT = 'hot',
  SALE = 'sale'
}
```

## Обработка ошибок

Все эндпоинты могут возвращать следующие ошибки:

- `400 Bad Request` - некорректные данные запроса
- `401 Unauthorized` - отсутствует токен или токен недействителен
- `403 Forbidden` - недостаточно прав для выполнения операции
- `404 Not Found` - запрашиваемый ресурс не найден
- `500 Internal Server Error` - внутренняя ошибка сервера

## Примечания

1. Все запросы, требующие аутентификации, должны содержать JWT токен в заголовке `Authorization: Bearer <token>`
2. Токен доступа (access_token) действителен 15 минут
3. Токен обновления (refresh_token) действителен 7 дней
4. Все даты должны быть в формате ISO 8601 (YYYY-MM-DD)
5. Все цены указываются в тенге
6. Рейтинг отзывов должен быть от 0 до 5 