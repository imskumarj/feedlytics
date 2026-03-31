## 🧠 FEEDLYTICS - Serverless Feedback Platform

A scalable, production-ready **serverless feedback collection and analytics system** built using AWS-native services.

Designed to demonstrate real-world cloud architecture using **AWS Lambda, API Gateway, DynamoDB, and CloudWatch**.

---

## 🚀 Features

* 📝 Public Feedback Submission API
* 📊 Analytics Dashboard (Admin Panel)
* ⚡ Fully Serverless Backend (Zero server management)
* 🛡️ Rate Limiting & Abuse Protection
* 📈 CloudWatch Logging & Monitoring
* 🔐 Secure API Gateway Integration

---

## 🏗️ Architecture Overview

```
Client (Next.js Frontend)
        ↓
API Gateway (HTTP API)
        ↓
AWS Lambda (Node.js)
        ↓
DynamoDB (NoSQL Database)
        ↓
CloudWatch (Logs & Monitoring)
```

---

## 🧩 Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Frontend   | Next.js              |
| Backend    | AWS Lambda (Node.js) |
| API Layer  | API Gateway          |
| Database   | DynamoDB             |
| Monitoring | CloudWatch           |

---

## ⚙️ How It Works

1. User submits feedback via frontend form
2. Request hits **API Gateway**
3. Lambda function processes request:

   * Validates input
   * Applies rate limiting
   * Stores data in DynamoDB
4. Analytics API fetches aggregated data
5. CloudWatch logs all operations

---

## 📊 Data Model (DynamoDB)

```json
{
  "feedbackId": "uuid",
  "email": "user@example.com",
  "message": "Great product!",
  "rating": 4,
  "createdAt": "timestamp"
}
```

---

## 🔒 Security & Best Practices

* Input validation in Lambda
* Rate limiting using API Gateway / custom logic
* IAM roles with least privilege
* Environment variables for secrets
* Structured logging with CloudWatch

---

## 📦 Deployment

* Infrastructure can be deployed using:

  * AWS SAM / Serverless Framework / CDK (recommended)
* CI/CD optional via GitHub Actions

---

## 🧠 What This Project Demonstrates

* Serverless architecture design
* AWS service integration
* Scalable API design
* Cloud monitoring & logging
* Real-world production patterns

---

## 📌 Future Improvements

* Authentication (JWT / Cognito)
* Dashboard charts (Recharts)
* Email notifications (SES)
* Multi-tenant support
* AI sentiment analysis

---

## 👨‍💻 Author

Sudhansu Kumar
Cloud & Full Stack Developer
