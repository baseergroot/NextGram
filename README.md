# NextGram

NextGram is a modern social media platform inspired by Instagram, built with the latest features of Next.js and React. It leverages full-stack technologies for an interactive, secure, and scalable experience.

[Live Demo](https://nextgram-dev.vercel.app/)

---

## Features

- **User Profiles & Feeds:** Browse posts, follow users, and view personalized feeds.
- **Post Sharing & Media Uploads:** Seamless sharing of images and updates.
- **Responsive UI:** Beautiful and adaptable across devices with Tailwind CSS and Flowbite-React.
- **Next.js App Router:** Utilizes the latest routing and layouts.
- **SSR (Server-Side Rendering):** Fast initial loads and SEO-friendly pages.
- **Server Actions for Mutations:** Secure and efficient data mutations using Next.js server actions.
- **React Server Components:** Fetches database data on the server for better performance and security.
- **JWT-based Authentication:** Secure authentication using JSON Web Tokens and Next.js cookies.
- **Protected Routes with Middleware:** Ensures only authenticated users can access certain pages, and prevents logged-in users from accessing auth routes.
- **MongoDB Database:** Stores user profiles, posts, and interactions.
- **React Icons:** Clean, modern iconography throughout the UI.
- **TypeScript Strict Mode:** Type-safe and robust codebase.

---

## Tech Stack

- **Framework:** Next.js (App Router, SSR, Server Actions, Server Components)
- **Language:** TypeScript
- **Database:** MongoDB
- **Styling:** Tailwind CSS, Flowbite-React
- **Icons:** React Icons
- **Authentication:** JWT (JSON Web Tokens), Next.js Cookies
- **Route Protection:** Next.js Middleware

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/baseergroot/NextGram.git
   cd NextGram
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your MongoDB URI, JWT secret, and other configuration.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Core Concepts

- **SSR (Server-Side Rendering):** Most pages are rendered on the server for fast load times and SEO.
- **Server Actions:** All data mutations (creating posts, following users, etc.) are securely handled server-side.
- **Server Components:** Data fetching from MongoDB occurs in server components for performance and security.
- **JWT Authentication & Cookies:** User sessions are managed with JWT and stored in HTTP-only cookies.
- **Middleware Route Protection:** Middleware ensures only authenticated users can access protected routes, and prevents access to auth pages if already logged in.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is currently unlicensed.

---

## Author

- [baseergroot](https://github.com/baseergroot)