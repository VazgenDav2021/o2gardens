# O2 Gardens Server

Production-ready Express.js server with MongoDB for the O2 Gardens application.

## Features

- ✅ RESTful API with Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT Authentication with secure cookies
- ✅ Role-based access control (Admin/User)
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ File upload support (Multer)
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ TypeScript support
- ✅ Production-ready structure

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts   # MongoDB connection
│   │   └── env.ts        # Environment variables
│   ├── controllers/      # Route controllers
│   │   ├── authController.ts
│   │   ├── eventController.ts
│   │   ├── hallSchemaController.ts
│   │   ├── reservationController.ts
│   │   └── slideController.ts
│   ├── middleware/       # Custom middleware
│   │   ├── auth.ts       # Authentication & authorization
│   │   ├── asyncHandler.ts
│   │   ├── errorHandler.ts
│   │   ├── upload.ts     # File upload (Multer)
│   │   └── validator.ts  # Validation middleware
│   ├── models/           # Mongoose models
│   │   ├── User.ts
│   │   ├── Event.ts
│   │   ├── HallSchema.ts
│   │   ├── Reservation.ts
│   │   └── Slide.ts
│   ├── routes/           # API routes
│   │   ├── auth.ts
│   │   ├── events.ts
│   │   ├── halls.ts
│   │   ├── reservations.ts
│   │   └── slides.ts
│   ├── utils/            # Utility functions
│   │   └── jwt.ts        # JWT token utilities
│   ├── validators/       # Input validators
│   │   ├── authValidator.ts
│   │   └── eventValidator.ts
│   └── server.ts         # Main server file
├── .env.example          # Environment variables example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/o2gardens
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

4. Make sure MongoDB is running on your system.

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new admin (Admin only)
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Events
- `GET /api/events` - Get all events (query: `locale`, `hallId`)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Hall Schemas
- `GET /api/halls/schemas` - Get all hall schemas (query: `hallId`, `date`)
- `GET /api/halls/schemas/:id` - Get single hall schema
- `POST /api/halls/schemas` - Create hall schema (Admin only)
- `PUT /api/halls/schemas/:id` - Update hall schema (Admin only)
- `DELETE /api/halls/schemas/:id` - Delete hall schema (Admin only)
- `POST /api/halls/schemas/:id/tables` - Add table to schema (Admin only)
- `PUT /api/halls/schemas/:id/tables/:tableId` - Update table (Admin only)
- `DELETE /api/halls/schemas/:id/tables/:tableId` - Delete table (Admin only)
- `POST /api/halls/schemas/:id/scenes` - Add scene to schema (Admin only)
- `DELETE /api/halls/schemas/:id/scenes/:sceneId` - Delete scene (Admin only)

### Hero Slides
- `GET /api/hero/slides` - Get all slides
- `GET /api/hero/slides/:id` - Get single slide
- `POST /api/hero/slides` - Create slide (Admin only)
- `PUT /api/hero/slides/:id` - Update slide (Admin only)
- `DELETE /api/hero/slides/:id` - Delete slide (Admin only)

### Reservations
- `GET /api/reservations` - Get all reservations (Admin only, query: `eventId`, `status`, `date`)
- `GET /api/reservations/:id` - Get single reservation (Admin only)
- `POST /api/reservations` - Create reservation (Public)
- `PUT /api/reservations/:id` - Update reservation (Admin only)
- `DELETE /api/reservations/:id` - Delete reservation (Admin only)

## Authentication

The API uses JWT tokens for authentication. Tokens are sent via:
1. HTTP-only cookies (preferred)
2. Authorization header: `Bearer <token>`

### Example Request
```javascript
// Login
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}

// Authenticated request
GET /api/events
Cookie: token=<jwt-token>
// OR
Authorization: Bearer <jwt-token>
```

## Data Models

### User
```typescript
{
  email: string;
  password: string; // hashed
  role: 'admin' | 'user';
}
```

### Event
```typescript
{
  name: { en?: string; ru?: string; hy?: string };
  description: { en?: string; ru?: string; hy?: string };
  artists: { en?: string; ru?: string; hy?: string };
  date: Date;
  deposit: string;
  image: string;
  isAdult: boolean;
  hallId: string;
  capacity: number;
  menu: MenuItem[];
  schema: ObjectId; // Reference to HallSchema
  timeStart: string;
}
```

### HallSchema
```typescript
{
  hallId: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  tables: Array<{
    x: number;
    y: number;
    seats: number;
    reserved: boolean;
  }>;
  scenes: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}
```

### Reservation
```typescript
{
  eventId?: ObjectId;
  tableId: string;
  hallId: string;
  bookingType: 'regular' | 'event';
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  menuItems: string[];
  deposit: string;
  totalAmount: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}
```

### Slide
```typescript
{
  url: string;
  order: number;
}
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configured for frontend origin
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Hashing**: Bcrypt with salt rounds
- **JWT**: Secure token-based authentication
- **Input Validation**: express-validator for request validation
- **Error Handling**: Centralized error handling middleware

## File Uploads

File uploads are handled using Multer. Uploaded files are stored in the `uploads/` directory (configurable via `UPLOAD_PATH`).

Supported file types: `jpeg`, `jpg`, `png`, `gif`, `webp`
Max file size: 5MB (configurable via `MAX_FILE_SIZE`)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/o2gardens` |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `MAX_FILE_SIZE` | Max file upload size (bytes) | `5242880` (5MB) |
| `UPLOAD_PATH` | Upload directory path | `./uploads` |

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Creating Initial Admin User

You can create an initial admin user by making a POST request to `/api/auth/register` (you'll need to temporarily remove the auth middleware or use a script):

```javascript
// Example script to create admin
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const admin = await User.create({
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  });
  console.log('Admin created:', admin);
}
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB connection string
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
6. Enable HTTPS
7. Set up proper logging and monitoring
8. Configure reverse proxy (nginx) if needed

## License

ISC

