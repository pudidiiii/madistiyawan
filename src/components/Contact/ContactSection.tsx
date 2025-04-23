
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData, Comment } from '@/types';
import useProjectStore from '@/store/projectStore';
import emailjs from '@emailjs/browser';

// Props interface for ContactSection
interface ContactSectionProps {
  emailServiceId: string;
  emailTemplateId: string;
  emailPublicKey: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  emailServiceId,
  emailTemplateId,
  emailPublicKey
}) => {
  const { toast } = useToast();
  const { comments, addComment, getCommentsCount } = useProjectStore();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
    profilePhoto: null as File | null
  });
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  
  // Reference to store interval ID for cleanup
  const pollingIntervalRef = useRef<number | null>(null);
  
  // Effect to sync comments from store initially and set up polling
  useEffect(() => {
    // Initial load of comments
    setLocalComments(comments);
    
    console.log("Initial comments load:", comments);
    
    // Set up more frequent polling (every 3 seconds) for real-time updates
    pollingIntervalRef.current = window.setInterval(() => {
      const latestComments = useProjectStore.getState().comments;
      
      // Only update if there are changes
      if (JSON.stringify(latestComments) !== JSON.stringify(localComments)) {
        console.log("Comments updated via polling:", latestComments);
        setLocalComments(latestComments);
      }
    }, 3000); // Poll every 3 seconds for more responsive updates
    
    // Clean up interval on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        window.clearInterval(pollingIntervalRef.current);
      }
    };
  }, [comments]);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image less than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setCommentForm(prev => ({ ...prev, profilePhoto: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Sending email with EmailJS...");
      console.log("Service ID:", emailServiceId);
      console.log("Template ID:", emailTemplateId);
      
      // Use EmailJS to send email directly without opening mail client
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Muhammad Adi Stiyawan",
        reply_to: formData.email,
      };
      
      const response = await emailjs.send(
        emailServiceId,
        emailTemplateId,
        templateParams,
        emailPublicKey
      );
      
      console.log("Email sent successfully:", response);
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Email error:", error);
      toast({
        title: "Failed to send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.name || !commentForm.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name and message",
        variant: "destructive"
      });
      return;
    }
    
    // Create new comment
    const newComment: Comment = {
      id: Date.now().toString(),
      name: commentForm.name,
      message: commentForm.message,
      profilePhoto: profilePhotoPreview || undefined,
      date: new Date().toISOString()
    };
    
    console.log("Adding new comment to store:", newComment);
    
    // Add comment to store
    addComment(newComment);
    
    // Update local state immediately
    setLocalComments(prev => [newComment, ...prev]);
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
    
    // Reset form
    setCommentForm({ name: '', message: '', profilePhoto: null });
    setProfilePhotoPreview(null);
    
    // Force another poll immediately to ensure other users see the new comment
    const latestComments = useProjectStore.getState().comments;
    console.log("Latest comments after adding:", latestComments);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Contact Form */}
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center mb-6">
              <Share2 className="text-brand-purple mr-3" size={24} />
              <h3 className="text-2xl font-bold">Get in Touch</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Have something to discuss? Send me a message and let's talk.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                Your message will be sent to: <span className="font-medium">madistiyawan@gmail.com</span>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 gradient-bg text-foreground font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <span className="loader-small mr-2"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right side: Comments */}
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-brand-purple mr-3" size={24} />
              <h3 className="text-2xl font-bold">Comments ({getCommentsCount()})</h3>
            </div>
            
            <form onSubmit={handleCommentSubmit} className="space-y-6 mb-8">
              <div>
                <label htmlFor="commentName" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="commentName"
                  name="name"
                  value={commentForm.name}
                  onChange={handleCommentChange}
                  required
                  className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="commentMessage" className="block text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="commentMessage"
                  name="message"
                  value={commentForm.message}
                  onChange={handleCommentChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg focus:outline-none focus:border-brand-purple resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Photo (optional)
                </label>
                
                <div className="mt-2">
                  {profilePhotoPreview ? (
                    <div className="flex items-center space-x-4">
                      <img 
                        src={profilePhotoPreview} 
                        alt="Profile preview" 
                        className="w-16 h-16 rounded-full object-cover border border-brand-purple/20" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProfilePhotoPreview(null);
                          setCommentForm(prev => ({...prev, profilePhoto: null}));
                        }}
                        className="text-sm text-destructive hover:underline"
                      >
                        Remove photo
                      </button>
                    </div>
                  ) : (
                    <>
                      <label 
                        htmlFor="profilePhoto" 
                        className="flex items-center justify-center px-4 py-3 border border-dashed border-brand-purple/30 rounded-lg cursor-pointer hover:bg-brand-purple/5 transition-colors"
                      >
                        <span className="text-brand-purple mr-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        Choose Profile Photo
                      </label>
                      <input 
                        id="profilePhoto" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground text-center">Max file size: 5MB</p>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 gradient-bg text-foreground font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <MessageSquare size={18} className="mr-2" />
                Post Comment
              </button>
            </form>
            
            {/* Comments List */}
            <div className="space-y-6 mt-8">
              <h4 className="font-semibold text-lg border-b border-brand-purple/20 pb-2">Recent Comments</h4>
              
              {localComments.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                <div className="space-y-6">
                  {localComments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                      {comment.profilePhoto ? (
                        <img 
                          src={comment.profilePhoto} 
                          alt={comment.name} 
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple flex-shrink-0">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="flex items-baseline">
                          <h5 className="font-medium">{comment.name}</h5>
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
