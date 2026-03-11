# Smart Agriculture System – Frontend

## Overview

The Smart Agriculture System is a web-based application designed to assist farmers in making data-driven decisions for crop management.
This frontend provides an interactive interface where users can access crop recommendations, detect plant diseases, and manage their accounts.

The system integrates with a backend API that processes agricultural data and machine learning models to generate insights.

---

## Features

* User authentication (Login and Signup)
* Crop recommendation based on soil parameters
* Plant disease detection interface
* Responsive UI for desktop and mobile devices
* Modern dashboard with real-time data visualization

---

## Tech Stack

* React (UI library)
* Vite (Build tool)
* Tailwind CSS (Styling)
* Redux Toolkit (State management)
* JavaScript (ES6+)

---

## Project Structure

smart-agriculture
│
├── public
│   └── vite.svg
│
├── src
│   ├── assets
│   ├── components
│   │   └── Navbar.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── CropRecommendation.jsx
│   │   └── DiseaseDetection.jsx
│   ├── features
│   │   └── counterslice.js
│   ├── app
│   │   └── store.js
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── tailwind.config.js

---

## Installation

Clone the repository

git clone https://github.com/Rashidaga18/Smart-Agriculture-System-FrontEnd.git

Navigate to the project folder

cd smart-agriculture

Install dependencies

npm install

Run the development server

npm run dev

---

## Environment Setup

Ensure that the backend API server is running.
Update the API base URL inside the frontend configuration if needed.

Example:

http://localhost:8080

---

## Future Improvements

* Integration with real-time weather APIs
* Advanced ML-based disease detection
* Farmer dashboard with analytics
* Multilingual interface for farmers

---
