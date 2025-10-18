# 📝 Messages Application

A full-stack web application for managing messages with complete CRUD operations, built with modern web technologies and professional architecture patterns.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Git

### Installation & Running
```bash
# Clone the repository
git clone <repository-url>
cd interviewTask

# Start the application
docker compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# Database Admin: http://localhost:8081
```

## 🏗️ Architecture

### Backend
- **Framework**: Express.js with Node.js
- **Database**: MySQL with Sequelize ORM
- **Migrations**: Professional database management with sequelize-cli
- **Validation**: express-validator for input validation
- **API**: RESTful endpoints with proper error handling

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: ShadCN UI for modern, accessible interface
- **Styling**: Tailwind CSS for responsive design

### Database
- **Engine**: MySQL 8.0
- **Management**: Sequelize migrations (no sync)
- **Sample Data**: Automated seeding with 4 sample messages

## 📁 Project Structure

```
interviewTask/
├── backend/
│   ├── app.js                 # Express server configuration
│   ├── models/
│   │   ├── index.js          # Database connection & model loading
│   │   └── message.js        # Message model definition
│   ├── routes/
│   │   └── messages.js       # CRUD API endpoints
│   ├── migrations/
│   │   └── 20251017203906-create-message.cjs
│   ├── seeders/
│   │   └── 20251017204328-demo-messages.cjs
│   └── config/
│       └── config.json       # Database configuration
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Main application component
│   │   ├── layout.tsx        # Root layout with providers
│   │   └── providers.tsx     # Redux store provider
│   ├── lib/
│   │   ├── store/
│   │   │   ├── api.ts        # RTK Query API slice
│   │   │   ├── store.ts      # Redux store configuration
│   │   │   └── hooks.ts      # Typed Redux hooks
│   │   └── utils.ts          # Utility functions
│   └── components/
│       └── ui/               # ShadCN UI components
├── docker-compose.yml        # Container orchestration
└── README.md                 # Original requirements
```

## 🔧 API Endpoints

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get single message
- `POST /api/messages` - Create new message
- `PUT /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message

### Health Check
- `GET /` - Server status and version

## 🎯 Features

### ✅ Complete CRUD Operations
- **Create**: Add new messages with validation
- **Read**: View all messages in a responsive table
- **Update**: Edit messages with modal popup
- **Delete**: Remove messages with confirmation

### ✅ Professional Database Management
- **Migrations**: Version-controlled database schema
- **Seeders**: Automated sample data population
- **No Sync**: Production-ready database management

### ✅ Modern Frontend
- **Real-time Updates**: Automatic UI updates via RTK Query
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Professional user feedback

### ✅ Developer Experience
- **TypeScript**: Full type safety
- **Docker**: One-command setup
- **Hot Reload**: Development efficiency
- **Error Handling**: Comprehensive error management

## 🛠️ Development

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Database Management
```bash
# Run migrations
npm run migrate

# Run seeders
npm run seed
```

## 🐳 Docker

The application is fully containerized with Docker Compose:

- **MySQL**: Database server
- **Backend**: Express API server
- **Frontend**: Next.js application
- **phpMyAdmin**: Database administration

All services are configured with proper health checks and dependencies.

## 📊 Database Schema

### Messages Table
```sql
CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

## 🔒 Security Features

- **Input Validation**: Server-side validation with express-validator
- **CORS Configuration**: Proper cross-origin resource sharing
- **Error Handling**: Secure error responses without sensitive data
- **SQL Injection Protection**: Sequelize ORM prevents SQL injection

## 🚀 Performance

- **Caching**: RTK Query automatic caching
- **Optimized Queries**: Efficient database queries
- **Lazy Loading**: Component-based code splitting
- **Production Build**: Optimized Next.js production build

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Developer

Built with modern web development best practices and professional architecture patterns.

## 🎯 Interview Task Completion

This project was completed as part of an internship interview task, demonstrating:
- Full-stack development skills
- Modern web technologies (Node.js, Next.js, Docker)
- Database management with migrations
- Professional UI/UX design
- Clean, maintainable code architecture

---

**Ready for production deployment and team collaboration.**
