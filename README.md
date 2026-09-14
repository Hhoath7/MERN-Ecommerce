# 🛒 MERN E-Commerce Platform | SQA Automation Portfolio

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Selenium](https://img.shields.io/badge/-selenium-%2343B02A?style=for-the-badge&logo=selenium&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

A full-stack e-commerce application engineered to demonstrate a complete Software Quality Assurance (SQA) testing lifecycle, featuring automated UI validation, API verification, and formal defect reporting.

## 🏗️ Testing Architecture

```mermaid
graph TD;
    SQA[SQA Engineer] -->|UI Automation| Selenium[Selenium & PyTest];
    SQA -->|API Validation| Postman[Postman & JavaScript];
    
    Selenium -->|Simulates User| UI[React.js Frontend];
    Postman -->|Validates Endpoints| API[Express.js Backend];
    
    UI -->|HTTP Requests| API;
    API -->|Queries| DB[(MongoDB Atlas)];
    
    style SQA fill:#f9f,stroke:#333,stroke-width:2px
    style DB fill:#4ea94b,stroke:#333,stroke-width:2px
    Testing Scope & Implementations
Functional UI Automation: Engineered PyTest and Selenium WebDriver scripts to validate the end-to-end shopping cart checkout process and dynamic price calculations.

API Validation: Developed Postman collections with Chai assertions to verify endpoint data structures, array lengths, and HTTP status codes.

Negative & Edge Case Testing: Intentionally injected invalid requests to validate graceful error handling and 404 Not Found server responses.

Performance Profiling: Monitored baseline database retrieval times, identifying and documenting cold-start latency issues.

📦 Project Deliverables
My Collection.postman_collection.json: Exported automated API test suite.

test_checkout.py: Python/Selenium functional test script.

SQA_Bug_Report_Performance.pdf: Formal defect documentation logged during API analysis.

🚀 Quick Start Guide
1. Launch the Environment
Backend: cd server -> npm install -> node server.js

Frontend: cd client -> npm install -> npm start

2. Execute the Test Suites
UI Tests: cd selenium-tests -> pytest test_checkout.py -s

API Tests: Import the .json collection into the Postman Desktop App and execute the runner.

Author: Hafsa Hoath | Software Engineer