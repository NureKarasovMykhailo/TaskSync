WorkerHealthMonitor

A platform for monitoring workers' physical and mental health to ensure safety and productivity in high-responsibility industries.

Overview

WorkerHealthMonitor is a software system designed to automate the management of personnel by monitoring workers' physical condition (e.g., heart rate, temperature, active working hours) and optimizing their work schedules. The system aims to reduce workplace accidents caused by inadequate health conditions and improve enterprise productivity.

This project was developed as part of my university coursework to showcase my skills in Fullstack and Mobile development. I contributed to both backend and frontend implementation, focusing on health data processing and user interface design.

Features





User Registration and Authentication: Secure account creation and login for users.



Worker Health Monitoring: Tracks physical parameters (pulse, temperature) using IoT devices.



Personnel Management: Admins can manage workers and assign tasks based on their health and skills.



Optimal Scheduling: Automatically distributes workers to tasks for maximum productivity.



Subscription System: Users can subscribe to access full functionality.



Multilingual Interface: Supports English and Ukrainian languages.

Tech Stack





Backend: Node.js, Express.js, TypeScript, PostgreSQL



Frontend: React, HTML5, CSS, JavaScript



Mobile App: Kotlin, Retrofit



IoT Devices: Arduino Sketch (for health data collection)

Installation

Prerequisites





Node.js (v16 or higher)



PostgreSQL (v14 or higher)



Kotlin (for mobile app)



Arduino IDE (for IoT devices)

Steps





Clone the Repository

git clone https://github.com/NureKarasovMykhailo/WorkerHealthMonitor.git
cd WorkerHealthMonitor



Backend Setup (server branch)

git checkout server
cd server
npm install
npm run start





Configure PostgreSQL in server/.env (e.g., database URL, port).



Frontend Setup (client branch)

git checkout client
cd client
npm install
npm start



Mobile App Setup (mobile branch)

git checkout mobile





Open the mobile/ folder in Android Studio.



Build and run the app on an emulator or device.



IoT Devices (iot-devices branch)

git checkout iot-devices





Upload the Arduino Sketch code from iot/ to your device using Arduino IDE.

Usage





Register as a user via the web or mobile app.



Admins can add workers, monitor their health, and assign tasks.



The system will notify if a worker's health condition is unsuitable for their tasks.

Screenshots

(Add screenshots or GIFs of the app here, e.g., dashboard, mobile app interface)

Limitations





Currently supports only English and Ukrainian languages.



IoT device integration requires compatible hardware.



Full functionality requires a paid subscription.

Future Improvements





Add corporate chat for workers.



Integrate climate sensors to analyze workplace conditions.



Support for job vacancy postings.

License

This project is licensed under the MIT License.

Contact

For any inquiries, feel free to reach out:





Email: mykhailo.karasov.01@gmail.com



GitHub: NureKarasovMykhailo
