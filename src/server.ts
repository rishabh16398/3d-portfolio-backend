import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { Project } from './models';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();

// Get port from environment or use 5000 as default
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 3D Portfolio API is running!',
    status: 'success' 
  });
});

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// app.post('/api/test/project', async (req: Request, res: Response) => {
//   try {
//     const testProject = new Project({
//       title: "3D Portfolio Website",
//       description: "Interactive portfolio with 3D character navigation",
//       technologies: ["React", "TypeScript", "Three.js", "Node.js"],
//       githubUrl: "https://github.com/rishabh16398/3d-portfolio",
//       featured: true
//     });

//     await testProject.save();
    
//     res.status(201).json({
//       message: 'Test project created!',
//       project: testProject
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       message: 'Error creating project',
//       error: error.message
//     });
//   }
// });

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();