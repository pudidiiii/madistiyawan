
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProjectStore from '../../store/projectStore';
import { Project } from '../../types';

const categories = ['All', 'UI/UX Design', 'Graphic Design', 'Video', 'Certificate'];

const PortfolioSection = () => {
  const { projects } = useProjectStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Showcasing my creative and technical portfolio
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeCategory === category 
                  ? 'gradient-bg text-white' 
                  : 'bg-brand-purple/10 text-foreground hover:bg-brand-purple/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </div>
          ) : (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link 
      to={`/portfolio/${project.id}`} 
      className="group glass-card overflow-hidden transition-transform hover-scale"
    >
      <div className="relative aspect-video overflow-hidden">
        {project.mediaType === 'video' ? (
          <video 
            src={project.imageUrl} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 text-xs rounded-full bg-brand-purple/80 text-white">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{project.subtitle}</p>
      </div>
    </Link>
  );
};

export default PortfolioSection;
