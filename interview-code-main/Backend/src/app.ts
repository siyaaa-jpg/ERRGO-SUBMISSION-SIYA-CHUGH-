import express, { Request, Response } from 'express';
import cors from 'cors';
import { IProject } from './models/project.interface';
import { v4 as uuid } from 'uuid';

const app = express();
const PORT = 3000;

// In-memory store for projects
const projects: IProject[] = [];

// Middleware setup
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.send('Errgo Backend Interview Module Loaded Successfully!');
});

// ✅ Create a new project
app.post('/projects', (req: express.Request, res: express.Response) => {
  const { project } = req.body;

  if (!project?.name || !project?.description) {
    res.status(400).json({ error: 'Name and description are required.' });
    return;
  }

  const newProject: IProject = {
    id: uuid(),
    name: project.name,
    description: project.description,
  };

  projects.push(newProject);
  res.status(200).json(newProject);
});


// ✅ Get all projects
app.get('/projects', (_req: Request, res: Response) => {
  res.status(200).json(projects);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
