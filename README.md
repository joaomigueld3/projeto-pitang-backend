# Vaccination appointment project API

Project in branch 'master'

## 📌 Overview  
Backend application built with **Node.js**, providing an API for appointment management.

---

## 🚀 Installation & Setup  

### 1️⃣ Prerequisites  
- Install **Node.js** and **Yarn**  
- Set up a **MongoDB database** with a collection

### 2️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/vaccination-app-back.git
cd vaccination-app-back
```

### 3️⃣ Install Dependencies
```sh
yarn install
```

### 4️⃣ Configure Environment Variables
#### Create a .env file with:
```sh
PORT=your_port
DATABASE_URL=your_mongodb_connection_string
```
### 5️⃣ Run the Application
```sh
yarn dev
```

## 🛠 Features
### 🔹 API REST with Express  
✔ Middleware-based architecture  
✔ CRUD operations using Mongoose  
✔ Validation & unique constraints for key fields  

## 🔹 Appointment Management
| Method | Route | Description |
|----------|----------|----------|
| GET    | 	`/api/appointment`   | Lists all appointments, sorted by date/time   |
| POST    | `/api/appointment`   | Creates a new appointment (validates required fields)  |
| PUT    | `/api/appointment/:id`   | Updates isSolved and report (body) if appointment exists   |
| DELETE    | `/api/appointment/:id`   | Deletes an appointment by ID   |

## 🔹 Validation Rules
Required fields: name, email, CPF, birthDate, appDate, appTime  
Unique constraints:  
    ✔ email and CPF must be unique  
    ✔ appDate and appTime cannot be duplicated for another appointment  

## 🏗 Tech Stack
✅ Node.js – Backend runtime  
✅ Yarn – Dependency management  
✅ Express.js – Web framework  
✅ MongoDB – NoSQL database  
✅ Mongoose – Schema & validation  
✅ Json Web Token (JWT) – Authentication  

