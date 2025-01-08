# Plant Logger Backend

## Table of Contents
- [Overview](#overview)
- [Requirements](#requirements)
- [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Starting the Containers](#starting-the-containers)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Status](#status)
    - [Plants](#plants)
    - [Logs](#logs)
    - [Changes](#changes)

## Overview
This is the backend for the Plant Logger application, built with Node.js and Express. It uses Docker and Docker Compose for containerized deployment and includes a MariaDB database.

## Requirements
- Docker Desktop (Linux, macOS, or Windows)
- Node.js (if you want to run the app locally without Docker)
- A `.env` file with the necessary environment variables

## Setup

### Environment Variables
Create a `.env` file in the root directory of the project with the following variables:

```env
NODE_ENV=development
NODE_PORT=3000
DB_HOST=db
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=plant_logger
DB_ROOT_PASSWORD=your_root_password
```

Replace `your_password` and `your_root_password` with secure values.

### Starting the Containers

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
   This command will start the application and the MariaDB database.

2. Access the application:
   - The backend will be available at `http://localhost:3000`.

3. Verify the status endpoint:
   ```bash
   curl http://localhost:3000/status
   ```
   Response:
   ```json
   { "message": "Server is running!" }
   ```

## API Documentation

### Endpoints

#### Status
- **GET /** or **GET /status**
  - Description: Check if the server is running.
  - Response:
    ```json
    { "message": "Server is running!" }
    ```

#### Plants
- **POST /plants**
  - Description: Create a new plant.
  - Body:
    ```json
    {
      "name": "Plant Name",
      "species": "Plant Species"
    }
    ```
  - Response:
    ```json
    { "status_code": 201, "message": "Plant created successfully", "data": { "id": "plant_id" } }
    ```

- **GET /plants**
  - Description: Retrieve a list of plants.
  - Query Parameters: Optional filters.
  - Response:
    ```json
    { "status_code": 200, "message": "Plants loaded successfully", "data": { "plants": [...] } }
    ```

- **GET /plants/:id**
  - Description: Retrieve a plant by ID.
  - Response:
    ```json
    { "status_code": 200, "message": "{id} loaded", "data": { "plant": {...} } }
    ```

- **PUT /plants/:id**
  - Description: Update a plant by ID.
  - Body:
    ```json
    {
      "name": "Updated Plant Name",
      "species": "Updated Species"
    }
    ```
  - Response:
    ```json
    { "status_code": 200, "message": "Plant updated successfully", "data": { "plant": {...} } }
    ```

- **DELETE /plants/:id**
  - Description: Delete a plant by ID.
  - Response:
    ```json
    { "status_code": 204, "message": "{id} deleted", "data": { "plant": {...} } }
    ```

#### Logs
- **GET /logs/:plantId**
  - Description: Retrieve logs for a specific plant.
  - Response:
    ```json
    { "message": "get logs by plant ID loaded {plantId}" }
    ```

#### Changes
- **POST /changes**
  - Description: Create a new change entry.
  - Body:
    ```json
    {
      "type": "Change Type",
      "details": "Change Details"
    }
    ```
  - Response:
    ```json
    { "message": "Change creation loaded", "body": {...} }
    ```

- **GET /changes/:plantId**
  - Description: Retrieve changes for a specific plant.
  - Response:
    ```json
    { "message": "{plantId} loaded" }
    
