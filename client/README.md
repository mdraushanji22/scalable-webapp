# Scalable Web App – Client

This is the **React + Vite** frontend for the Scalable Web App.

It provides:

- **Authentication** (login & register)
- A **protected dashboard** with:
  - User profile (name + email)
  - Task CRUD (create / read / update / delete)
  - Search + status filter (all / active / completed)
  - Logout

Styling is done with **Tailwind CSS v4**.

---

## 1. Tech Stack

- **React 19** (SPA)
- **Vite** (dev server & build)
- **React Router** (routing)
- **Axios** (HTTP client)
- **Tailwind CSS 4** + `@tailwindcss/vite` + `@tailwindcss/postcss`

The client talks to the **Node/Express API** running on `http://localhost:5000`.

---

## 2. Prerequisites

Make sure you have:

- **Node.js** (v18+ recommended)
- **npm**

The backend server in `../server` should also be set up and running.

---

## 3. Install dependencies

From the project root:

```bash
cd client
npm install
```

This installs React, Vite, Tailwind 4, and all other frontend deps.

---

## 4. Running the app in development

1. Start the **backend** first (from `server` folder):

   ```bash
   npm run server
   ```

2. Start the **frontend** (from `client` folder):

   ```bash
   npm run dev
   ```

3. Open the URL printed in the terminal (usually):

   - `http://localhost:5173`

---

## 5. Available npm scripts

All commands are run from the `client` folder:

```bash
# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview the production build (after build)
npm run preview

# Lint the code
npm run lint
```

---

## 6. Authentication & Routing

Routing is defined in `src/App.jsx`:

- `/` – **Home** page with links to Login / Register
- `/login` – **Login** page
- `/register` – **Register** page
- `/dashboard` – **Protected dashboard**
  - Wrapped in `ProtectedRoute`
  - Redirects to `/login` if no token is stored

### Token handling

- On **login** and **register**, the backend returns a JWT.
- The token is stored in `localStorage` under the key `token`.
- `src/services/api.js` adds this token to every request:

  ```js
  Authorization: `Bearer ${token}`;
  ```

- If the backend returns `401`, the token is cleared and the user is redirected to `/login`.

### Logout

- On the dashboard, clicking **Logout**:
  - Removes the token from `localStorage`
  - Navigates back to `/`

---

## 7. Dashboard Features

The main dashboard UI lives in `src/components/Dashboard.jsx`.

It includes:

- **User Profile**
  - Fetched from `GET /api/users/profile`
  - Shows current user’s name and email

- **Tasks CRUD**
  - `GET /api/tasks` – load tasks
  - `POST /api/tasks` – create task
  - `PUT /api/tasks/:id` – update title/description/completed
  - `DELETE /api/tasks/:id` – remove task
  - UI:
    - Task list with title, description, and completed checkbox
    - **Edit** and **Delete** pill buttons per task
    - Task form for adding and editing

- **Search & Filter**
  - Text search across title + description
  - Status filter: `All`, `Active`, `Completed`

---

## 8. Styling (Tailwind CSS v4)

Tailwind is configured with:

- `tailwind.config.js`
- `postcss.config.js` using `@tailwindcss/postcss`
- `src/index.css` imports Tailwind:

  ```css
  @import "tailwindcss";
  ```

You can use Tailwind utility classes directly in the JSX (for example: `className="bg-indigo-600 text-white rounded-md"`).

---

## 9. Folder structure (client)

Key directories/files:

```text
client/
  src/
    components/
      Home.jsx
      Login.jsx
      Register.jsx
      Dashboard.jsx
      ProtectedRoute.jsx
    services/
      api.js          # Axios instance + API helpers
    App.jsx           # Routes
    main.jsx          # React entry
    index.css         # Tailwind import + global styles
  vite.config.js      # Vite + Tailwind plugin
  tailwind.config.js
  postcss.config.js
  package.json
```

---

## 10. How to customize

- **Update text / labels** – edit the corresponding component in `src/components`.
- **Change colors / spacing** – adjust Tailwind classes on each element.
- **Add new API calls** – extend `src/services/api.js` and call the helpers from components.

---

If you run into issues starting the client (Vite, Tailwind, or auth errors), check:

1. Backend is running on `http://localhost:5000`.
2. `.env` on the server has a valid `MONGO_URI` and `JWT_SECRET`.
3. Browser console and terminal logs for any specific error messages.

