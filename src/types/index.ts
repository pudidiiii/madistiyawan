
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  features?: string[];
  demoUrl?: string;
  githubUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt?: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  profilePhoto?: string;
  date: string;
}
