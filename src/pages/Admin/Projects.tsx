
import React from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import ProjectsTable from '../../components/Admin/ProjectsTable';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const Projects = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        
        <Link
          to="/admin/add-project"
          className="px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Project
        </Link>
      </div>
      
      <ProjectsTable />
    </AdminLayout>
  );
};

export default Projects;
