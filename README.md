# Laboratory Management System  

This repository contains the code and resources for the **Laboratory Management System**, a full-stack web application designed to manage laboratory operations such as equipment inventory, user roles, and task assignments.  

## Features  
- **User Roles:** Manage admin, lab staff, and user access.  
- **Task Management:** Assign and track laboratory tasks.  
- **Authentication:** Secure login and role-based access control.  
- **API Integration:** Seamless backend operations for CRUD functionalities.  

## Technologies Used  
- **Frontend:** React.js, HTML, CSS, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Others:** REST APIs, Postman  

## Prerequisites  
To run this project, ensure you have the following installed:  
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)  
- A code editor like [VS Code](https://code.visualstudio.com/)  

## Setup Instructions  

### 1. Clone the Repository  
```bash  
git clone https://github.com/shreyareddy612/project_Laboratory_management_system.git  
cd project_Laboratory_management_system  
```  

### 2. Install Dependencies  
#### Backend  
```bash  
cd backend  
npm install  
```  
#### Frontend  
```bash  
cd ../frontend  
npm install  
```  

### 3. Configure Environment Variables  
Create an `.env` file in the `backend` directory with the following variables:  
```plaintext  
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
```  

### 4. Run the Application  
#### Start Backend Server  
```bash  
cd backend  
npm start  
```  
#### Start Frontend Development Server  
```bash  
cd ../frontend  
npm start  
```  

The application will be accessible at `http://localhost:3000`.  

## Folder Structure  
```plaintext  
project_Laboratory_management_system/  
│  
├── backend/  
│   ├── models/          # MongoDB models  
│   ├── routes/          # API routes  
│   ├── controllers/     # Route logic  
│   ├── middleware/      # Authentication and validation  
│   ├── server.js        # Entry point for the backend  
│  
├── frontend/  
│   ├── public/          # Public assets  
│   ├── src/  
│       ├── components/  # React components  
│       ├── pages/       # Application pages  
│       ├── App.js       # Main React app file  
│       ├── index.js     # React entry point  
│  
└── README.md            # Documentation  
```  

