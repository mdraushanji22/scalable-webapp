# Scalable Web App with Authentication & Dashboard

A full-stack web application built with React.js, Node.js/Express, and MongoDB featuring user authentication, dashboard, and CRUD operations.

## Features

- User authentication (register/login) with JWT
- Protected routes
- User profile management
- Task management (CRUD operations)
- Responsive design with Tailwind CSS
- Error handling and validation

## Tech Stack

### Frontend
- React.js 18+
- React Router v6+
- Tailwind CSS v3
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Register a new user account
2. Login with your credentials
3. Access the dashboard to manage your profile and tasks
4. Create, read, update, and delete tasks

## Project Structure

```
scalable-webapp/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── services/       # API service files
│       ├── App.jsx         # Main App component
│       └── main.jsx        # Entry point
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Tasks
- `POST /api/tasks` - Create a new task (protected)
- `GET /api/tasks` - Get all tasks for user (protected)
- `GET /api/tasks/:id` - Get a specific task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)

## Development

To run both frontend and backend in development mode:

1. Start MongoDB locally or use a cloud instance
2. Update the `.env` file with your MongoDB connection string
3. In one terminal, start the backend:
   ```bash
   cd server
   npm run server
   ```
4. In another terminal, start the frontend:
   ```bash
   cd client
   npm run dev
   ```

## Building for Production

### Backend
The backend doesn't need a build step as it runs directly with Node.js.

### Frontend
To create a production build of the frontend:

```bash
cd client
npm run build
```

The build files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please open an issue on the repository.
