# Todo API

## Description

Todo API is a simple and effective RESTful API for managing todo items. It allows users to create, read, update, and delete todo items. Additionally, it includes features for user registration and authentication, IP blacklisting, and admin capabilities. This project is designed to be a template for building scalable and maintainable APIs using Node.js, Express, and MongoDB.

## Features

- User registration and authentication with JWT
- Users can log in using either email or username
- Token refresh functionality
- Admin capabilities for user management
- IP blacklisting for security
- Rate limiting and speed limiting
- Docker support for containerization
- Comprehensive testing with Jest and Supertest

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (v18.x or later)
- Docker (for containerization)
- MongoDB (or use Docker to set up MongoDB)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/aquie00t/todo-api.git
    cd todo-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   You will need to create environment variable files for different environments:

   - **`.env.development`**: For development environment
   - **`.env.test`**: For testing environment
   - **`.env.production`**: For production environment

   Copy the `.env.example` file to each of these files and update the values as needed:

    ```bash
    cp .env.example .env.development
    cp .env.example .env.test
    cp .env.example .env.production
    ```

4. **Run the application:**

   To run the application locally:

    ```bash
    npm run dev
    ```

   To start the application with Docker:

    ```bash
    docker-compose up
    ```

### API Endpoints

Refer to the [API Endpoints Documentation](docs/API_ENDPOINTS.md) for detailed information about the available API endpoints.

### Running Tests

To run tests, use the following command:

```bash
npm test
````

### Contributing

Please refer to the [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines on how to contribute to this project.


### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

### Contact

For any inquiries or support, please contact us at aquie00t@icloud.com.

