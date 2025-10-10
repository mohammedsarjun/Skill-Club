export interface IPortfolio {


  title: string,          // Project title
  description: string,    // Brief overview of the project
  technologies: [string], // E.g. ["React", "Node.js", "MongoDB"]
  role: string,           // e.g. "Frontend Developer", "Full Stack Developer"
  projectUrl: string,     // Live project/demo link
  githubUrl: string,      // GitHub or source code link
  images: [string],       // Array of image URLs
  video:string,
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-updated
}
