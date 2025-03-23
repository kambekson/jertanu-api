# API Documentation: Tours Module

## Base URL
```
http://your-api-domain/api
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Tours

#### Create Tour
```http
POST /tours
```

**Authorization Required:** Yes (Tour Agency only)

**Request Body:**
```json
{
  "title": "Этнографический тур по Казахстану",
  "description": "Погружение в культуру и традиции казахского народа",
  "city": "Алматы",
  "price": 1500.00,
  "discountPercentage": 10,
  "type": "ethno",
  "status": "hot",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Этнографический тур по Казахстану",
  "description": "Погружение в культуру и традиции казахского народа",
  "city": "Алматы",
  "price": 1500.00,
  "discountPercentage": 10,
  "type": "ethno",
  "status": "hot",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07",
  "averageRating": 0,
  "totalReviews": 0,
  "createdBy": {
    "id": 1,
    "email": "agency@example.com"
  },
  "reviews": [],
  "favoritedBy": [],
  "createdAt": "2024-03-23T12:00:00Z",
  "updatedAt": "2024-03-23T12:00:00Z"
}
```

#### Get All Tours
```http
GET /tours
```

**Authorization Required:** No

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Этнографический тур по Казахстану",
    "description": "Погружение в культуру и традиции казахского народа",
    "city": "Алматы",
    "price": 1500.00,
    "discountPercentage": 10,
    "type": "ethno",
    "status": "hot",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "averageRating": 4.5,
    "totalReviews": 2,
    "createdBy": {
      "id": 1,
      "email": "agency@example.com"
    },
    "reviews": [...],
    "favoritedBy": [...],
    "createdAt": "2024-03-23T12:00:00Z",
    "updatedAt": "2024-03-23T12:00:00Z"
  }
]
```

#### Get Tour by ID
```http
GET /tours/:id
```

**Authorization Required:** No

**Parameters:**
- `id` (number) - Tour ID

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Этнографический тур по Казахстану",
  "description": "Погружение в культуру и традиции казахского народа",
  "city": "Алматы",
  "price": 1500.00,
  "discountPercentage": 10,
  "type": "ethno",
  "status": "hot",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07",
  "averageRating": 4.5,
  "totalReviews": 2,
  "createdBy": {
    "id": 1,
    "email": "agency@example.com"
  },
  "reviews": [...],
  "favoritedBy": [...],
  "createdAt": "2024-03-23T12:00:00Z",
  "updatedAt": "2024-03-23T12:00:00Z"
}
```

#### Update Tour
```http
PATCH /tours/:id
```

**Authorization Required:** Yes (Tour Agency only)

**Parameters:**
- `id` (number) - Tour ID

**Request Body:**
```json
{
  "title": "Обновленное название тура",
  "price": 1600.00,
  "discountPercentage": 15
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Обновленное название тура",
  "description": "Погружение в культуру и традиции казахского народа",
  "city": "Алматы",
  "price": 1600.00,
  "discountPercentage": 15,
  "type": "ethno",
  "status": "hot",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07",
  "averageRating": 4.5,
  "totalReviews": 2,
  "createdBy": {
    "id": 1,
    "email": "agency@example.com"
  },
  "reviews": [...],
  "favoritedBy": [...],
  "createdAt": "2024-03-23T12:00:00Z",
  "updatedAt": "2024-03-23T12:30:00Z"
}
```

#### Delete Tour
```http
DELETE /tours/:id
```

**Authorization Required:** Yes (Tour Agency only)

**Parameters:**
- `id` (number) - Tour ID

**Response (200 OK):** Empty response

### Reviews

#### Add Review
```http
POST /tours/:id/reviews
```

**Authorization Required:** Yes

**Parameters:**
- `id` (number) - Tour ID

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Отличный тур! Очень понравилось погружение в культуру."
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "rating": 5,
  "comment": "Отличный тур! Очень понравилось погружение в культуру.",
  "user": {
    "id": 2,
    "email": "user@example.com"
  },
  "tour": {
    "id": 1,
    "title": "Этнографический тур по Казахстану"
  },
  "createdAt": "2024-03-23T13:00:00Z",
  "updatedAt": "2024-03-23T13:00:00Z"
}
```

### Favorites

#### Add to Favorites
```http
POST /tours/:id/favorite
```

**Authorization Required:** Yes

**Parameters:**
- `id` (number) - Tour ID

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Этнографический тур по Казахстану",
  "favoritedBy": [
    {
      "id": 2,
      "email": "user@example.com"
    }
  ]
}
```

#### Remove from Favorites
```http
DELETE /tours/:id/favorite
```

**Authorization Required:** Yes

**Parameters:**
- `id` (number) - Tour ID

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Этнографический тур по Казахстану",
  "favoritedBy": []
}
```

#### Get My Favorites
```http
GET /tours/favorites/my
```

**Authorization Required:** Yes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Этнографический тур по Казахстану",
    "description": "Погружение в культуру и традиции казахского народа",
    "city": "Алматы",
    "price": 1500.00,
    "discountPercentage": 10,
    "type": "ethno",
    "status": "hot",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "averageRating": 4.5,
    "totalReviews": 2
  }
]
```

## Enums

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
  HOT = 'hot',
  SEASONAL = 'seasonal',
  REGULAR = 'regular',
  UPCOMING = 'upcoming'
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "You can only update your own tours",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Tour with ID 1 not found",
  "error": "Not Found"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["rating must be between 0 and 5"],
  "error": "Bad Request"
}
```

## Notes
1. All dates are in ISO 8601 format
2. Prices are in decimal format with 2 decimal places
3. Ratings are integers from 0 to 5
4. Discount percentages are integers from 0 to 100
5. All protected endpoints require valid JWT token
6. Tour Agency can only modify their own tours
7. Reviews can only be added by authenticated users
8. Favorites functionality is available only to authenticated users 