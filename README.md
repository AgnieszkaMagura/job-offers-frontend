<div align="center">

# 🚀 JobOffers React App
**Modern Frontend Client for the JobOffers Spring Boot Web Application.**

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">

</div>

## 📖 Description
**JobOffers Client** is a sleek, responsive interface designed to interact with the JobOffers recruitment aggregator. It bridges the gap between complex backend logic and the end-user, providing a seamless experience for browsing and managing job opportunities.

The application is built with a focus on **Type Safety** and **Performance**, ensuring that the data flow between the React components and the Spring Boot API is robust and efficient.

## 📸 Visual Showcase

<div align="center">
  <table width="100%">a
    <tr>
      <th width="50%">🔐 Secure Registration (Light Mode)</th>
      <th width="50%">🔐 Secure Authentication (Dark Mode)</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/91b84336-0497-43a3-b2eb-39210dfb6f14" width="100%" alt="Registration Light"></td>
      <td><img src="https://github.com/user-attachments/assets/937b31f9-e785-4517-aaa2-193d7f64d658" width="100%" alt="Auth Dark"></td>
    </tr>
    <tr>
      <th>🛑 Validation: Existing User</th>
      <th>🛡️ Protected Route Access</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/b9bb49e4-13e0-44bb-a29d-40b121fd91fb" width="100%" alt="Existing User"></td>
      <td><img src="https://github.com/user-attachments/assets/8e64216d-9d90-4329-be6d-d92cdfcf0631" width="100%" alt="Protected Route Access"></td>
    </tr>
    <tr>
      <th>🏁 Initial State (No Data)</th>
      <th>🟢 Backend Scheduler Widget</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/10539dc7-7586-4032-9664-c26f3fb1fccd" width="100%" alt="Initial State (No Data)"></td>
      <td><img src="https://github.com/user-attachments/assets/254a9ed9-8456-4212-8fa9-864e1fd206b3" width="100%" alt="Backend Scheduler Widget"></td>
    </tr>
    <tr>
      <th>📱 Multi-Offer Dashboard (Light)</th>
      <th>📱 Multi-Offer Dashboard (Dark)</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/14a15036-4989-4a39-9e17-7bc4967c4f26" width="100%" alt="Multi-Offer Dashboard (Light)"></td>
      <td><img src="https://github.com/user-attachments/assets/e73048c1-bfb7-434a-9bf9-2bc37da23448" width="100%" alt="Multi-Offer Dashboard (Dark)></td>
    </tr>
    <tr>
      <th>🔍 Search Offer by ID</th>
      <th>📋 Search Result Dashboard</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/42210480-e944-4798-ace2-be850dfa9be5" width="100%" alt="Search Offer by ID"></td>
      <td><img src="https://github.com/user-attachments/assets/69d74322-bd53-4143-854c-828fa8569017" width="100%" alt="Search Result Dashboard"></td>
    </tr>
    <tr>
      <th>🆕 Adding New Offer</th>
      <th>✅ Success Confirmation</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/1e631af1-ecd5-45bb-9136-4d36fe3cceac" width="100%" alt="Adding New Offer"></td>
      <td><img src="https://github.com/user-attachments/assets/4c6832ba-2dba-4de0-806c-bd3f5944b732" width="100%" alt="Success Confirmation"></td>
    </tr>
    <tr>
      <th>🚀 Live Dashboard Update</th>
      <th>📊 Database Persistence (Mongo)</th>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/e41322c6-8e0e-4c3b-a510-ea622b110f5c" width="100%" alt="Live Dashboard Update"></td>
      <td><img src="https://github.com/user-attachments/assets/6c7fdb89-d264-4b12-96d8-4c3171ce8f52" width="100%" alt="Database Persistence (Mongo)"></td>
    </tr>
  </table>
</div>

## ✨ Key Features & UX Improvements
* **🌓 Dual Theme Support:** Native Dark Mode toggle with persistent storage in `localStorage`.
* **📋 Smart Clipboard:** Integrated "Click-to-Copy" for Job IDs with real-time visual feedback (bounce animations via Lucide icons).
* **🛡️ Protected Routes:** Secure navigation handling for authenticated users using `react-router-dom`.
* **⚡ Performance Optimized:** Extensive use of `useCallback` and `useEffect` to minimize unnecessary re-renders during API interactions.
* **🎨 Modern UI:** Pill-shaped design language, hover-lift animations, and a clean, minimalist aesthetic powered by Tailwind CSS.

## 🛠️ Tech Stack & Integration
* **Core:** React 18 (Functional Components & Hooks).
* **Communication:** Axios for asynchronous API calls with Bearer Token injection.
* **Routing:** React Router v6 for a smooth Single Page Application (SPA) experience.
* **Data Flow:** Interfaces strictly synchronized with Backend `OfferResponseDto` for consistent data structures.

## 📡 Connected API Operations
The app communicates with the **[JobOffers Backend](https://github.com/AgnieszkaMagura/JobOffers)** on port `8080`:

| Action | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Get Offers** | `GET` | `/offers` | Lists all offers (reversed for newest first) |
| **Get by ID** | `GET` | `/offers/{id}` | Finds a specific offer by its unique ID |
| **Save Offer** | `POST` | `/offers` | Manually add a new job offer to the system |
| **Login** | `POST` | `/token` | Authenticate and receive a JWT token |
| **Register** | `POST` | `/register` | Create a new user account with validation |

## 🚀 Installation and Run
### Prerequisites
* **JobOffers Backend** service running at `http://localhost:8080`.

### Running Locally
1. **Clone & Enter:**
   ```bash
   git clone https://github.com/AgnieszkaMagura/job-offers-frontend.git
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the application:**
    ```bash
    npm run dev
    or  
    yarn run dev
    ```
4.  **Access the app:**
    The application will be hosted automatically at: `http://localhost:5173/`
---
<div align="center">
  <strong>🖥️ Frontend Tech Stack</strong><br>
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
<br>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Lucide_Icons-F72C5B?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide">
</div>

<br>

<div align="center">
  <strong>🛠️ Backend Tech Stack (Integrated)</strong><br>
 <img src="https://img.shields.io/badge/Architecture-Hexagonal-3498db?style=for-the-badge&logo=architecture" alt="Hexagonal Architecture">
<img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17">
<img src="https://img.shields.io/badge/Spring_Boot-2.7.8-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot">
<img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white" alt="Spring Security">
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT">
<br>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</div>

<br>

<div align="center">
  <h3>🤝 Contact</h3>
  <em>Designed with ❤️ by <strong>Agnieszka Magura</strong></em><br><br>
  <a href="https://github.com/AgnieszkaMagura" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/agnieszka-magura-0714241a8/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <br><br>
  If you like this project, please consider giving it a ⭐!
</div>
<br>
