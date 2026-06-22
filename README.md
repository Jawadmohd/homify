# Homify 🏠

Homify is a full-stack home listing platform inspired by Airbnb. Users can explore listings, create their own property listings, upload photos, manage listings, and interact through reviews. The project focuses on building a modern property rental/listing experience using the MERN ecosystem and cloud-based media storage.

## Features

### Authentication & User Management

* User registration and login
* Secure authentication and session handling
* Protected routes for authorized actions

### Listings

* Create new property listings
* Upload multiple property images
* Edit listing details
* Delete listings
* View listing details

### Reviews

* Add reviews for listings
* View reviews from other users
* Manage review content

### Location Support

* Automatic geolocation using geocoding
* Store coordinates for listings
* Location-aware listing data

### Media Uploads

* Cloud image upload support
* Multiple image handling
* Optimized image storage

---

## Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Cloud & Services

* Cloudinary (Image Storage)
* OpenStreetMap Geocoder

### Authentication

* Passport.js
* Express Session

---

## Project Structure

```bash
homify/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── iddlewares.js
├── cloudConfig.js
├── index.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd homify
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URL=
SECRET=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_SECRET=
```

Start MongoDB locally:

```bash
mongod
```

Run the application:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## Environment Variables

| Variable      | Description            |
| ------------- | ---------------------- |
| MONGO_URL     | MongoDB connection URL |
| SECRET        | Session secret         |
| CLOUD_NAME    | Cloudinary cloud name  |
| CLOUD_API_KEY | Cloudinary API key     |
| CLOUD_SECRET  | Cloudinary secret      |```

---

## Future Improvements

* Booking functionality
* Wishlist system
* Availability calendar
* Payment gateway
* Notifications
* Admin dashboard

---

## Learning Goals

This project was built to practice:

* REST APIs
* MVC architecture
* Authentication
* File uploads
* Cloud integrations
* Database modeling
* Full stack application development

---

## License

This project is built for educational and portfolio purposes.
