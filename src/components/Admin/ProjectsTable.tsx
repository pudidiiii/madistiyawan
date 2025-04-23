
import React from 'react';
import useProjectStore from '@/store/projectStore';
import { Trash2, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ProjectsTable = () => {
  const { projects, deleteProject } = useProjectStore();
  const { toast } = useToast();

  const handleDelete = (projectId: string, projectTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      deleteProject(projectId);
      toast({
        title: "Project deleted",
        description: `"${projectTitle}" has been removed successfully.`,
      });
    }
  };

  return (
    <div className="glass-card p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Projects List</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Technologies</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-6 text-muted-foreground">
                No projects found
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr 
                key={project.id} 
                className="border-b border-border hover:bg-brand-purple/5 transition-colors"
              >
                <td className="p-3">
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground">{project.subtitle}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-brand-purple/20 text-brand-purple">
                    {project.category}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded-full bg-brand-purple/10 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-brand-purple/10 text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link 
                      to={`/portfolio/${project.id}`}
                      className="p-2 rounded-md bg-brand-purple/10 hover:bg-brand-purple/20 transition-colors"
                      target="_blank"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link 
                      to={`/admin/edit-project/${project.id}`}
                      className="p-2 rounded-md bg-brand-purple/10 hover:bg-brand-purple/20 transition-colors"
                    >
                      <Edit size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
