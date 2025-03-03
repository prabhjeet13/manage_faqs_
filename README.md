# manage_faqs_

## approach

1. I have made 3 model FAQ , Translation,User
2. Admin will add a faq (question and answer) in FAQ model
3. When we select a language from drop-downmenu on frontend
4. We will store its translation in Translation model for a particular FAQ
5. User schema for differentiating both users : admin and user
6. implement middleware for providing protected access
7. implement react-redux for state management globally in website
8. Authentication and autherization using jwt tokens


## Installation
Installation
First, clone the repository and navigate to the project directory:
Copy the repository url and run on terminal
git clone <your-repository-url>
cd <your-project-directory>

## Install dependencies
run this command on terminal:
npm install in backend folder and frontend folder

# dependencies in backend
 "dependencies": {
    "@vitalets/google-translate-api": "^9.2.1",
    "bcrypt": "^5.1.1",
    "chai-http": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.6",
    "nodemon": "^3.1.9",
    "redis": "^4.7.0",
    "response-time": "^2.3.3"
  },
  "devDependencies": {
    "chai": "^5.1.2",
    "mocha": "^11.1.0"
  }

  # dependencies in frontend

   "dependencies": {
    "@reduxjs/toolkit": "^2.5.1",
    "axios": "^1.7.9",
    "cra-template": "1.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.1.5",
    "react-scripts": "5.0.1",
    "react-simple-wysiwyg": "^3.2.0",
    "web-vitals": "^4.2.4"
}  

## add .env file in backend folder
PORT = _PORT_
MONGODB_URL = _MONGODB_URL_
JWT_SECRET = JWT_SECRET
REDIS_PORT = 6379

## install of redis from the given url
# https://github.com/tporadowski/redis/releases
You can install .msi file and add its path in environmental variables

## Start
in backend folder , terminal 
npm run dev

in frontend folder , terminal
num run start

## API Endpoints
GET http://localhost:4000/api/faqs/getallfaqs
POST http://localhost:4000/api/faqs/getbyid
POST http://localhost:4000/api/faqs/createfaq
POST http://localhost:4000/api/faqs/deletefaq/:faqid
POST http://localhost:4000/api/auth/signup
POST http://localhost:4000/api/auth/signin
POST http://localhost:4000/api/faqs/editfaq
POST http://localhost:4000/api/faqs/translatefaq?lang=hi

## description 
# Admin 
admin sign-in and sign-up is different
/admin/signin
/admin/signup

after login , Admin can add a new faq through form. Admin Can explore all faqs. Edit them through Editior. Translate the faq by selected a target language through drop-down menu;

# user 
sign-in and sign-up pages url
/signin
/signup

after login , User Can explore all faqs. Translate the faq by selected a target language through drop-down menu;

# Caching Using Redis in node.js

## for testing using mocha chai in node.js
in backend folder on terminal run this command
npm test


## ScreenShots
# user-side
sign-in page
![alt text](image-1.png)

sign-up page
![alt text](image-5.png)

profile page
![alt text](image-2.png)

faqs page
![alt text](image-3.png)

faq page
![alt text](image-4.png)

# admin-side
sigin-page
![alt text](image-7.png)
signup-page
![alt text](image-6.png)
profile-page
![alt text](image-8.png)
add-faq page
![alt text](image-9.png)
faqs page
![alt text](image-10.png)
faq page
![alt text](image-11.png)


## Translate to hindi language
![alt text](image-12.png)

## Translate to german language
![alt text](image-13.png)

## formating of question and answer using editor
![alt text](image-14.png)