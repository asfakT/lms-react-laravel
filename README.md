# 🎓 LMS Platform (React + Laravel)

A modern **Learning Management System (LMS)** built with **Laravel (API Backend)** and **React (Frontend)**.

This platform allows instructors to create courses and students to enroll, watch lessons, track progress, and leave reviews.

---

# 🚀 Tech Stack

### 🧠 Backend

* ⚙️ Laravel
* 🔗 REST API
* 🗄 MySQL Database

### 🎨 Frontend

* ⚛️ React (Vite)
* 🧭 React Router
* 📝 React Hook Form
* 🎥 React Player
* ⭐ React Simple Star Rating

### 🎛 UI & Libraries

* 🎨 Bootstrap / React Bootstrap
* 🔔 React Hot Toast
* 📂 React FilePond
* ✏️ Jodit Rich Text Editor
* 🔀 Drag & Drop (@hello-pangea/dnd)
* 🎭 Sass (SCSS)

---

# 📂 Project Structure

```
lms-react-laravel
│
├── backend
│   └── Laravel API
│
├── frontend
│   └── React (Vite App)
│
└── docs
```

---

# 🖥 Frontend Structure

```
src/

pages/
 Home.jsx
 Courses.jsx
 CourseDetail.jsx
 Login.jsx
 Register.jsx
 Checkout.jsx
 MyCourses.jsx
 EnrolledCourses.jsx
 WatchCourse.jsx
 ChangePassword.jsx

components/
 Navbar.jsx
 ProtectedRoute.jsx

services/
 api.js

styles/
 main.scss
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/lms-react-laravel.git
cd lms-react-laravel
```

---

# 🧩 Backend Setup (Laravel)

```
cd backend

composer install

cp .env.example .env

php artisan key:generate
```

Update your **database configuration** inside `.env`

```
php artisan migrate
php artisan serve
```

Backend will run at

```
http://127.0.0.1:8000
```

---

# ⚛️ Frontend Setup (React)

```
cd frontend

npm install

npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

# 📦 Required Packages

```
npm install react-bootstrap bootstrap
npm install react-router-dom react-hook-form react-hot-toast
npm install react-icons react-simple-star-rating react-player
npm install jodit-react @hello-pangea/dnd
npm install react-filepond filepond
npm install filepond-plugin-image-exif-orientation
npm install filepond-plugin-image-preview
npm install filepond-plugin-file-validate-type
npm install -D sass-embedded
```

---

# 🗄 Database Structure

## 📁 Categories

Stores course categories such as **Web Development, Design, Business**.

Fields

* id
* name
* status
* created_at
* updated_at

---

## 🌐 Languages

Defines the language used in courses.

Fields

* id
* name
* status
* created_at
* updated_at

---

## 📊 Levels

Defines course difficulty.

Examples

* Beginner
* Intermediate
* Advanced

Fields

* id
* name
* status
* created_at
* updated_at

---

## 📚 Courses

Main entity of the LMS.

Fields

* id
* title
* user_id
* category_id
* level_id
* language_id
* description
* price
* cross_price
* status
* is_featured
* image
* created_at
* updated_at

---

## 🎯 Outcomes

Shows what students will learn.

Fields

* id
* course_id
* text
* sort_order

---

## 📌 Requirements

Prerequisites needed before taking a course.

Fields

* id
* course_id
* text
* sort_order

---

## 🧩 Chapters

Course sections.

Fields

* id
* title
* course_id
* sort_order
* status

---

## 🎬 Lessons

Individual learning units.

Fields

* id
* title
* chapter_id
* is_free_preview
* duration
* video
* description
* sort_order
* status

---

## 🎓 Enrollments

Tracks which students enrolled in which course.

Fields

* id
* user_id
* course_id
* created_at

---

## 📈 Activities

Tracks student progress.

Fields

* id
* user_id
* course_id
* chapter_id
* lesson_id
* is_completed
* is_last_watched

---

## ⭐ Reviews

Course rating system.

Fields

* id
* user_id
* course_id
* rating
* comment
* status

---

# 🔗 Relationships

User
→ Courses (Instructor)
→ Enrollments
→ Reviews
→ Activities

Course
→ Categories
→ Levels
→ Languages
→ Chapters → Lessons
→ Outcomes
→ Requirements
→ Reviews
→ Enrollments

---

# ✨ Features

✔ User Authentication
✔ Course Creation (Instructor)
✔ Chapter & Lesson System
✔ Video Learning
✔ Student Progress Tracking
✔ Course Reviews & Ratings
✔ Drag & Drop Lesson Sorting
✔ Protected Routes
✔ Rich Text Lesson Editor

---

# 🔮 Future Improvements

* 💳 Payment Integration
* 🏆 Course Certificates
* 👨‍🏫 Instructor Dashboard
* 📊 Analytics
* 🛠 Admin Panel

---

# 👨‍💻 Author

Developed as a **Full Stack LMS Project using Laravel and React**.
