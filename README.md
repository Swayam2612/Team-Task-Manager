# Team Task Manager

A modern full-stack team collaboration and productivity platform built with React, Node.js, Express, SQLite, and Vite.

This application allows users to manage projects, teams, tasks, analytics, notifications, calendar scheduling, activity tracking, and workspace settings inside a professional SaaS-style dashboard.

---

# Features

## Authentication System

* User Signup
* User Login
* Persistent session using Local Storage
* User-specific dashboard data
* Multi-user architecture support

---

## Dashboard Analytics

* Modern analytics dashboard
* Project statistics
* Task completion tracking
* Team overview
* Pie chart visualization
* Bar chart visualization
* Productivity insights
* Responsive dashboard cards
* Real-time dashboard updates

---

## Project Management

* Create projects
* Delete projects
* Project descriptions
* Project deadlines
* Project detail pages
* User-specific project storage
* Dashboard integration

---

## Team Management

* Create teams
* Link teams to projects
* Team collaboration structure
* Team detail pages
* Team-based organization
* User-specific team visibility

---

## Task Management

* Create tasks
* Task descriptions
* Task priority system
* Task status tracking
* Assign tasks
* Add comments
* Add attachments/URLs
* Task detail pages
* User-specific task visibility

---

## Calendar System

* Deadline visualization
* Highlighted task deadlines
* Overdue task tracking
* Selected date task display
* Interactive calendar UI

---

## Notifications System

* Dynamic notifications
* Mark as Read functionality
* Real-time activity alerts
* Notification persistence

---

## Activity Feed

* Activity logging
* Project activity tracking
* Task activity tracking
* Team activity tracking
* Workspace timeline updates

---

## Kanban Board

* Drag-and-drop inspired layout
* Task workflow organization
* Status-based task categorization

---

## Settings & Workspace Personalization

* Dark mode support
* Workspace settings panel
* Professional glassmorphism UI
* Responsive modern design

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Recharts
* Lucide React Icons
* Axios
* CSS3
* Vite

---

## Backend

* Node.js
* Express.js
* SQLite3

---

# Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── src/
│   │   ├── db/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── taskmanager.db
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── styles.css
│   │
│   └── package.json
│
└── README.md
```

---

# Database Architecture

The application uses SQLite with the following tables:

* users
* projects
* tasks
* teams
* notifications
* activities

Each major entity contains a `user_id` field to support multi-user data isolation.

---

# Multi-User Data Isolation

This application supports user-specific workspaces.

Each logged-in user can only:

* view their own projects
* view their own tasks
* view their own teams
* view their own dashboard analytics
* receive their own notifications
* view their own activity feed

This is achieved through:

```sql
WHERE user_id = ?
```

queries across backend routes.

---

# UI Design System

The interface uses a modern SaaS-inspired design system featuring:

* Glassmorphism cards
* Gradient backgrounds
* Responsive layouts
* Soft shadows
* Analytics-driven dashboards
* Interactive charts
* Modern spacing system
* Dark mode support
* Smooth hover animations

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/your-username/team-task-manager.git
```

---

## 2. Navigate to Project

```bash
cd team-task-manager
```

---

# Backend Setup

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Start Backend Server

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Required Packages

## Frontend Packages

```bash
npm install react-router-dom axios recharts lucide-react
```

---

## Backend Packages

```bash
npm install express sqlite3 cors nodemon
```

---

# Environment & Local Storage

The application currently uses:

* Local Storage for session persistence
* SQLite for database management
* REST API architecture

Future improvements can include:

* JWT Authentication
* Role-based authorization
* Cloud database integration
* File uploads
* Real-time socket updates

---

# Screens Included

The application includes:

* Login Page
* Signup Page
* Analytics Dashboard
* Projects Page
* Teams Page
* Tasks Page
* Calendar Page
* Notifications Page
* Activity Feed
* Kanban Board
* Profile Page
* Settings Page

---

# Current Highlights

## Responsive Dashboard

Professional analytics dashboard with:

* Pie charts
* Bar graphs
* Dynamic stats
* Real-time updates

---

## Professional UI

Modern responsive UI optimized for:

* laptops
* desktops
* dark mode
* high information density layouts

---

## Real Workspace Workflow

Supports realistic workspace flow:

Projects → Teams → Tasks → Notifications → Analytics

---

# Future Improvements

Potential future enhancements:

* JWT authentication
* Role permissions
* Real-time collaboration
* WebSockets
* File upload system
* Search & filtering
* Advanced analytics
* Mobile optimization
* Team chat
* Email notifications
* Deployment pipeline
* Docker support

---

# Learning Outcomes

This project demonstrates:

* Full-stack application development
* REST API design
* React state management
* Multi-user architecture
* SQLite database integration
* Modern UI/UX principles
* Dashboard analytics implementation
* Responsive web design
* Frontend/backend integration

---

# Author

Developed as a full-stack collaborative workspace management platform using React and Node.js.

---

# License

This project is intended for educational and portfolio purposes.
