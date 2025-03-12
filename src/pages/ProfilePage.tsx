
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  Download,
  Briefcase,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';
import Layout from '@/components/Layout';
import ProfileSection from '@/components/ProfileSection';
import { ProfileSkeleton } from '@/components/SkeletonLoader';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { getMockProfileData } from '@/utils/mockData';
import { ProfileData } from '@/types/profile';

const ProfilePage = () => {
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (!query) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMockProfileData(decodeURIComponent(query));
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast({
          title: 'Error fetching profile data',
          description: 'Please try again later',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, navigate]);

  const handleGenerateReport = () => {
    toast({
      title: 'Report Generation Started',
      description: 'Your report will be ready for download shortly',
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: 'Report Ready',
        description: 'Your report has been generated and is ready for download',
      });
    }, 2000);
  };

  if (isLoading) {
    return (
      <Layout>
        <ProfileSkeleton />
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No results found</h2>
          <p className="text-gray-400 mb-8">
            We couldn't find any information for "{query}". Please try a different search.
          </p>
          <Button onClick={() => navigate('/')}>Return to Search</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="section-card mb-8 animate-in">
          <div className="flex items-start md:items-center flex-col md:flex-row md:space-x-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center mb-4 md:mb-0">
              <User size={32} className="text-white/60" />
            </div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {profile.basicInfo.name || 'Unknown Subject'}
              </h1>
              <div className="text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-2">
                {profile.businessInfo.jobTitle && (
                  <span className="flex items-center">
                    <Briefcase size={14} className="mr-1" />
                    {profile.businessInfo.jobTitle}
                  </span>
                )}
                {profile.businessInfo.company && (
                  <span>at {profile.businessInfo.company}</span>
                )}
                {profile.location.approximateLocations[0] && (
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {profile.location.approximateLocations[0]}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 ml-auto">
              <Button
                onClick={handleGenerateReport}
                className="flex items-center space-x-2"
              >
                <FileText size={16} />
                <span>Generate Report</span>
              </Button>
            </div>
          </div>
        </div>
        
        <ProfileSection 
          title="Identity Information" 
          icon={<User size={20} />} 
          defaultOpen={true}
          delay={100}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Email Addresses</h4>
              <ul className="space-y-2">
                {profile.basicInfo.emails.map((email, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{email}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Phone Numbers</h4>
              <ul className="space-y-2">
                {profile.basicInfo.phoneNumbers.map((phone, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{phone}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ProfileSection>
        
        <ProfileSection 
          title="Social Media Presence" 
          icon={<Globe size={20} />}
          delay={200}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profile.socialMedia).map(([platform, url]) => {
              if (!url) return null;
              
              let icon;
              switch (platform) {
                case 'linkedin':
                  icon = <Linkedin size={16} className="text-gray-400" />;
                  break;
                case 'twitter':
                  icon = <Twitter size={16} className="text-gray-400" />;
                  break;
                case 'github':
                  icon = <Github size={16} className="text-gray-400" />;
                  break;
                default:
                  icon = <Globe size={16} className="text-gray-400" />;
              }
              
              return (
                <div key={platform}>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 capitalize">
                    {platform}
                  </h4>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {icon}
                    <span className="truncate">{url}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </ProfileSection>
        
        <ProfileSection 
          title="Business & Web Presence" 
          icon={<Briefcase size={20} />}
          delay={300}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Company</h4>
              <p>{profile.businessInfo.company || 'Unknown'}</p>
              
              <h4 className="text-sm font-medium text-gray-400 mt-4 mb-2">Job Title</h4>
              <p>{profile.businessInfo.jobTitle || 'Unknown'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Domains</h4>
              <ul className="space-y-2">
                {profile.businessInfo.domains.map((domain, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Globe size={16} className="text-gray-400" />
                    <span>{domain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ProfileSection>
        
        <ProfileSection 
          title="Geolocation Details" 
          icon={<MapPin size={20} />}
          delay={400}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">IP Addresses</h4>
              <ul className="space-y-2">
                {profile.location.ipAddresses.map((ip, index) => (
                  <li key={index}>{ip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Approximate Locations</h4>
              <ul className="space-y-2">
                {profile.location.approximateLocations.map((location, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{location}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ProfileSection>
        
        <ProfileSection 
          title="Dark Web Mentions" 
          icon={<AlertTriangle size={20} />}
          delay={500}
        >
          <div>
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/40 text-red-300">
                {profile.darkWebMentions.count} Mentions Found
              </span>
            </div>
            
            <h4 className="text-sm font-medium text-gray-400 mb-2">Samples</h4>
            <ul className="space-y-3">
              {profile.darkWebMentions.samples.map((mention, index) => (
                <li key={index} className="p-3 bg-red-900/20 rounded-md">
                  {mention}
                </li>
              ))}
            </ul>
          </div>
        </ProfileSection>
        
        <ProfileSection 
          title="AI-Generated Summary" 
          icon={<FileText size={20} />}
          delay={600}
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-sm text-gray-400 mb-4">
              Based on collected OSINT data, our AI has generated the following analysis:
            </p>
            <div className="bg-white/5 p-4 rounded-md whitespace-pre-line">
              {profile.aiSummary}
            </div>
          </div>
        </ProfileSection>
      </div>
    </Layout>
  );
};

export default ProfilePage;
