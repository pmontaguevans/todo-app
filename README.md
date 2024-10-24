# A simple todo app

## Overview

This application is a simple Todo app that allow users to create, read, update, and delete tasks. It consists of a small backend service built with node + express and a frontend application built with React.

### TL;DR - How to run the app

### Prerequisites (local setup)

- Node.js (v20 or later)
- npm

---

1. Clone the repository

- `git clone https://github.com/yourusername/todo-app.git`

- `cd todo-app`

2. Install dependencies

- `cd backend && npm install`
- `cd todo && npm install`

3. Run the backend service

- `npm start`

4. Run the frontend app

- `cd ../todo && npm start`

5. Access the app

- `open the browser and navigate to http://`

### Deploy through Vercel
Go to 

## App structure

The application is divided into two main folders:

- Backend: contains the node service that provides a RESTful API for managing todos.
- Frontend: contains the React application for the UI.

## REST API

The backend service exposes the following endpoints for interacting with todos and uses the fs library as a file-based db to persist todos:

- GET `/api/todos`: Retrieve all todos.
- POST `/api/todos`: Create a new todo.
- PUT `/api/todos/:id`: Update an existing todo by ID.
- DELETE `/api/todos/:id`: Delete a todo by ID.

## Sample Todo data

`  { id": 3,
    "title": "Clean the house",
    "description": "Vacuum",
    "dueDate": "2024-10-25",
    "isCompleted": true }`

## Frontend

#### The following can be expected:

- Add new todos
- Edit existing todos
- Delete todos
- Search through the list of todos
- Pagination
- Mark them as completed

# Getting started

#### Goal and leftovers

Due to time constraints I skipped a few steps which otherwise would've been implemented in a larger scale, real life application.

- Better error handling in both frontend and backend (E.g input validation which I probably would've used Zod for schema and and input validation, more try / catch blocks)
- Implement state handling using state management apis like the built in context api, redux or Zustand if application was scoped to be a fully featured todo app. If routing was a key feature I'd make a NextJS app instead for its out-of-the-box route handling
- Filtering for completed tasks
- Delete / clear all tasks
- The app didn't really follow my initial design, but ended up more smooth and clean than the initial design
- Typescript
- Unit tests
- Comments
- Use Terraform for infrastructure through GCP
- API documentation with Swagger / Apollo
- Use css libraries like Styled components or tailwind
- Refactor
