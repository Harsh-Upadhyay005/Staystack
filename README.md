# StayStack

**Full Stack Property & Booking Management Platform built with MERN**

A comprehensive property rental and booking management system featuring user authentication, interactive maps, real-time geocoding, and a modern, responsive interface. Built with MongoDB, Express.js, React-like templating (EJS), and Node.js following industry-standard MVC architecture.

## Features

- 🏠 Browse property listings with detailed information
- 👤 User authentication (signup, login, logout)
- 🔒 Protected routes - only logged-in users can create/edit/delete
- 🗺️ **Interactive maps with Mapbox integration**
- 📍 **Geocoding - automatic location coordinates**
- 🎯 **Custom markers and popups on maps**
- ➕ Create new property listings
- ✏️ Edit existing listings
- 🗑️ Delete listings
- ⭐ Add reviews and ratings to properties
- 💬 Delete reviews
- 📱 Responsive design for mobile and desktop
- ✅ Form validation (client-side and server-side)
- 💬 Flash messages for user feedback
- 🎨 Modern, professional UI with Bootstrap 5
- 🏗️ **MVC Architecture - Clean, maintainable code**

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework (MVC Pattern)
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **Passport-Local** - Username/password authentication
- **Express-Session** - Session management
- **Connect-Flash** - Flash messages
- **Mapbox SDK** - Geocoding and maps
- **EJS** - Template engine
- **Joi** - Schema validation

### Frontend
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **EJS-Mate** - Layout support for EJS

## Project Structure

```
MajorProject-1/
├── controllers/            # MVC Controllers
│   ├── listings.js         # Listing logic + Geocoding
│   ├── users.js            # Auth logic
│   └── reviews.js          # Review logic
├── routes/                 # MVC Routes
│   ├── listing.js          # Listing routes
│   ├── user.js             # Auth routes
│   └── review.js           # Review routes
├── Models/
│   ├── listing.js          # Listing schema + geometry
│   ├── review.js           # Review schema
│   └── user.js             # User schema
├── views/
│   ├── listings/
│   │   ├── index.ejs       # All listings page
│   │   ├── show.ejs        # Single listing + MAP
│   │   ├── new.ejs         # Create new listing
│   │   └── edit.ejs        # Edit listing
│   ├── users/
│   │   ├── signup.ejs      # User registration
│   │   └── login.ejs       # User login
│   ├── includes/
│   │   ├── navbar.ejs      # Navigation bar
│   │   └── footer.ejs      # Footer
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout + Mapbox
│   └── error.ejs           # Error page
├── Public/
│   └── CSS/
│       ├── style.css       # Custom styles + map styles
│       └── JS/
│           ├── Script.js   # Form validation
│           └── map.js      # Mapbox functionality
├── utils/
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error handler
├── init/
│   ├── data.js             # Sample data
│   └── index.js            # Database initialization
├── middleware.js           # Authentication middleware
├── app.js                  # Main application (MVC)
├── schema.js               # Joi validation schemas
└── package.json            # Dependencies

```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh-Upadhyay005/Staystack.git
   cd MajorProject-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

4. **Initialize the database with sample data**
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to: `http://localhost:8080`

## API Routes

### Authentication Routes
- `GET /signup` - User registration page
- `POST /signup` - Create new user account
- `GET /login` - User login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listing Routes
- `GET /` - Redirect to listings
- `GET /listings` - View all listings
- `GET /listings/new` - Form to create new listing (protected)
- `POST /listings` - Create new listing (protected)
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Form to edit listing (protected)
- `PUT /listings/:id` - Update listing (protected)
- `DELETE /listings/:id` - Delete listing (protected)

### Review Routes
- `POST /listings/:id/reviews` - Add review to listing (protected)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (protected)

## Environment Variables

The application uses the following default values:
- MongoDB URL: `mongodb://127.0.0.1:27017/staystack`
- Port: `8080`

## Features in Detail

### MVC Architecture
- **Models**: Database schemas (Listing, Review, User)
- **Views**: EJS templates for UI
- **Controllers**: Business logic separated by feature
- **Routes**: Clean URL routing
- Professional, maintainable code structure

### Maps & Geocoding
- Mapbox GL JS integration
- Automatic geocoding (location → coordinates)
- Interactive maps on listing pages
- Custom markers with brand color
- Popups showing listing information
- Responsive map display

### Authentication
- User signup with username, email, and password
- Secure password hashing with passport-local-mongoose
- Session-based authentication
- Protected routes requiring login
- Automatic redirect after login to originally requested page

### Validation
- Server-side validation using Joi
- Client-side validation using Bootstrap 5
- Custom error handling middleware

### Database
- MongoDB with Mongoose ODM
- User, Listings, and Reviews collections
- GeoJSON support for location coordinates
- Cascade delete for reviews when listing is deleted

### UI/UX
- Responsive grid layout
- Card-based design
- Smooth hover effects
- Star rating display
- Form validation feedback
- Flash messages for user actions
- Interactive maps with markers

## Future Enhancements

- [x] User-specific listings (ownership) - **COMPLETED**
- [x] Authorization controls - **COMPLETED**
- [ ] User profiles with avatar
- [ ] Image upload functionality (Cloudinary)
- [ ] Advanced search and filter listings
- [ ] Booking system with calendar
- [ ] Payment integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Wishlist/favorites
- [ ] Map integration (location picker)
- [ ] Rating restrictions (one review per user)
- [ ] Pagination for listings
- [ ] Admin dashboard

## License

ISC

## Author

Harsh Upadhyay

## Repository

[GitHub - Staystack](https://github.com/Harsh-Upadhyay005/Staystack)
