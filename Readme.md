# SQL Studio

## Frontend

**Create Project**

- npm create vite@latest

**Intialize Docker File**

```
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

Navbar.jsx

```jsx
import logo from "../assets/logo.png";
import { AVATAR_URL } from "../constants/constants";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="logo-header">SQL Studio</h1>
      </div>

      <div className="btn-container">
        <div className="run-btn btn">
          <span className="material-symbols-outlined">play_arrow</span>
        </div>

        <div className="submit-btn btn">
          <span className="material-symbols-outlined">cloud_upload</span>
          Submit
        </div>
      </div>

      <div className="avatar">
        <img className="avatar-image" src={AVATAR_URL} alt="avatar" />
      </div>
    </div>
  );
};

export default Navbar;
```

index.css

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #1a1a1a;
}

.logo-container {
  display: flex;
  gap: 5px;
  align-items: center;
}

.logo {
  height: 30px;
  width: 30px;
}

.logo-header {
  font-size: 16px;
  font-weight: 500;
}

.btn-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn {
  border: 1px solid #2c2c2c;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.run-btn {
  padding: 2px 10px;
  color: #bdbdbd;
  background-color: #2a2a2a;
}

.run-btn:hover {
  background-color: #3a3a3a;
  color: white;
}

.submit-btn {
  padding: 2px 15px;
  color: #00c853;
  background-color: #2a2a2a;
}

.submit-btn:hover {
  background-color: #3a3a3a;
}

.avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #2c2c2c;
}

.avatar-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
```

Body.jsx

```jsx
import MonacoEditor from "../components/MonacoEditor";
import ProblemStatement from "./ProblemStatement";
import Result from "./Result";

const Body = () => {
  return (
    <div className="body">
      <div className="problem-statement">
        <ProblemStatement />
      </div>
      <div className="editor-view">
        <MonacoEditor />
      </div>
    </div>
  );
};

export default Body;
```

index.css

```css
.body {
  display: flex;
  margin: 10px;
  border-radius: 8px;
  height: 90vh;
}

.problem-statement {
  width: 50%;
  margin-right: 10px;
}
```

---

## Backend

**Create Project**

- npm init -y
- npm i express
- npm i dotenv

app.js

```js
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use("/", (req, res) => {
  res.send("Hello Backend!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}...`);
});
```

**Initialize Dockerfile**

```
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## Docker Compose

```
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - mongo
    env_file:
      - ./backend/.env

  frontend:
    build: ./frontend
    ports:
      - "5000:5000"
    depends_on:
      - backend

  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - pgdata:/var/lib/postgresql/data

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
    volumes:
      - mongodata:/data/db

volumes:
  pgdata:
  mongodata:

```
