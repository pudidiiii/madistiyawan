
import React, { useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import useProjectStore from '../../store/projectStore';
import { Folder, Award, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, value, label, color }: { 
  icon: React.ReactNode; 
  value: number | string; 
  label: string;
  color: string;
}) => (
  <div className="glass-card p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { getSortedProjects, getProjectsCount, getCertificatesCount, getCommentsCount, getYearsOfExperience } = useProjectStore();
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const visibleProjects = showAllProjects ? getSortedProjects() : getSortedProjects(5);
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your portfolio admin panel</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Folder size={24} />} 
          value={getProjectsCount()} 
          label="Total Projects" 
          color="bg-brand-purple/20 text-brand-purple"
        />
        <StatCard 
          icon={<Award size={24} />} 
          value={getCertificatesCount()} 
          label="Certificates" 
          color="bg-brand-blue/20 text-brand-blue"
        />
        <StatCard 
          icon={<Clock size={24} />} 
          value={getYearsOfExperience()} 
          label="Years Experience" 
          color="bg-brand-purple/20 text-brand-purple"
        />
        <StatCard 
          icon={<Users size={24} />} 
          value={getCommentsCount()} 
          label="Comments" 
          color="bg-brand-blue/20 text-brand-blue"
        />
      </div>
      
      <div className="glass-card p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Projects</h2>
          <Link 
            to="/admin/add-project"
            className="px-4 py-2 rounded-lg bg-brand-purple text-white text-sm hover:bg-opacity-90 transition-colors"
          >
            Add Project
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-3 py-3">Project</th>
                <th className="text-left px-3 py-3">Category</th>
                <th className="text-left px-3 py-3">Technologies</th>
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map((project) => (
                <tr 
                  key={project.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="px-3 py-3">
                    <div>
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground">{project.subtitle}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-brand-purple/20 text-brand-purple">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {getProjectsCount() > 5 && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setShowAllProjects(prev => !prev)}
                className="flex items-center text-brand-purple hover:text-brand-purple/80 transition-colors"
              >
                {showAllProjects ? (
                  <>
                    <span className="mr-1">Show Less</span>
                    <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    <span className="mr-1">Show More</span>
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
