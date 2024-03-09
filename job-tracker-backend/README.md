# Job Application Tracker Backend Documentation

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## Getting Started

### Prerequisites

Before you can run this backend application, you need to have the following software and tools installed:

- Node.js (v20.7.0 or higher)
- npm (Node Package Manager)
- MongoDB (Make sure you have a MongoDB server running and accessible)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/ivannikitovic/job-tracker.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd job-tracker/backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure your environment variables (see [Configuration](#configuration)).

5. Start the server:

   ```bash
   npm start
   ```

The server should now be running on the specified port (default is 8000) and connected to your MongoDB database.

## Usage

### Configuration

You need to configure your environment variables by creating a `.env` file in the project root. Here's an example `.env` file:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your-database-name
MONGODB_DB_NAME=main
JWT_SECRET=your-secret-key
```

Make sure to replace `your-database-name` and `your-secret-key` with your actual database name and JWT secret key.

### API Endpoints

The backend provides the following API endpoints:

- **User Authentication**:
  - `POST /user/signup`: Create a new user account.
  - `POST /user/login`: Sign in and receive an access token.

- **Jobs**:
  - `POST /jobs/:user_id`: Create a new job.
  - `GET /jobs/:user_id`: Get all jobs associated with a user.
  - `GET /jobs/:user_id/:job_id`: Get a specific job by ID.
  - `PUT /jobs/:user_id/:job_id`: Update a job by ID.
  - `DELETE /jobs/:user_id/:job_id`: Delete a job by ID.

Please refer to the API documentation or Postman for more details on how to use these endpoints.

## Folder Structure

The project folder structure is organized as follows:

- `controllers/`: Contains controller logic for handling HTTP requests.
- `models/`: Defines Mongoose models for the MongoDB collections.
- `routes/`: Defines the API routes and their associated controllers.
- `services/`: Contains business logic and services used by controllers.
- `utils/`: Contains custom middleware functions.
- `server.js`: The entry point of the application.
- `.env`: Configuration file for environment variables.
- `package.json`: Project dependencies and scripts.
- `README.md`: This README file.

## License

This project is licensed under the [MIT License](LICENSE.md).
