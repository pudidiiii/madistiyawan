
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useProjectStore from '../../store/projectStore';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = useProjectStore();
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center text-brand-purple hover:underline"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-purple/10 text-foreground hover:bg-brand-purple/20 transition-colors mb-6"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </Link>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {project.title}
          </h2>
          <p className="text-muted-foreground">{project.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden border border-brand-purple/10 mb-6">
              {project.mediaType === 'video' ? (
                <video 
                  src={project.imageUrl} 
                  className="w-full h-auto object-cover"
                  controls
                  playsInline
                />
              ) : (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Project Description</h3>
              <p className="text-muted-foreground mb-6">{project.description}</p>

              {project.features && project.features.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-brand-purple mr-2">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Project Info</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Category</h4>
                  <p>{project.category}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-brand-purple/10 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Project Links</h3>
              
              <div className="space-y-4">
                {project.demoUrl && (
                  <Button 
                    asChild
                    className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
                  >
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                
                {project.githubUrl && (
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github size={18} className="mr-2" />
                      Source Code
                    </a>
                  </Button>
                )}

                {!project.demoUrl && !project.githubUrl && (
                  <p className="text-muted-foreground">No links available for this project.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
