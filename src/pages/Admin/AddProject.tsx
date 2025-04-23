
import React from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import ProjectForm from '../../components/Admin/ProjectForm';

const AddProject = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add Project</h1>
        <p className="text-muted-foreground">Create a new portfolio project</p>
      </div>
      
      <ProjectForm />
    </AdminLayout>
  );
};

export default AddProject;
