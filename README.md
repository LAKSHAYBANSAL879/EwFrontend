# React User Management App

## Overview
This React application integrates with the Reqres API to perform basic user management functions, including authentication, listing users with pagination, and editing/deleting users.

## Features
### Level 1: Authentication Screen
- Allows users to log in with the following credentials:
  - **Email:** eve.holt@reqres.in
  - **Password:** cityslicka
- Uses `POST /api/login` to authenticate users.
- On successful login, stores the token and navigates to the Users List page.

### Level 2: List All Users
- Fetches and displays a paginated list of users using `GET /api/users?page=1`.
- Shows user first name, last name, and avatar in a structured layout.
- Implements pagination and skeleton loading.

### Level 3: Edit, Delete, and Update Users
- **Edit:** Users can update their first name, last name, and email using `PUT /api/users/{id}`.
- **Delete:** Users can be removed using `DELETE /api/users/{id}`.
- Shows success/error messages based on API responses.

### Live Hosted Link

You can watch the hosted link at: [https://storied-tapioca-fd73a2.netlify.app/]

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/LAKSHAYBANSAL879/EwFrontend.git
  
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Technologies Used
- **React** for frontend UI.
- **Axios** for API requests.
- **React Router** for navigation.
- **Tailwind CSS** for styling.
- **React Toastify** for notifications.
- **Lucide Icons** for icons

## API Endpoints Used
| Action        | Method | Endpoint                 | Description |
|--------------|--------|-------------------------|-------------|
| Login        | POST   | /api/login              | Authenticates the user. |
| Fetch Users  | GET    | /api/users?page=1       | Retrieves a list of users. |
| Edit User    | PUT    | /api/users/{id}         | Updates a user's details. |
| Delete User  | DELETE | /api/users/{id}         | Removes a user. |

## Project Structure
```
/react-reqres-user-management
├── src
│   ├── components
│   │   ├── Login.jsx
│   │   ├── UsersList.jsx
│   │   └── LoginError.jsx
│   ├── App.js
│   ├── index.js
│   └── styles.css
└── README.md
```




