# Troov Backend

This is the backend for the Troov application, built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/HaithemSoussi/Troov-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Troov-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Running the Application

1. Start the server:
   ```sh
   npm start
   ```
2. The server will run on `http://localhost:5000`.

### API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/products` - Get all products
- `GET /api/users/products/:id` - Get a product by ID
- `POST /api/users/products` - Add a new product
- `PATCH /api/users/products/:id` - Update a product
- `DELETE /api/users/products/:id` - Delete a product

### License

This project is licensed under the ISC License.
