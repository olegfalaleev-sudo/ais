
# 📘 AIS API – Server Setup & Usage Guide

This project provides a Node.js API service for retrieving AIS vessel data.  
It is designed to run on a Linux server with **PM2** to ensure 24/7 uptime.

---

## 🚀 Installation (Server)

### 📍 Project Location
The project is deployed on your server in:

/root/ais

Project structure:

/root/ais
│── server.js
│── package.json
│── package-lock.json
│── node_modules/
│── .git/
└── .gitignore

---

## 🔧 Installing Dependencies

After cloning or updating the project:

cd /root/ais
npm install

This installs:

- express  
- axios  
- other dependencies listed in package.json  

---

## 🟢 Running the API (Development Mode)

To start the server manually:

cd /root/ais
node server.js

This runs the API on:

http://YOUR_SERVER_IP:3000/?mmsi=123456789

---

## 🌐 API Endpoint

Example usage:

GET http://YOUR_SERVER_IP:3000/?mmsi=123456789

Query parameter:

Name   | Description
-------|-------------
mmsi   | Vessel MMSI number (numeric only)

---

## 🟩 Running in Production (PM2 24/7)

PM2 keeps your API alive even after closing SSH or rebooting.

### Start with PM2:

pm2 start server.js --name ais-api

### Restart the API:

pm2 restart ais-api

### Stop the API:

pm2 stop ais-api

### Delete the PM2 service:

pm2 delete ais-api

### View logs:

pm2 logs ais-api

### Check all PM2 apps:

pm2 list

---

## 🔄 Auto-start on System Reboot

Run:

pm2 startup
pm2 save

This ensures the API starts automatically when the server reboots.

---

## 🔁 Updating From GitHub

To update the project on your server:

cd /root/ais
git pull
npm install
pm2 restart ais-api

---

## 🔒 Recommended .gitignore

node_modules/
.env
npm-debug.log
pm2.log

---

## 📦 Cloning Repository to Server

Use SSH:

git clone git@github.com:olegfalaleev-sudo/ais.git

Or HTTPS:

git clone https://github.com/olegfalaleev-sudo/ais.git

---

## 🛠 Useful Commands Overview

Purpose              | Command
-------------------- | --------------------------------------
Start API            | pm2 start server.js --name ais-api
Restart API          | pm2 restart ais-api
Stop API             | pm2 stop ais-api
View logs            | pm2 logs ais-api
PM2 list             | pm2 list
Install dependencies | npm install
Update from GitHub   | git pull && pm2 restart ais-api

---

## 🎉 Done!

Your AIS API is now fully documented and ready for deployment or sharing.

If you want, I can also generate:

- NGINX reverse proxy config (for port 80/443 HTTPS)  
- Dockerfile + Docker Compose  
- GitHub Actions auto-deploy pipeline  

Just tell me!

