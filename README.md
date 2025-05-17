# NidhiSync 🔄

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub last commit](https://img.shields.io/github/last-commit/Navnathjadhav08/NidhiSync)

A synchronization and management solution for financial cooperatives and credit societies.


## Table of Contents

- [✨ Features](#✨-features)  
- [🛠 Tech Stack](#🛠-tech-stack)  
- [💾 Prerequisites](#💾-prerequisites)  
- [🚀 Installation & Setup](#🚀-installation--setup)  
  - [Backend (Spring Boot)](#backend-springboot)  
  - [Frontend (Angular)](#frontend-angular)  
- [⚙️ Configuration](#⚙️-configuration)  
- [🏃 Usage](#🏃-usage)  
- [🔄 Development Scripts](#🔄-development-scripts)  
- [✅ Testing](#✅-testing)  
- [🚢 Deployment](#🚢-deployment)  
- [🤝 Contributing](#🤝-contributing)  
- [📄 License](#📄-license)  
- [✉️ Contact](#✉️-contact)  

---

## ✨ Features

- **Secure Data Sync** across multiple branches  
- **Real-time Transaction Updates** with WebSockets  
- **Member & Account Management** (deposits, withdrawals, loans)  
- **Comprehensive Financial Dashboards**  
- **Role-Based Access Control** (JWT + Spring Security)  
- **Audit Trail & Logging** for compliance  
- **Configurable Sync Interval** (supports offline buffering)  
- **Scalable & Cloud-Ready**  

---

## 🛠 Tech Stack

| Layer       | Technology                   |
| ----------- | ---------------------------- |
| Backend     | Java · Spring Boot · Spring Data JPA |
| Database    | MongoDB / MySQL (configurable) |
| Cache/Queue | Redis                        |
| Frontend    | Angular · RxJS · SCSS        |
| Real-time   | Socket.IO                    |
| Build & CI  | Maven · GitHub Actions       |
| Testing     | JUnit · Mockito · Jasmine/Karma |

---

## 💾 Prerequisites

- **Java 11+**  
- **Maven 3.6+**  
- **Node.js 14+ & npm**  
- **Angular CLI 12+**  
- **MongoDB 4.4+** (or MySQL)  
- **Redis 6.2+**  

---

## 🚀 Installation & Setup

### Backend (Spring Boot)

1. **Navigate to the backend folder**  
   ```bash
   cd Backend
   ```

2. **Configure your `.env` or `application.properties`** (see [Configuration](#⚙️-configuration))

3. **Build & run**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The API will start on `http://localhost:8080/api`.

### Frontend (Angular)

1. **Navigate to the frontend folder**

   ```bash
   cd "Front End"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Serve in development mode**

   ```bash
   ng serve --open
   ```

   The app will be available at `http://localhost:4200/`.

---

## ⚙️ Configuration

Backend configuration lives in `Backend/src/main/resources/application.properties` (or `.yml`). Key properties:

```properties
server.port=8080
spring.data.mongodb.uri=mongodb://localhost:27017/nidhisync
spring.redis.host=localhost
spring.redis.port=6379
jwt.secret=YOUR_SECRET_KEY
sync.interval.seconds=3600
```

Frontend environment settings are in `Front End/src/environments/`:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};
```

---

## 🏃 Usage

* **Browse** the Angular UI at `http://localhost:4200`
* **API Docs (Swagger UI)** at `http://localhost:8080/api/swagger-ui.html`
* **WebSocket endpoint**: `ws://localhost:8080/transactions`

---

## 🔄 Development Scripts

From project root you can also run:

* **Start both** backend + frontend in parallel (requires \[npm-run-all])

  ```bash
  npm install --global npm-run-all
  npm-run-all --parallel start:backend start:frontend
  ```

* **Lint**

  ```bash
  cd Backend && mvn checkstyle:check
  cd "Front End" && ng lint
  ```

---

## ✅ Testing

* **Backend unit & integration**

  ```bash
  cd Backend
  mvn test
  ```

* **Frontend unit**

  ```bash
  cd "Front End"
  ng test
  ```

---

## 🚢 Deployment

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./Backend
    ports:
      - '8080:8080'
    environment:
      - SPRING_PROFILES_ACTIVE=prod
  frontend:
    build: ./Front\ End
    ports:
      - '4200:80'
```

```bash
docker-compose up --build -d
```

### Cloud

* **Push Docker images** to your registry
* **Configure** Kubernetes manifests or your cloud provider’s managed services
* **Set** environment variables / secrets

---

## 🤝 Contributing

We welcome all contributions! Please:

1. Fork the repo
2. Create a branch: `git checkout -b feature/MyFeature`
3. Commit: `git commit -m "Add MyFeature"`
4. Push: `git push origin feature/MyFeature`
5. Open a Pull Request

Please include tests and update documentation as needed.

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---





## Contact 📧

**Navnath Jadhav**  
[![Email](https://img.shields.io/badge/Email-navnath.jadhav@example.com-blue?style=flat-square&logo=gmail)](mailto:navnathjadhav0824@gmail.com)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Navnath_Jadhav-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/navnathjadhav-)

