
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import ProjectForm from '../../components/Admin/ProjectForm';
import useProjectStore from '@/store/projectStore';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const EditProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = useProjectStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    toast({
      title: "Project not found",
      description: "The requested project could not be found",
      variant: "destructive"
    });
    
    // Redirect to projects list
    setTimeout(() => {
      navigate('/admin/projects');
    }, 2000);
    
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground">Redirecting to projects list...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="text-muted-foreground">Update project details</p>
      </div>
      
      <ProjectForm initialProject={project} />
    </AdminLayout>
  );
};

export default EditProject;
