# Task & Team Collaboration API

A comprehensive RESTful API built with Node.js, Express, and MongoDB for managing users, teams, and tasks with real-time notifications and reporting features.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access (Admin, Manager, Employee)
- **User & Team Management**: Complete CRUD operations for users and teams
- **Task Management**: Full task lifecycle with assignment, status tracking, and priority levels
- **Real-time Notifications**: Socket.IO integration for live updates
- **Comments & Activity Logs**: Track task discussions and changes
- **Reports & Analytics**: MongoDB aggregations for insights
- **Input Validation**: Joi validation for all endpoints

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **Validation**: Joi
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Postman (for API testing)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kavindisathsarani/Task-Team-API.git
   cd Task-Team-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-team-api
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Test Socket.IO**
   In a new terminal, run:
   ```bash
   node socketClient.js
   ```
   Expected output:
   ```
   Connected with socket id: xLzKnqaye2g4vo2TAAAB
   Socket event emitted: taskAssigned for user 68db8df60472f019e1afdb8e
   ```

## 🗄️ Database Models

- **Users**: name, email, password, role, teams
- **Teams**: name, description, members
- **Tasks**: title, description, status, priority, dueDate, assignedTo, teamId
- **Comments**: text, author, taskId
- **ActivityLogs**: action, user, taskId, timestamp

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public/Admin* |
| POST | `/api/auth/login` | User login | Public |

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin |

### Teams
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/teams` | Create new team | Admin |
| GET | `/api/teams` | Get all teams | Admin/Manager |
| PUT | `/api/teams/:id/assign` | Assign user to team | Admin |

### Tasks
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/tasks` | Create new task | Admin/Manager |
| GET | `/api/tasks` | Get all tasks | All roles |
| GET | `/api/tasks/:id` | Get task by ID | All roles |
| PUT | `/api/tasks/:id` | Update task | Role-based |
| DELETE | `/api/tasks/:id` | Delete task | Admin/Manager |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/tasks/:id/comments` | Add comment to task | All users |
| GET | `/api/tasks/:id/comments` | Get task comments | All users |

### Reports
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/reports` | Get analytics reports | Admin/Manager |

## 👥 User Roles & Permissions

- **Admin**: Full system access
- **Manager**: Team management, task assignment, reports
- **Employee**: Task updates, comments, view assigned tasks

## 📊 Real-time Notifications

Socket.IO events triggered for:
- Task assignment
- Status changes
- New comments
- Task updates

## 🧪 Testing with Postman

1. Import the provided Postman collection
2. Set up environment variables for authentication tokens
3. Test endpoints in the following order:
   - Register users
   - Login
   - Create teams
   - Assign users
   - Create tasks
   - Test notifications

## 📁 Project Structure

```
task-team-api/
├─ package.json
├─ .env.example
├─ server.js
├─ src/
│  ├─ config/
│  │  └─ db.js
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ Team.js
│  │  ├─ Task.js
│  │  ├─ Comment.js
│  │  └─ Log.js
│  ├─ middlewares/
│  │  ├─ auth.js
│  │  └─ roles.js
│  ├─ validators/
│  │  └─ auth.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ userController.js
│  │  ├─ teamController.js
│  │  ├─ taskController.js
│  │  └─ reportController.js
│  └─ routes/
│     ├─ auth.js
│     ├─ users.js
│     ├─ teams.js
│     ├─ tasks.js
│     └─ reports.js
└─ README.md
```

## 🔄 GitHub Workflow

- **main**: Stable release branch
- **feature branches**: `feature/task-name`
- Daily commits with descriptive messages
- Pull requests for code review

## 🚨 Important Notes

- First run: `npm run dev`
- Then in a new terminal: `node socketClient.js`
- Socket connection output confirms real-time functionality
- Ensure MongoDB is running before starting the server

## 📄 Postman Collection
 
- 📦 [Postman Collection](./Task-Team-API-postman-collection.json)

---

**Built with ❤️ using Node.js, Express, and MongoDB**
