# API Документация для Frontend Разработчика

## Базовый URL
```
http://localhost:3000/api
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
    "phoneNumber": "+77777777777",
    "birthday": "1990-01-01"
  }
}
```

**Ответ:**
```json
{
  "message": "Регистрация прошла успешно.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "USER",
    "profile": {
      "firstName": "Иван",
      "lastName": "Иванов",
      "phoneNumber": "+77777777777",
      "birthday": "1990-01-01"
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
    "officialCompanyName": "ООО ТурАгентство",
    "bin": "123456789012",
    "registrationDate": "2020-01-01",
    "directorFullName": "Иванов Иван Иванович",
    "city": "Алматы",
    "contactPerson": "Петр Петров",
    "phoneNumber": "+77777777777",
    "contactEmail": "contact@example.com",
    "description": "Описание компании",
    "legalAddress": "Адрес компании",
    "actualAddress": "Фактический адрес",
    "bankAccount": "KZ123456789",
    "bankBic": "ABCDEF",
    "bankName": "Банк",
    "logo": "url_to_logo"
  }
}
```

**Ответ:**
```json
{
  "message": "Регистрация прошла успешно.",
  "user": {
    "id": 2,
    "email": "agency@example.com",
    "role": "TOUR_AGENCY",
    "profile": {
      "companyName": "ТурАгентство",
      "officialCompanyName": "ООО ТурАгентство",
      "bin": "123456789012",
      "registrationDate": "2020-01-01",
      "directorFullName": "Иванов Иван Иванович",
      "city": "Алматы",
      "contactPerson": "Петр Петров",
      "phoneNumber": "+77777777777",
      "contactEmail": "contact@example.com",
      "description": "Описание компании",
      "legalAddress": "Адрес компании",
      "actualAddress": "Фактический адрес",
      "bankAccount": "KZ123456789",
      "bankBic": "ABCDEF",
      "bankName": "Банк",
      "logo": "url_to_logo"
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

## Пользователи

### Получение профиля текущего пользователя
```http
GET /users/me
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Ответ:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "profile": {
    "firstName": "Иван",
    "lastName": "Иванов",
    "phoneNumber": "+77777777777",
    "birthday": "1990-01-01"
  }
}
```

или для тур-агентства:

```json
{
  "id": 2,
  "email": "agency@example.com",
  "role": "TOUR_AGENCY",
  "profile": {
    "companyName": "ТурАгентство",
    "officialCompanyName": "ООО ТурАгентство",
    "bin": "123456789012",
    "registrationDate": "2020-01-01",
    "directorFullName": "Иванов Иван Иванович",
    "city": "Алматы",
    "contactPerson": "Петр Петров",
    "phoneNumber": "+77777777777",
    "contactEmail": "contact@example.com",
    "description": "Описание компании",
    "legalAddress": "Адрес компании",
    "actualAddress": "Фактический адрес",
    "bankAccount": "KZ123456789",
    "bankBic": "ABCDEF",
    "bankName": "Банк",
    "logo": "url_to_logo"
  }
}
```

### Обновление профиля текущего пользователя
```http
PATCH /users/me
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Тело запроса:**
```json
{
  "profile": {
    "firstName": "Новое имя",
    "phoneNumber": "+77777777778"
  }
}
```

**Ответ:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "profile": {
    "firstName": "Новое имя",
    "lastName": "Иванов",
    "phoneNumber": "+77777777778",
    "birthday": "1990-01-01"
  }
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
  "discountPrice": 900.00,
  "type": "ETHNO",
  "status": "REGULAR",
  "maxParticipants": 10,
  "startDate": "2024-03-20",
  "endDate": "2024-03-25",
  "services": ["Питание", "Проживание", "Трансфер"],
  "itinerary": [
    {
      "location": "Локация 1",
      "description": "Описание дня 1",
      "duration": "8 часов"
    },
    {
      "location": "Локация 2",
      "description": "Описание дня 2",
      "duration": "6 часов"
    }
  ]
}
```

**Ответ:**
```json
{
  "id": 1,
  "title": "Название тура",
  "description": "Описание тура",
  "city": "Город",
  "price": 1000.00,
  "discountPrice": 900.00,
  "type": "ETHNO",
  "status": "REGULAR",
  "maxParticipants": 10,
  "startDate": "2024-03-20",
  "endDate": "2024-03-25",
  "services": ["Питание", "Проживание", "Трансфер"],
  "itinerary": [
    {
      "location": "Локация 1",
      "description": "Описание дня 1",
      "duration": "8 часов"
    },
    {
      "location": "Локация 2",
      "description": "Описание дня 2",
      "duration": "6 часов"
    }
  ],
  "createdBy": {
    "id": 2,
    "email": "agency@example.com",
    "role": "TOUR_AGENCY"
  },
  "averageRating": 0,
  "totalReviews": 0,
  "imageUrls": [],
  "createdAt": "2024-04-10T12:00:00Z",
  "updatedAt": "2024-04-10T12:00:00Z"
}
```

### Загрузка изображений для тура
```http
POST /tours/upload-images
```

**Заголовки:**
```
Authorization: Bearer jwt_token
Content-Type: multipart/form-data
```

**Тело запроса:**
- Файлы с изображениями (поле `images`)

**Ответ:**
```json
{
  "urls": [
    "https://example.com/images/tour1-1.jpg",
    "https://example.com/images/tour1-2.jpg"
  ]
}
```

### Получение всех туров
```http
GET /tours
```

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Название тура",
    "description": "Описание тура",
    "city": "Город",
    "price": 1000.00,
    "type": "ETHNO",
    "status": "REGULAR",
    "maxParticipants": 10,
    "startDate": "2024-03-20",
    "endDate": "2024-03-25",
    "services": ["Питание", "Проживание", "Трансфер"],
    "itinerary": [...],
    "averageRating": 4.5,
    "totalReviews": 10,
    "createdBy": {
      "id": 2,
      "email": "agency@example.com",
      "role": "TOUR_AGENCY"
    },
    "agencyName": "ТурАгентство",
    "agencyLogo": "https://example.com/logo.jpg",
    "agencyCity": "Алматы",
    "agencyDescription": "Описание компании"
  },
  // другие туры
]
```

### Получение туров агентства
```http
GET /tours/agency/my
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Название тура",
    "description": "Описание тура",
    // остальные поля тура
  },
  // другие туры агентства
]
```

### Получение тура по ID
```http
GET /tours/:id
```

**Ответ:**
```json
{
  "id": 1,
  "title": "Название тура",
  "description": "Описание тура",
  "city": "Город",
  "price": 1000.00,
  "type": "ETHNO",
  "status": "REGULAR",
  "maxParticipants": 10,
  "startDate": "2024-03-20",
  "endDate": "2024-03-25",
  "services": ["Питание", "Проживание", "Трансфер"],
  "itinerary": [...],
  "imageUrls": ["url1", "url2"],
  "averageRating": 4.5,
  "totalReviews": 10,
  "createdBy": {
    "id": 2,
    "email": "agency@example.com",
    "role": "TOUR_AGENCY"
  },
  "agencyName": "ТурАгентство",
  "agencyLogo": "https://example.com/logo.jpg",
  "agencyCity": "Алматы",
  "agencyDescription": "Описание компании"
}
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
  "discountPrice": 1000.00,
  "maxParticipants": 15
}
```

**Ответ:**
```json
{
  "id": 1,
  "title": "Обновленное название",
  "description": "Обновленное описание",
  "city": "Город",
  "price": 1200.00,
  "discountPrice": 1000.00,
  "type": "ETHNO",
  "status": "REGULAR",
  "maxParticipants": 15,
  "startDate": "2024-03-20",
  "endDate": "2024-03-25",
  // другие поля тура
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

**Ответ:**
```json
{
  "message": "Тур успешно удален"
}
```

## Отзывы

### Добавление отзыва к туру
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

**Ответ:**
```json
{
  "id": 1,
  "rating": 5,
  "comment": "Отличный тур!",
  "createdAt": "2024-04-10T12:00:00Z",
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "tour": {
    "id": 1,
    "title": "Название тура"
  }
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

**Ответ:**
```json
{
  "message": "Тур добавлен в избранное"
}
```

### Удаление тура из избранного
```http
DELETE /tours/:id/favorite
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Ответ:**
```json
{
  "message": "Тур удален из избранного"
}
```

### Получение избранных туров
```http
GET /tours/favorites/my
```

**Заголовки:**
```
Authorization: Bearer jwt_token
```

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Название тура",
    "description": "Описание тура",
    // другие поля тура
  },
  // другие избранные туры
]
```

## Типы данных

### TourType
```typescript
enum TourType {
  ETHNO = 'ethno',
  NATURE = 'nature',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
  GASTRO = 'gastronomy',
  OTHER = 'other'
}
```

### TourStatus
```typescript
enum TourStatus {
  HOT = 'hot',
  SEASONAL = 'seasonal',
  NEW_DESTINATION = 'new_destination',
  REGULAR = 'regular'
}
```

### Role
```typescript
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  TOUR_AGENCY = 'TOUR_AGENCY',
  GUEST = 'GUEST'
}
```

### ItineraryItem
```typescript
interface ItineraryItem {
  location: string;
  description: string;
  duration: string;
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
5. Все цены указываются в тенге (KZT)
6. Рейтинг отзывов должен быть от 0 до 5
7. API использует глобальный префикс `/api` для всех эндпоинтов
8. Изображения загружаются через MinIO хранилище
9. Для получения публичных данных можно не использовать токен авторизации 