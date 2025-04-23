
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import useProjectStore from '../../store/projectStore';
import { MessageSquare, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/types';

const Comments = () => {
  const { comments, deleteComment } = useProjectStore();
  const { toast } = useToast();
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Reference to store interval ID for cleanup
  const pollingIntervalRef = useRef<number | null>(null);

  // Effect to sync comments from store and set up polling
  useEffect(() => {
    setLocalComments(comments);
    
    // Set up polling for new comments every 3 seconds
    pollingIntervalRef.current = window.setInterval(() => {
      // This will update the local state with the latest comments
      const latestComments = useProjectStore.getState().comments;
      
      // Only update if there are changes
      if (JSON.stringify(latestComments) !== JSON.stringify(localComments)) {
        console.log("Admin: Comments updated via polling");
        setLocalComments(latestComments);
      }
    }, 3000);
    
    return () => {
      if (pollingIntervalRef.current) {
        window.clearInterval(pollingIntervalRef.current);
      }
    };
  }, [comments]);

  const handleDelete = (commentId: string, commenterName: string) => {
    if (window.confirm(`Are you sure you want to delete this comment from ${commenterName}?`)) {
      deleteComment(commentId);
      setLocalComments(prev => prev.filter(comment => comment.id !== commentId));
      toast({
        title: "Comment deleted",
        description: `The comment has been deleted successfully.`,
      });
    }
  };

  const refreshComments = () => {
    setIsRefreshing(true);
    // Get latest comments from store
    const latestComments = useProjectStore.getState().comments;
    setLocalComments(latestComments);
    
    toast({
      title: "Comments refreshed",
      description: `Loaded ${latestComments.length} comments.`,
    });
    
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Comments</h1>
          <p className="text-muted-foreground">Manage visitor comments</p>
        </div>
        <button 
          onClick={refreshComments}
          disabled={isRefreshing}
          className="px-4 py-2 flex items-center bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-purple rounded-lg transition-colors"
        >
          <RefreshCw size={18} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-brand-purple mr-3" size={24} />
          <h3 className="text-2xl font-bold">All Comments ({localComments.length})</h3>
        </div>

        {localComments.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No comments yet. Comments from visitors will appear here.
          </div>
        ) : (
          <div className="space-y-6">
            {localComments.map(comment => (
              <div 
                key={comment.id} 
                className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative"
              >
                <div className="flex space-x-3">
                  {comment.profilePhoto ? (
                    <img 
                      src={comment.profilePhoto} 
                      alt={comment.name} 
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple flex-shrink-0">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h5 className="font-medium text-lg">{comment.name}</h5>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString()} at {new Date(comment.date).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{comment.message}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDelete(comment.id, comment.name)}
                  className="absolute top-4 right-4 p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Delete Comment"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Comments;
