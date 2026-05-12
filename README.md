# Yash Ganesh | Premium Developer Portfolio

A cinematic, high-performance portfolio website built with modern web technologies. This project features immersive 3D backgrounds, scroll-driven video transitions, and a robust FastAPI backend.

## ✨ Key Features

- **Cinematic Scroll Sequence**: A smooth, video-based intro transition that reacts to user scroll.
- **3D Immersive Environment**: Interactive 3D elements powered by Three.js and React Three Fiber.
- **Boot Sequence**: A high-tech loading experience that sets the tone for the site.
- **Dynamic Projects Showcase**: Interactive display of professional work and personal projects.
- **Lernio Live Integration**: Direct connection to Lernio platform projects.
- **Responsive Design**: Fully optimized for all device types with a focus on premium aesthetics.
- **Contact System**: Secure contact form with real-time validation and MongoDB storage.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://reactjs.org/)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **3D Engine**: [Three.js](https://threejs.org/) (@react-three/fiber)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Form Handling**: React Hook Form + Zod

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [MongoDB](https://www.mongodb.com/) (Motor Async Driver)
- **Validation**: Pydantic v2
- **Infrastructure**: Environment-driven configuration with Dotenv

## 📁 Project Structure

```text
YASH_PORTFOLIO/
├── frontend/           # React frontend application
│   ├── src/            # Component-driven source code
│   ├── public/         # Static assets & cinematic videos
│   └── tailwind.config.js
├── backend/            # FastAPI backend service
│   ├── server.py       # Main API entry point
│   └── requirements.txt
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- MongoDB instance

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure `.env` (see below).
5. Run the server:
   ```bash
   python server.py
   ```

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=your_database_name
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 🌐 Vercel Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

### Deployment Steps
1. Push your code to GitHub.
2. Import the project into Vercel.
3. In the **Project Settings**, configure the following:
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `cd frontend && npm install`
4. Add the following **Environment Variables**:
   - `MONGO_URL`: Your MongoDB connection string.
   - `DB_NAME`: Your database name.
   - `REACT_APP_BACKEND_URL`: (Optional) If you want to point to a different backend. Defaults to `/api`.

Vercel will automatically detect the `api/` directory and host your FastAPI backend as serverless functions.

---
Developed with ❤️ by [Yash Ganesh](https://github.com/GYASH28)
