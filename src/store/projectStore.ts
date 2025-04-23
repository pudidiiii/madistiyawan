
import { create } from 'zustand';
import { Project, Certificate, Comment } from '../types';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  projects: Project[];
  certificates: Certificate[];
  comments: Comment[];
  loading: boolean;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  getProjectsCount: () => number;
  getCertificatesCount: () => number;
  getCommentsCount: () => number;
  getYearsOfExperience: () => number;
  getSortedProjects: (limit?: number) => Project[];
}

const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [
        {
          id: '1',
          title: 'Aritmatika Solver',
          subtitle: 'Mathematics Problem Solver',
          category: 'UI/UX Design',
          description: 'Program ini dirancang untuk mempermudah pengguna dalam menyelesaikan soal-soal Aritmatika secara otomatis dengan menggunakan bahasa pemrograman Python. Tujuan utama dari program ini adalah untuk membantu pengguna, terutama pelajar, dalam menyelesaikan soal-soal Aritmatika dengan lebih cepat dan mudah.',
          imageUrl: '/placeholder.svg',
          technologies: ['Python', 'Flask', 'React'],
          features: [
            'Menghitung suku tertentu dari barisan aritmatika dengan menggunakan rumus suku ke-n.',
            'Menentukan suku pertama atau beda jika hanya dua suku diketahui dalam barisan aritmatika.',
            'Menghitung jumlah n suku pertama dari deret aritmatika'
          ],
          mediaType: 'image',
          createdAt: '2023-01-01T00:00:00.000Z'
        },
        {
          id: '2',
          title: 'E-Commerce Dashboard',
          subtitle: 'Admin Management System',
          category: 'UI/UX Design',
          description: 'A comprehensive dashboard for e-commerce management with analytics, inventory management, and order processing.',
          imageUrl: '/placeholder.svg',
          technologies: ['React', 'Node.js', 'MongoDB'],
          mediaType: 'image',
          createdAt: '2023-02-01T00:00:00.000Z'
        },
        {
          id: '3',
          title: 'Travel Landing Page',
          subtitle: 'Web Design',
          category: 'Graphic Design',
          description: 'A beautiful and responsive landing page for a travel agency with booking features.',
          imageUrl: '/placeholder.svg',
          technologies: ['HTML', 'CSS', 'JavaScript'],
          mediaType: 'image',
          createdAt: '2023-03-01T00:00:00.000Z'
        },
        {
          id: '4',
          title: 'Fitness App UI',
          subtitle: 'Mobile UI Design',
          category: 'UI/UX Design',
          description: 'Mobile application UI design for fitness tracking with workout plans and nutrition guidance.',
          imageUrl: '/placeholder.svg',
          technologies: ['Figma', 'Adobe XD'],
          mediaType: 'image',
          createdAt: '2023-04-01T00:00:00.000Z'
        },
        {
          id: '5',
          title: 'Corporate Video',
          subtitle: 'Company Introduction',
          category: 'Video',
          description: 'A professional corporate video showcasing company values, products, and services.',
          imageUrl: '/placeholder.svg',
          technologies: ['Adobe Premiere', 'After Effects'],
          mediaType: 'video',
          createdAt: '2023-05-01T00:00:00.000Z'
        },
        {
          id: '6',
          title: 'Web Development Certificate',
          subtitle: 'Professional Certification',
          category: 'Certificate',
          description: 'Professional certification in web development covering HTML, CSS, JavaScript, and responsive design.',
          imageUrl: '/placeholder.svg',
          technologies: ['Web Development'],
          mediaType: 'image',
          createdAt: '2023-06-01T00:00:00.000Z'
        }
      ],
      certificates: [
        {
          id: '1',
          title: 'Web Development Certification',
          organization: 'Codecademy',
          date: 'March 2023',
          imageUrl: '/placeholder.svg',
        }
      ],
      comments: [],
      loading: false,
      addProject: (project: Project) => set((state) => {
        // Add createdAt timestamp if not provided
        const newProject = {
          ...project,
          createdAt: project.createdAt || new Date().toISOString()
        };
        const newProjects = [...state.projects, newProject];
        return { projects: newProjects };
      }),
      updateProject: (project: Project) => set((state) => {
        const updatedProjects = state.projects.map(p => 
          p.id === project.id ? project : p
        );
        return { projects: updatedProjects };
      }),
      deleteProject: (id: string) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id)
      })),
      addCertificate: (certificate: Certificate) => set((state) => {
        const newCertificates = [...state.certificates, certificate];
        
        // Also create a corresponding project entry for this certificate
        const certificateProject: Project = {
          id: certificate.id,
          title: certificate.title,
          subtitle: `Certificate from ${certificate.organization}`,
          category: 'Certificate',
          description: `${certificate.title} issued by ${certificate.organization} on ${certificate.date}`,
          imageUrl: certificate.imageUrl,
          technologies: [],
          mediaType: 'image',
          createdAt: new Date().toISOString()
        };
        
        const newProjects = [...state.projects, certificateProject];
        
        return { 
          certificates: newCertificates,
          projects: newProjects
        };
      }),
      updateCertificate: (certificate: Certificate) => set((state) => {
        const updatedCertificates = state.certificates.map(c => 
          c.id === certificate.id ? certificate : c
        );
        
        // Also update the corresponding project
        const updatedProjects = state.projects.map(project => {
          if (project.id === certificate.id && project.category === 'Certificate') {
            return {
              ...project,
              title: certificate.title,
              subtitle: `Certificate from ${certificate.organization}`,
              description: `${certificate.title} issued by ${certificate.organization} on ${certificate.date}`,
              imageUrl: certificate.imageUrl,
            };
          }
          return project;
        });
        
        return { 
          certificates: updatedCertificates,
          projects: updatedProjects
        };
      }),
      deleteCertificate: (id: string) => set((state) => ({
        certificates: state.certificates.filter(certificate => certificate.id !== id),
        projects: state.projects.filter(project => !(project.id === id && project.category === 'Certificate'))
      })),
      addComment: (comment: Comment) => set((state) => ({ 
        comments: [...state.comments, comment] 
      })),
      deleteComment: (id: string) => set((state) => ({
        comments: state.comments.filter(comment => comment.id !== id)
      })),
      getProjectsCount: () => get().projects.length,
      getCertificatesCount: () => get().certificates.length,
      getCommentsCount: () => get().comments.length,
      getYearsOfExperience: () => 5,
      getSortedProjects: (limit?: number) => {
        // Sort projects by createdAt in descending order (newest first)
        const sorted = [...get().projects].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        
        return limit ? sorted.slice(0, limit) : sorted;
      },
    }),
    {
      name: 'portfolio-storage',
    }
  )
);

export default useProjectStore;
