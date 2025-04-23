import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import useProjectStore from '@/store/projectStore';
import { Project } from '@/types';
import { Upload, X, Link as LinkIcon, Github } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ProjectFormProps {
  initialProject?: Project;
}

const ProjectForm = ({ initialProject }: ProjectFormProps) => {
  const { toast } = useToast();
  const { addProject, updateProject } = useProjectStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = !!initialProject;
  
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    subtitle: '',
    category: 'UI/UX Design',
    description: '',
    imageUrl: '/placeholder.svg',
    technologies: [],
    features: [],
    mediaType: 'image',
    demoUrl: '',
    githubUrl: ''
  });
  const [technology, setTechnology] = useState('');
  const [feature, setFeature] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    if (initialProject) {
      setFormData({
        title: initialProject.title,
        subtitle: initialProject.subtitle,
        category: initialProject.category,
        description: initialProject.description,
        imageUrl: initialProject.imageUrl,
        technologies: initialProject.technologies || [],
        features: initialProject.features || [],
        mediaType: initialProject.mediaType || 'image',
        demoUrl: initialProject.demoUrl || '',
        githubUrl: initialProject.githubUrl || ''
      });
      
      if (initialProject.imageUrl && initialProject.imageUrl !== '/placeholder.svg') {
        setFilePreview(initialProject.imageUrl);
      }
    }
  }, [initialProject]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast({
        title: "Invalid file",
        description: "Please upload an image or video file",
        variant: "destructive"
      });
      return;
    }
    
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
    
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      
      setFormData(prev => ({ 
        ...prev, 
        imageUrl: objectUrl,
        mediaType: isImage ? 'image' : 'video'
      }));
      
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }, 1500);
  };
  
  const removeFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFilePreview(null);
    setFormData(prev => ({
      ...prev,
      imageUrl: '/placeholder.svg',
      mediaType: 'image'
    }));
  };
  
  const addTechnology = () => {
    if (technology.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()]
      }));
      setTechnology('');
    }
  };
  
  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };
  
  const addFeature = () => {
    if (feature.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), feature.trim()]
      }));
      setFeature('');
    }
  };
  
  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subtitle || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (isEditing && initialProject) {
      const updatedProject: Project = {
        ...formData,
        id: initialProject.id
      };
      
      updateProject(updatedProject);
      
      toast({
        title: "Success!",
        description: "Project has been updated successfully",
      });
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData
      };
      
      addProject(newProject);
      
      setFormData({
        title: '',
        subtitle: '',
        category: 'UI/UX Design',
        description: '',
        imageUrl: '/placeholder.svg',
        technologies: [],
        features: [],
        mediaType: 'image',
        demoUrl: '',
        githubUrl: ''
      });
      setFilePreview(null);
      
      toast({
        title: "Success!",
        description: "Project has been added successfully",
      });
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-brand-purple"
              placeholder="Enter project title"
            />
          </div>
          
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium mb-2">
              Project Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-brand-purple"
              placeholder="Enter project subtitle"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-brand-purple"
          >
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Video">Video</option>
            <option value="Certificate">Certificate</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-brand-purple resize-none"
            placeholder="Enter project description"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Technologies</label>
          <div className="flex">
            <input
              type="text"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-l-lg focus:outline-none focus:border-brand-purple"
              placeholder="Add technology (e.g., React)"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-3 bg-brand-purple text-white rounded-r-lg hover:bg-brand-purple/80 transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-brand-purple/10 text-sm py-1 px-3 rounded-full flex items-center"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="ml-2 text-foreground/70 hover:text-foreground transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Features</label>
          <div className="flex">
            <input
              type="text"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-l-lg focus:outline-none focus:border-brand-purple"
              placeholder="Add project feature"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-3 bg-brand-purple text-white rounded-r-lg hover:bg-brand-purple/80 transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="mt-3 space-y-2">
            {formData.features?.map((feat, index) => (
              <div 
                key={index} 
                className="bg-brand-purple/10 text-sm py-2 px-3 rounded-lg flex items-center justify-between"
              >
                {feat}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Media <span className="text-red-500">*</span>
          </label>
          
          <div className="mt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,video/*"
            />
            
            {!filePreview ? (
              <div 
                onClick={handleFileSelect}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-brand-purple transition-colors"
              >
                <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">Upload a file</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Drag and drop or click to upload an image or video
                </p>
                <p className="mt-1 text-xs text-muted-foreground font-semibold">
                  Maximum file size: 5MB
                </p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-border">
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-75 z-10">
                    <div className="loader" style={{ width: '30px', height: '30px' }}></div>
                  </div>
                )}
                
                {formData.mediaType === 'image' ? (
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-contain bg-muted"
                  />
                ) : (
                  <video 
                    src={filePreview}
                    controls
                    className="w-full h-64 object-contain bg-muted"
                  />
                )}
                
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 p-1 bg-background rounded-full shadow-md hover:bg-destructive hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="demoUrl" className="block text-sm font-medium mb-2">
              Live Demo URL
            </label>
            <div className="flex">
              <div className="bg-brand-purple/10 px-3 py-3 rounded-l-lg flex items-center">
                <LinkIcon size={16} className="text-brand-purple" />
              </div>
              <input
                type="url"
                id="demoUrl"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-r-lg focus:outline-none focus:border-brand-purple"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
              GitHub URL
            </label>
            <div className="flex">
              <div className="bg-brand-purple/10 px-3 py-3 rounded-l-lg flex items-center">
                <Github size={16} className="text-brand-purple" />
              </div>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-r-lg focus:outline-none focus:border-brand-purple"
                placeholder="https://github.com/username/repository"
              />
            </div>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="px-6 py-3 gradient-bg text-foreground font-medium rounded-lg hover:opacity-90 transition-opacity w-full md:w-auto"
          >
            {isEditing ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
