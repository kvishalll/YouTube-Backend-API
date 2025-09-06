# 🎬 YouTube Backend API (Node.js + Express + MongoDB)

A backend API that powers a YouTube-like application.  
It handles user authentication, video management, likes, subscriptions, and more — built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features
- **Authentication & Authorization**
  - User registration & login (JWT-based)
  - Password hashing with bcrypt
  - Access & refresh tokens
- **User Management**
  - Profile, avatar, cover image
  - Subscriptions (subscribe/unsubscribe to channels)
- **Video Management**
  - Upload video & thumbnail (Cloudinary or local)
  - Edit, delete, view count tracking
- **Likes**
  - Like/unlike videos, comments, tweets
  - Fetch liked videos
- **Comments**
  - Add, edit, delete comments
  - Like/unlike comments
- **Dashboard**
  - Channel stats (total videos, views, subscribers, likes)
  - Fetch channel videos
- **Health Check**
  - Simple `/healthcheck` endpoint to verify API status

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (Access & Refresh tokens)
- **Storage:** Cloudinary (for videos/thumbnails)
- **Other Tools:**
  - bcrypt (password hashing)
  - dotenv (environment variables)
  - nodemon (development)
  - mongoose-aggregate-paginate-v2 (pagination helper)

---

## 📡 API Endpoints
## 🔑 Auth

-   POST /api/v1/users/register → Register

-   POST /api/v1/users/login → Login

-   POST /api/v1/users/logout → Logout

-   POST /api/v1/users/refresh → Refresh token

## 👤 User / Subscriptions

-  POST /api/v1/subscriptions/toggle/:channelId → Subscribe/Unsubscribe

-  GET /api/v1/subscriptions/:channelId/subscribers → Get channel subscribers

-  GET /api/v1/subscriptions/:subscriberId/channels → Get subscriptions of a user
-  to get subscriber  http://localhost:8000/api/v1/subscriptions/c/68b5774444a20c8488f390df

## 🎥 Videos

-  POST /api/v1/videos/upload → Upload video

-  GET /api/v1/videos/:id → Get video details

-  GET /api/v1/videos/channel/:channelId → Get channel videos

-  PATCH /api/v1/videos/:id → Update video

-  DELETE /api/v1/videos/:id → Delete video

## 👍 Likes

-  POST /api/v1/likes/toggle/v/:videoId → Like/unlike video

-  POST /api/v1/likes/toggle/c/:commentId → Like/unlike comment

-  GET /api/v1/likes/videos → Get liked videos

## 💬 Comments

-  POST /api/v1/comments/:videoId → Add comment

-  PATCH /api/v1/comments/:commentId → Update comment

-  DELETE /api/v1/comments/:commentId → Delete comment

## 📊 Dashboard

-  GET /api/v1/dashboard/stats → Get channel stats

-  GET /api/v1/dashboard/videos → Get channel videos

## 🩺 Health Check

-  GET /api/v1/healthcheck → Check API status
