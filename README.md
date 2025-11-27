Next.js Auth App : Cosmetics

A simple full-stack application built with Next.js (App Router), NextAuth.js, and a lightweight Express.js backend.
Includes public + protected pages, Google & credentials login, and product management.

🚀 Live Demo

Frontend: https://client-phi-hazel.vercel.app/




📘 Overview

This project showcases:

Next.js App Router

Authentication with Firebase

Protected routes (Add Product, Manage Products)

Clean UI, responsive layout

CRUD operations with Express backend

🛣️ Routes

Public: /, /items, /items/[id], /login, /register
Protected: /add-product, /manage-products

Unauthorized users are redirected to /login.

🔐 Authentication

Google login

Email/password (credentials)

After login → redirect to /

Navbar updates to show profile dropdown + product management links

🛒 Features

Landing Page (7 sections)

Item List (search + grid of cards)

Item Details (banner + full info)

Add Product (form + validation)

Manage Products (table/grid + View/Delete)

🛠️ Stack

Next.js (App Router)

Firebase

Tailwind CSS

Express.js backend



⚙️ Setup

Clone:

git clone <repo-url>


Install dependencies:

npm install


Env variables (.env.local):

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
API_BASE_URL=http://localhost:5000


Run backend:

npm start


Run frontend:

npm run dev
