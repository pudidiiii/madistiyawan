
import React from 'react';
import { FileDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useProjectStore from '../../store/projectStore';

const StatCard = ({ icon, value, label, description }: { icon: React.ReactNode, value: number, label: string, description: string }) => (
  <div className="glass-card p-6 flex flex-col items-center md:items-start relative overflow-hidden group">
    <div className="bg-gradient-to-r from-brand-purple to-brand-blue mb-4 w-12 h-12 rounded-full flex items-center justify-center text-white">
      {icon}
    </div>
    <div className="text-4xl font-bold mb-2">{value}</div>
    <div className="text-lg font-semibold uppercase mb-1">{label}</div>
    <p className="text-sm text-muted-foreground">{description}</p>
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowRight className="text-brand-purple" size={20} />
    </div>
  </div>
);

const AboutSection = () => {
  const { getProjectsCount, getCertificatesCount, getYearsOfExperience } = useProjectStore();

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            ✨ Transforming ideas into digital experiences ✨
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border-2 border-brand-purple/30 relative z-10 shadow-xl">
              <img 
                src="/lovable-uploads/0d53030b-3b7b-42f6-9588-2aff693d63a0.png" 
                alt="Muhammad Adi Stiyawan" 
                className="w-full h-auto object-cover"
                style={{
                  boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
                }}
              />
            </div>
            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded-2xl border-2 border-brand-blue/30 -z-0"></div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-2/3 h-2/3 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-2xl blur-md"></div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Hello, I'm <span className="gradient-text">Muhammad Adi Stiyawan</span>
            </h3>
            
            <p className="text-lg mb-6 text-muted-foreground">
              Seorang mahasiswa Multimedia Broadcasting yang tertarik dalam dunia kreatif. Saya berfokus pada menciptakan konten yang menarik dan selalu
              berusaha memberikan solusi terbaik dalam setiap proyek, baik itu dalam pembuatan video, desain grafis, atau produksi media lainnya.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 rounded-full bg-brand-purple/20 text-brand-purple">Adobe Illustrator</span>
              <span className="px-4 py-2 rounded-full bg-brand-blue/20 text-brand-blue">Adobe Premier Pro</span>
              <span className="px-4 py-2 rounded-full bg-brand-purple/20 text-brand-purple">Adobe Photoshop</span>
              <span className="px-4 py-2 rounded-full bg-brand-blue/20 text-brand-blue">Figma</span>
              <span className="px-4 py-2 rounded-full bg-brand-purple/20 text-brand-purple">Capcut</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href="/lovable-uploads/12a53b43-c69f-4134-bc0f-c2acbc5235aa.png" 
                download="Muhammad_Adi_Stiyawan_CV.png" 
                className="px-6 py-3 rounded-lg gradient-bg text-white font-medium hover:opacity-90 transition-opacity flex items-center"
              >
                <FileDown size={18} className="mr-2" /> Download CV
              </a>
              
              <Link 
                to="/portfolio" 
                className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center"
              >
                View Projects <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 15H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 18H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            value={getProjectsCount()}
            label="Total Projects"
            description="Innovative design solutions crafted"
          />
          
          <StatCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 7L12 13L21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            value={getCertificatesCount()}
            label="Certificates"
            description="Professional skills validated"
          />
          
          <StatCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            value={getYearsOfExperience()}
            label="Years of Experience"
            description="Continuous learning journey"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
