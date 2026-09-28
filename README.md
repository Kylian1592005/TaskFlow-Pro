# TaskFlow Pro

A modern, responsive React + Vite task management workspace engineered for seamless project tracking through an intuitive Kanban interface.

## Overview

TaskFlow Pro provides a clean, distraction-free environment to organize, prioritize, and track your daily workflows. Built with React 19 and Tailwind CSS, it offers smooth state management and persistent local storage to ensure your tasks stay synchronized across sessions.

## Key Features

- **Interactive Kanban Board:** Effortlessly structure tasks across **Todo**, **In Progress**, and **Done** status columns.
- **Full Task Lifecycle:** Create, edit, and delete tasks with instant UI state updates.
- **Real-Time Search & Filtering:** Dynamic search by task titles/details combined with priority-level filtering.
- **State Persistence:** Custom local storage hook (`useLocalStorage`) guarantees data retention across page refreshes.
- **Responsive Layout:** Clean, accessible interface styled with Tailwind CSS for mobile and desktop screens.

## Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS
- **State & Storage:** React Hooks, Browser LocalStorage

## Project Structure

```bash
src/
├── App.jsx
├── components/
│   ├── KanbanBoard.jsx
│   ├── KanbanColumn.jsx
│   ├── SearchFilter.jsx
│   ├── TaskCard.jsx
│   └── TaskForm.jsx
├── context/
├── hooks/
│   └── useLocalStorage.js
├── main.jsx
└── App.css