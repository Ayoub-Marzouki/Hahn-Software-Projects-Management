# Projects Manager - Full Stack Task Management Application

A robust, full-stack application designed to manage projects and their associated tasks efficiently. Built with Spring Boot and React, it features a secure authentication system, real-time progress tracking, and professional UI/UX refinements.

## 🚀 Tech Stack

### Backend
- **Framework**: Spring Boot 4 (Java 21)
- **Security**: Spring Security 6 with JWT (JSON Web Tokens)
- **Database**: MySQL with Spring Data JPA
- **Validation**: Jakarta Validation (Hibernate Validator)
- **Testing**: JUnit 5 & Mockito

### Frontend
- **Library**: React (Create React App)
- **Routing**: React Router DOM
- **State Management**: React Context API (Auth & Notifications)
- **Styling**: Native CSS with modern refinements (Fade animations, Responsive Grids)
- **HTTP Client**: Native Fetch API

## ✨ Key Features

- **Authentication & Security**:
    - Secure Login and Registration.
    - JWT-based stateless authentication.
    - Strict Data Isolation: Users can only access and manage their own projects and tasks.
- **Project Management**:
    - Dashboard grid view of all user projects.
    - Create and Delete projects with custom confirmation modals.
    - Real-time progress tracking with visual percentage chips.
- **Task Management**:
    - Detailed project view with nested task lists.
    - Create, Delete, and Toggle task completion.
    - **Overdue Indicators**: Visual red-border warnings for incomplete tasks past their due date.
- **UI/UX Refinements**:
    - Custom Modal system (no browser popups).
    - Global Toast Notification system for feedback (Success/Error/Info).
    - Form validation with specific backend-driven error messages.

## 🛠️ Getting Started

### Prerequisites
- Java 21 or higher
- Node.js (v18+)
- MySQL Server

### Backend Setup
1. Navigate to the `backend` directory.
2. Set the following environment variables (or replace the placeholders in `src/main/resources/application.properties`):
   - `PROJECTS_MANAGEMENT_DB_URL`: `jdbc:mysql://localhost:3306/your_db`
   - `PROJECTS_MANAGEMENT_DB_USERNAME`: `your_username`
   - `PROJECTS_MANAGEMENT_DB_PASSWORD`: `your_password`
   - `SPRING_PROFILES_ACTIVE`: `dev`
3. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## 📂 Project Structure

```text
.
├── backend/           # Spring Boot Application
│   ├── src/           # Java Source & Resources
│   └── pom.xml        # Maven Configuration
├── frontend/          # React Application
│   ├── src/           # React Components, Pages, Services
│   └── package.json   # NPM Dependencies
└── README.md          # Project Overview
```

## 📝 License
This project was developed as a technical implementation for project management.
