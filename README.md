<div align="center">

<img src="./frontend/src/assets/icons/beer.svg" width="200" alt="Brew Bliss logo" />

# Brew Bliss

**A full-stack craft beer e-commerce experience, with an AI sommelier baked in.**

[![Live Demo](https://img.shields.io/badge/demo-brew--bliss.onrender.com-FEA90C?style=for-the-badge&logo=vercel&logoColor=white)](https://brew-bliss.onrender.com)
&nbsp;
<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=flat-square&logo=groq&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat-square&logo=i18next&logoColor=white)

</div>

<br/>

> Brew Bliss is a MERN e-commerce storefront for a craft beer shop with a multi-language catalog, cart & wishlist, Google login, order history, and a chat-based **AI Beer Sommelier** that recommends bottles based on what you're in the mood for.

<br/>

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📡 API Reference](#-api-reference)

<br/>

## ✨ Features

<table>
<tr>
<td width="33%" valign="top">

### 🛍️ Shopping
Browse a translated catalog (EN/FR/DE), filter and sort products, view size/price variants, read & leave reviews, and check out with a saved shipping address.
<br/><br/>
</td>
<td width="33%" valign="top">

### 🤖 AI Sommelier
A Groq-powered chat assistant asks about your taste and recommends beers from the live catalog. Also features AI-generated smart follow-up questions.
<br/><br/>
</td>
<td width="33%" valign="top">

### 👤 Accounts
Email/password or **Google OAuth** login, JWT sessions in httpOnly cookies, password-reset emails, persistent cart & wishlist, and full order history.
<br/><br/>
</td>
</tr>
<tr>
<td width="33%" valign="top">

### 🌍 Localization
UI available in **English, French & German** via i18next, with a dedicated currency context for localized pricing.
<br/><br/>
</td>
<td width="33%" valign="top">

### ✉️ Transactional Email
Nodemailer-driven emails for password resets, contact-form submissions, and newsletter sign-ups - all with branded HTML templates.
<br/><br/>
</td>
<td width="33%" valign="top">

### ⚡ Performance & Hardening
Response caching, gzip compression, Helmet security headers, strict CORS allow-listing, and rate limiting on the API and auth routes.
<br/><br/>
</td>
</tr>
</table>

<br/>

## 🛠 Tech Stack

<table>
<tr><th>Layer</th><th>Technologies</th></tr>
<tr>
<td><strong>Frontend</strong></td>
<td>

React 19 · Vite 8 · React Router v7 · React Hook Form + Yup · i18next / react-i18next · Framer Motion · Embla Carousel · Sass · ESLint + Prettier

</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>

Node.js · Express 5 · MongoDB + Mongoose · Passport.js (Google OAuth 2.0) · JWT · bcrypt · Groq SDK · Nodemailer · Helmet · CORS · express-rate-limit · compression · node-cache

</td>
</tr>
</table>

<br/>

## 📁 Project Structure

```
brew-bliss/
├── backend/
│   ├── config/           Passport (Google OAuth) config
│   ├── controllers/      Route handlers (products, users)
│   ├── db/               MongoDB connection
│   ├── middlewares/      Auth, caching, compression, security
│   ├── models/           Mongoose schemas (Product, Users)
│   ├── routes/           Express routers (products, users)
│   ├── utils/            Env loader, mail sender
│   └── index.js          App entry point
│
└── frontend/
    └── src/
        ├── api/               API client calls
        ├── components/        UI components, sections, product cards
        ├── context/           Cart, wishlist, user, currency, loader
        ├── hooks/             Custom hooks (filters, scroll, title)
        ├── language/locales/  en / fr / de translations
        ├── layouts/           Page layouts
        ├── routes/            Page-level route components
        └── styles/            Sass stylesheets
```

<br/>

## 🚀 Getting Started


### 1 · Clone

```bash
git clone https://github.com/GuramiGorgadze/brew-bliss.git
cd brew-bliss
```

### 2 · Configure environment

Create `backend/.env`:

```env
PORT=3000
CONNECTION_STRING=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

JWT_SECRET_KEY=your_jwt_secret
JWT_RESET_PASS_SECRET_KEY=your_jwt_reset_secret
BCRYPT_PEPPER=your_bcrypt_pepper

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GROQ_API_KEY=your_groq_api_key

MAIL_SENDER_EMAIL=your_gmail_address
MAIL_SENDER_PASS=your_gmail_app_password
```

Mock user credentials to login and explore:

| Field | Value |
|---|---|
| **Email** | `john.doe@gmail.com` |
| **Password** | `Jo7n!D0e$` |

*Create .env file and copy the .env.example environment variables into it. These values have been committed only for testing.* 

### 3 · Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4 · Run in development

```bash
# Terminal 1 — backend  → http://localhost:3000
cd backend && npm run dev

# Terminal 2 — frontend → http://localhost:5173
cd frontend && npm run dev
```

### 5 · Build for production

```bash
cd backend
npm run build   # builds the frontend into frontend/dist
npm start       # serves the API + built frontend from one Express server
```

<br/>

## 📡 API Reference

<details>
<summary><strong>🍺 Products — <code>/api/products</code></strong></summary>
<br/>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | List all products *(cached)* |
| `GET` | `/:id` | Get a single product *(cached)* |
| `POST` | `/:id/reviews` | Add a review to a product |
| `POST` | `/sommelier` | Chat with the AI Beer Sommelier |
| `POST` | `/sommelier/suggestions` | Get AI-generated follow-up questions |

</details>

<details>
<summary><strong>👤 Users — <code>/api/users</code></strong></summary>
<br/>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` · `/login` · `/logout` | Authentication |
| `GET` | `/auth/google` · `/auth/google/callback` | Google OAuth flow |
| `GET` | `/get` | Get current user |
| `PUT` | `/address` | Update shipping address |
| `GET` `POST` `PUT` | `/cart`, `/cart/add`, `/cart/remove`, `/cart/update` | Cart management |
| `GET` `POST` | `/wishlist`, `/wishlist/add`, `/wishlist/remove` | Wishlist management |
| `POST` | `/order` | Place an order |
| `GET` | `/orders` | Order history |
| `POST` | `/contact` · `/newsletter` | Contact form & newsletter signup |
| `POST` | `/forgot` · `/reset` | Password reset flow |

</details>

<br/>

<div align="center">

Made with 🍺 and ☕ by [GuramiGorgadze](https://github.com/GuramiGorgadze)

</div>
