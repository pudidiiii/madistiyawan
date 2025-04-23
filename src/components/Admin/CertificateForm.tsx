
import React, { useState } from 'react';
import useProjectStore from '@/store/projectStore';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Award } from 'lucide-react';

const CertificateForm = () => {
  const { addCertificate } = useProjectStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    date: '',
    imageFile: null as File | null,
    imagePreview: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setFormData(prev => ({ 
          ...prev, 
          imageFile: file,
          imagePreview: event.target?.result as string
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.organization || !formData.date) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create certificate object
    const newCertificate = {
      id: uuidv4(),
      title: formData.title,
      organization: formData.organization,
      date: formData.date,
      imageUrl: formData.imagePreview || '/placeholder.svg'
    };
    
    // Add to store
    addCertificate(newCertificate);
    
    // Show success message
    toast({
      title: "Certificate added!",
      description: "Your certificate has been added successfully."
    });
    
    // Reset form
    setFormData({
      title: '',
      organization: '',
      date: '',
      imageFile: null,
      imagePreview: ''
    });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-6">
        <Award className="text-brand-purple mr-3" size={24} />
        <h3 className="text-2xl font-bold">Add Certificate</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Certificate Name <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple"
            placeholder="e.g. Full Stack Web Development"
            required
          />
        </div>
        
        <div>
          <label htmlFor="organization" className="block text-sm font-medium mb-2">
            Issuer <span className="text-red-500">*</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple"
            placeholder="e.g. Udemy, Coursera, University"
            required
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Issue Date <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="text"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple"
            placeholder="e.g. April 2023"
            required
          />
        </div>
        
        <div>
          <label htmlFor="certificateImage" className="block text-sm font-medium mb-2">
            Certificate Image
          </label>
          
          {formData.imagePreview ? (
            <div className="mb-4">
              <img 
                src={formData.imagePreview} 
                alt="Certificate preview" 
                className="w-full h-48 object-contain border border-brand-purple/20 rounded-lg" 
              />
              <button 
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, imageFile: null, imagePreview: '' }))}
                className="mt-2 text-red-500 text-sm hover:underline"
              >
                Remove image
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-brand-purple/20 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <Award className="text-brand-purple mb-2" size={40} />
                <p className="mb-4 text-sm text-muted-foreground">Upload your certificate image</p>
                <label className="cursor-pointer px-4 py-2 bg-brand-purple/20 text-brand-purple rounded-lg hover:bg-brand-purple/30 transition-colors">
                  Choose File
                  <input 
                    id="certificateImage"
                    name="certificateImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 gradient-bg text-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Add Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;
