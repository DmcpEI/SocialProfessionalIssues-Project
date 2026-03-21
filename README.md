# Travel App

> Web application for searching flights or overland trips between countries, selecting an itinerary, managing a user profile, and recording trip payments.

## 📚 Academic Context

| | |
|---|---|
| **Degree** | BSc in Computer Science @ University of Madeira |
| **Course** | Social and Professional Issues |
| **Year** | 2022/23 |

## 🛠️ Technologies & Concepts

- `JavaScript`
- `Node.js` + `Express`
- `EJS` for server-rendered views
- `MongoDB` with the native driver
- `HTML` and custom `CSS`
- REST-style routing for users, flights, overland trips, and payments
- Form handling with `fetch` and JSON requests on the frontend
- Dynamic option loading for origins and destinations
- Basic user registration, login, profile update, trip selection, and payment persistence
- Team collaboration across development and non-development roles

## 🏗️ Architecture / Approach

- The application is organized around a small Express server in `server.js`, which configures EJS, static assets, and the main route groups.
- The codebase is split into `router/`, `database/`, `views/`, and `public/css/`, separating HTTP flow, data access, presentation templates, and styling.
- Each domain has its own router and collection helper:
  - `users` for registration, login, and profile updates
  - `flights` for flight search and selection
  - `overlands` for overland trip search and selection
  - `payments` for saving the final booking payment
- The main user flow is: register/login, search by trip type and route, choose an itinerary, proceed to payment, and return to the logged-in homepage.
- Data is stored in MongoDB collections named `Flights`, `Users`, `Overlands`, and `Payments`.

## 🚀 How to Run

1. Make sure you have `Node.js` installed.
2. Install dependencies in the project root:

```bash
npm install
```

3. Review the MongoDB connection in `database/db.js`. The repository currently includes a hardcoded Atlas connection string there, so replace it with your own if needed.
4. Start the server from the project root with the actual entry file:

```bash
node server.js
```

5. Open the application in the browser:

```text
http://localhost:3000
```

6. Register a user or log in, then search for either `Flight` or `Overland` routes, choose an option, and continue to the payment step.

## 📝 Notes

- This project was developed for Social and Professional Issues in the BSc in Computer Science at the University of Madeira during an Erasmus period at the University of Maribor.
- It was built in a large multidisciplinary team of around 15 people, with separate development and marketing roles.
- I was part of the development/code team and also contributed the original idea for the project, which made it a valuable experience in collaboration, coordination, and shared product ownership.
- The project combines technical implementation with team organization, making it especially relevant for a course focused on social and professional practice.
