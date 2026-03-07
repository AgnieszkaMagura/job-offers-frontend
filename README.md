# 🚀 JobOffers React App

**Modern Frontend Client for the JobOffers Spring Boot Web Application.**

## 📝 Description

**JobOffers** is a specialized tool designed for Junior Java Developers to aggregate job openings from various external sources (websites, web applications). The core engine of the system is a Spring Boot backend that fetches offers in scheduled intervals.

This React-based frontend provides a sleek, user-friendly interface to interact with the JobOffers API. Users can register, authenticate via JWT, browse all collected offers, search for specific entries by ID, and even manually contribute new job opportunities to the repository.

## ✨ Key Features & UX Improvements

* **Dark Mode Support:** Fully responsive UI with a persistent theme toggle for comfortable browsing.
* **One-Click Copy:** Integrated "Click-to-Copy" functionality for Job IDs with real-time visual feedback.
* **Modern Interactivity:** Smooth hover animations (lifting buttons) and pill-shaped design for a clean, professional look.
* **Clean Architecture:** Fully TypeScript-compliant code, optimized with `useCallback` and asynchronous patterns to prevent redundant renders.
* **JWT Authentication:** Secure access to protected routes and API endpoints.

## 🛠️ Specification & Operations

The application supports the following operations through its connection with the Spring Boot backend:

| Action | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Get Offers** | `GET` | `/offers` | Lists all offers from the repository |
| **Get by ID** | `GET` | `/offers/{id}` | Finds a specific offer by its unique ID |
| **Save Offer** | `POST` | `/offers` | Manually add a new job offer to the system |
| **Login** | `POST` | `/token` | Authenticate and receive a JWT token |
| **Register** | `POST` | `/register` | Create a new user account |

## 🚀 Installation and Run

### Prerequisites
* Running backend service at `http://localhost:8080`

### Running Locally
To launch the application in a development environment:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AgnieszkaMagura/job-offers-frontend.git](https://github.com/AgnieszkaMagura/job-offers-frontend.git)
    cd job-offers-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the application:**
    ```bash
    npm run start
    ```
4.  **Access the app:**
    The application will be hosted automatically at: `http://localhost:5173/`

## 🤝 Contact

* **Author:** Agnieszka Magura
* **GitHub Repository:** [AgnieszkaMagura/job-offers-frontend](https://github.com/AgnieszkaMagura/job-offers-frontend)
* **LinkedIn:** [Agnieszka Magura](https://www.linkedin.com/in/agnieszka-magura-0714241a8/)

---
*Developed with a focus on clean code and modern React best practices.*