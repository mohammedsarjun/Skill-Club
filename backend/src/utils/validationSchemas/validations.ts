import z from "zod";

export const portfolioSchema = z.object({
  title: z.string().nonempty("Project title is required"),
  description: z.string().nonempty("Description is required"),
  role: z.string().nonempty("Role is required"),
  projectUrl: z
    .string()
    .url("Invalid project URL")
    .optional()
    .or(z.literal("")),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  technologies: z.array(z.string()),
  images: z.array(z.instanceof(File).optional()),
  video: z.instanceof(File, { message: "Video is required" }),
});