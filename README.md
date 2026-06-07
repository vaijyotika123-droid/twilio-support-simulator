README File

<h2>Saas Support Stimulator </h2>

This project is built to implement the real world application of integrating twilio voice and sms api into the web based applications. It’s my attempt to replicate and resolve the problems that a developer might face when integrating twilio. It includes recurring errors like authentication failures, TwilML related issues etc. 
It’s a full stack web based application with twilio api services. This project gave me a full hands-on experience with a full twilio communication stack. 

<b>Demo video link</b>

https://www.loom.com/share/bd0e6fbed1ae4a40b77259f7b181342c

Here’s the link to a full explanation of the entire project workflow. <br>

## Features

- **Initiate Calls** - Make real outbound calls using Twilio Voice API with live status tracking
- **Send SMS** — Send real SMS messages using Twilio Messaging API with delivery confirmation
- **Webhooks** — Real-time call and SMS status updates via Twilio StatusCallback and ngrok
- **Bug Reporter** — 6 pre-documented common Twilio errors with severity ratings, reproduction steps, fix documentation and video walkthroughs
- **Activity Logs** — Track all calls and SMS with live status updates


## Tech Stack

Code editor - VS Code   <br>
Frontend - React, HTML, CSS, JS <br>
Backend - NodeJS, Express <br>
Communication - Twilio SDK, TwilML <br>
Networking - Ngrok <br>
Data Storage - In memory Storage <br>



## Architecture Workflow


<img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/3383d1fa-4ca1-4d1a-951a-6c169e40f910" /><br>




1. The frontend sends the request to the backend.<br>
2. Backend receives the POST request and it triggers Twilio API.<br>
3. Twilio Responds back to backend using webhooks.<br>
4. Backend receives the status updates and responds back to frontend with the update. <br>




## Prerequisite

Installations to be completed. <br>

```
Node.js v18 or higher<br>
npm v9 or higher (comes with Node.js)<br>
Git<br>
ngrok <br>
A Twilio free account<br>
```

## Backend Setup

Go to the backend folder that you have created in your root folder using terminal. <br>
Once in the backend folder. <br>

```
Install npm package. 

npm install
```

To check if it’s installed,
<br>
```
type npm -v.
```
<br>This will give you version. <br>
Create a .env file in the backend folder. This file is to store all our credentials or key value pair that will be used multiple times in the code. <br>

Note - Twilio credentials can be found on the twilio console in your account. <br>



Start Backend, with command<br>
```
node file_name 
```

You will see, server running on port 3001.<br>
 

## Frontend setup

Open a new terminal window. 

```
npm create vite@latest frontend - in root directory 
```

Then go to frontend folder<br>

```
cd frontend
npm install
npm install axios react-router-dom
npm install 
npm run dev
```
Open browser and go to - http://localhost:5173<br>
You will see the default UI. <br>

For Axios ¸
```
npm install axios react-router-dom
```

## Ngrok Setup

Install ngrok from the official website. <br>
Open third terminal and type <br>
```
ngrok http 3001
```

It’ll give you a public URL, copy that and paste it in a .env file. <br>

<b>IMPORTANT</b> - Everytime you start the Ngrok server, you are provided with a new public URL. So always remember to update that in the env file. <br>


Basically, now you have three terminals running one for frontend, backend and ngrok.<br>
           
Note-<br>
While git commit - always gitignore the .env file. <br>

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/call | Initiate outbound call |
| POST | /api/sms | Send SMS message |
| GET | /api/logs | Get call and SMS history |
| GET | /api/bugs | Get all bug reports |
| POST | /webhook/call-status | Twilio call status callback |
| POST | /webhook/sms-status | Twilio SMS status callback |

## Communication Workflow 


<img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/4cfe3099-3b73-4f7c-9693-c8b7a249d7d9" /><br>


1. The user initiates the request from the frontend UI.<br>
2. Frontend sends request to backend using POST (/api/call)<br>
3. Backend uses Twilio SDK for the calling and messaging purpose.<br>
4. Twilio calls the number provided by the user. <br>
5. As a call process, twilio generates status updates of calls.<br>
6. Twilio sends the updates to the webhook public URL (we created using ngrok).<br>
7. Ngrok forwards webhook URL data to our local express sever. <br>
8. Backend receives status updates and sends it to frontend UI. <br>
9. With GET /api/logs, react fetches the data and give updates in real time. <br>




## Call Dashboard

<img width="800" height="598" alt="image" src="https://github.com/user-attachments/assets/c3c8cdda-4aa5-4650-b3b3-7819a225cfb6" />


## SMS Dashboard


<img width="800" height="598" alt="image" src="https://github.com/user-attachments/assets/af4c6a59-90dd-45e6-b886-4682e2d6769e" />



## Bug Reporter

<img width="800" height="598" alt="image" src="https://github.com/user-attachments/assets/969b2404-d6f9-462f-ae46-62f99925ece7" />


This page consists of the commonly occurred errors. I have pre-defined 5 errors and their video solution in which I am explaining each error in detail and solving it. <br>


## Things I learned

1. How Twilio's voice and sms apis operate from call initiation to completion.<br>
2. How webhooks enable external services to send real-time events back to an application.<br>
3. How ngrok can expose a local development server to the public internet for webhook testing.<br>
4. How to track and process asynchronous events such as call status updates.<br>
5. Learned how Twilio uses XML-based instructions to define call behavior. In this project, TwiML was used to tell Twilio what actions to perform after connecting a call, helping me understand how telephony workflows are orchestrated in real-world communication platforms.<br>

## Further improvements

1. Deploy to Railway(backend) and vercel (frontend)<br>
2. Use database storage.<br>
3. Twilio conversations API for live chat. <br>


## Summary
A user initiates a call from the dashboard, Twilio places the call, Twilio sends call status updates back to the backend through a webhook, and the dashboard displays those updates in real time.
