# 📋 Task Manager - Full Stack Application

A comprehensive task management system built with React, Node.js, Express, and MongoDB. This application allows teams to efficiently manage tasks, track progress, and collaborate seamlessly.

## 🚀 Features

### 👤 User Management
- **Role-based Authentication** (Admin & Member)
- **User Registration & Login** with JWT authentication
- **Profile Management** with avatar support
- **Team Member Overview** with task statistics

### 📊 Admin Features
- **Dashboard** with interactive charts and analytics
- **Task Management** (Create, Read, Update, Delete)
- **User Management** (View team members and their task statistics)
- **Advanced Task Assignment** to multiple team members
- **Progress Tracking** with visual progress bars
- **Report Generation** (Export tasks and user data to Excel)

### 👨‍💼 User Features  
- **Personal Dashboard** with assigned task overview
- **Task Status Updates** (Pending → In Progress → Completed)
- **Todo Checklist Management** within tasks
- **Task Details View** with attachments and due dates
- **Personal Task Reports** (Export personal tasks to Excel)

### 🎯 Task Features
- **Priority Levels** (Low, Medium, High)
- **Due Date Management** with proper date formatting
- **Status Tracking** (Pending, In Progress, Completed)
- **Todo Checklists** with progress tracking
- **File Attachments** support
- **Task Assignment** to multiple users
- **Progress Visualization** with completion percentages

### 📱 UI/UX Features
- **Responsive Design** (Mobile, Tablet, Desktop)
- **Modern UI** with TailwindCSS
- **Interactive Charts** using Recharts
- **Toast Notifications** for user feedback
- **Dark/Light Theme Support**
- **Avatar System** with fallback initials
- **Mobile-Friendly Sidebar** with backdrop overlay

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **React Hot Toast** - Notification system
- **React Icons** - Icon library
- **Moment.js** - Date manipulation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **ExcelJS** - Excel file generation
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Task-Manager/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Cards/          # Task cards, User cards, Info cards
│   │   │   ├── Charts/         # Custom charts (Pie, Bar)
│   │   │   ├── Inputs/         # Form inputs, User selection
│   │   │   └── layouts/        # Layout components (Sidebar, Navbar)
│   │   ├── pages/              # Page components
│   │   │   ├── Admin/          # Admin-only pages
│   │   │   ├── Auth/           # Authentication pages
│   │   │   └── Users/          # User pages
│   │   ├── context/            # React context (User context)
│   │   ├── hooks/              # Custom React hooks
│   │   └── utils/              # Utility functions and configurations
│   ├── public/                 # Static assets
│   └── package.json
│
├── server/                     # Backend Node.js application
│   ├── config/                 # Database configuration
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Custom middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── uploads/                # File upload directory
│   ├── server.js               # Entry point
│   └── package.json
│
└── README.md                   # Project documentation
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChandrakantaMandal/Task-Manager
   cd Task-Manager
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   The Example File is Given in the server folder as .env.example
   ```

5. **Database Setup**
   - Ensure MongoDB is running locally or provide a cloud MongoDB URI
   - The application will create collections automatically

### 🏃‍♂️ Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   Backend will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Register a new account or use existing credentials

## 📋 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Task Routes
- `GET /api/tasks` - Get all tasks (filtered by user role)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task (Admin only)
- `PUT /api/tasks/:id` - Update task (Admin only)
- `DELETE /api/tasks/:id` - Delete task (Admin only)
- `PATCH /api/tasks/:id/status` - Update task status
- `PATCH /api/tasks/:id/todo` - Update task checklist

### User Routes
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID

### Report Routes
- `GET /api/reports/export/tasks` - Export tasks to Excel
- `GET /api/reports/export/users` - Export user statistics to Excel

### Dashboard Routes
- `GET /api/tasks/dashboard-data` - Get admin dashboard data
- `GET /api/tasks/user-dashboard-data` - Get user dashboard data

## 🎨 Key Components

### Frontend Components

**Layout Components:**
- `DashboardLayout` - Main application layout
- `Navbar` - Navigation bar with mobile sidebar
- `SideMenu` - Sidebar navigation with role-based menus

**Card Components:**
- `TaskCard` - Individual task display with progress
- `UserCard` - User information with task statistics
- `InfoCard` - Statistical information display

**Chart Components:**
- `CustomPieChart` - Task distribution visualization
- `CustomBarChart` - Task priority level visualization

**Form Components:**
- `SelectUsers` - Multi-user selection with search
- `TodoListInput` - Dynamic todo list management


## 🔐 Authentication & Authorization

- **JWT-based Authentication** with secure token storage
- **Role-based Access Control** (Admin vs Member permissions)
- **Protected Routes** with authentication middleware
- **Automatic Token Refresh** handling

### User Roles:
- **Admin**: Full access to all features, task management, user management
- **Member**: Limited access to assigned tasks, personal dashboard

## 📊 Dashboard Analytics

### Admin Dashboard:
- Task distribution pie chart
- Priority level bar chart
- Statistical overview (Total, Pending, In Progress, Completed tasks)
- Recent tasks table
- Team performance metrics

### User Dashboard:
- Personal task statistics
- Assigned task overview
- Progress tracking
- Personal task distribution

## 🎯 Advanced Features

### Smart Task Assignment:
- Multi-user assignment with visual user selection
- Search functionality for large teams
- Real-time user availability display
- Profile image fallbacks with user initials

### Progress Tracking:
- Automatic progress calculation based on checklist completion
- Visual progress bars with status-based colors
- Real-time status updates

### Export Functionality:
- Excel export for tasks with full details
- User statistics export with task breakdown
- Formatted reports with proper headers
- Download progress feedback

### Mobile Responsiveness:
- Adaptive sidebar with backdrop overlay
- Touch-friendly interface
- Responsive card layouts
- Mobile-optimized forms

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure backend allows frontend origin in CORS configuration
   - Check if both servers are running on correct ports

2. **Database Connection:**
   - Verify MongoDB is running
   - Check connection string in `.env` file
   - Ensure database permissions are correct

3. **Authentication Issues:**
   - Clear localStorage and login again
   - Check JWT secret consistency
   - Verify token expiration settings

4. **File Upload Problems:**
   - Check upload directory permissions
   - Verify file size limits
   - Ensure multer configuration is correct

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel):
1. Set environment variables in deployment platform
2. Configure MongoDB Atlas connection
3. Update CORS origins for production domain
4. Deploy using platform-specific methods

### Frontend Deployment (Netlify/Vercel):
1. Build the React application: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables for API URL
4. Set up redirects for SPA routing

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- MongoDB team for the excellent database
- All contributors and the open-source community

---

**⭐ If you found this project helpful, please give it a star!**
