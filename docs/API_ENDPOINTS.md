# API Endpoints Documentation

This document provides details about the available API endpoints.

#### GET /

**Description:** Returns a welcome message for the API's homepage.

**Response:**
- **Status Code:** 200 OK
- **Body:**
```json
{
    "message": "Welcome to api."
}
```

#### POST /auth/register

**Description:** Registers a new user.

**Request Body:**

- **username:** string (required)
- **password:** string (required)
- **name:** string (required)
- **email:** string (required)
- **last_name:** string (optional)

**Response:**

- **Status Code:** 201 Created
- **Body:**
```json
{
    "message": "Successfully registered."
}
```
**Errors:**

- **Status Code:**
- **Body:**
```json
{
    "message": "All fields are required."
}
```
or
```json
{
    "message": "Validation error details."
}
```

#### POST /auth/login

**Description:** Logs in a user and returns an access token.

**Request Body:**

- **identifier:** string (required) (username or email)
- **password:** string (required)

**Response:**

- **Status Code**: 201 Created
- **Body:**
```json
{
    "access_token": "JAHDSBHJASBDNHJ...",
    "expires_in": "3600"
}
```

**Errors:**

- **Status Code:** 401 Unauthorized
- **Body:**
```json
{
    "message": "Invalid credentials."
}
```

#### POST /auth/refresh-token

**Description:** Refreshes the access token using a refresh token.

**Request Body:**

- **refresh_token:** string (required)

Response:

- **Status Code:** 201 Created
- **Body:**
```json
{
    "access_token": "JAHDSBHJASBDNHJ...",
    "expires_in": "3600"
}
```

**Errors:**

- **Status Code:** 401 Unauthorized
- **Body:**
```json
{
    "message": "Invalid refresh token."
}
```
