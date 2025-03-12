
import { ProfileData } from '@/types/profile';

export const getMockProfileData = (query: string): Promise<ProfileData> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substring(2, 9),
        query,
        basicInfo: {
          name: query.includes('@') ? query.split('@')[0] : query,
          emails: [
            query.includes('@') ? query : `${query.toLowerCase().replace(/\s/g, '.')}@gmail.com`,
            `${query.toLowerCase().replace(/\s/g, '_')}@outlook.com`,
          ],
          phoneNumbers: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
          avatar: '/placeholder.svg',
        },
        socialMedia: {
          linkedin: `https://linkedin.com/in/${query.toLowerCase().replace(/\s/g, '-')}`,
          twitter: `https://twitter.com/${query.toLowerCase().replace(/\s/g, '')}`,
          github: `https://github.com/${query.toLowerCase().replace(/\s/g, '')}`,
          venmo: `https://venmo.com/${query.toLowerCase().replace(/\s/g, '')}`,
        },
        businessInfo: {
          company: 'Acme Corporation',
          jobTitle: 'Senior Software Engineer',
          domains: [
            `${query.toLowerCase().replace(/\s/g, '')}.com`,
            `${query.toLowerCase().replace(/\s/g, '')}.io`,
          ],
        },
        location: {
          ipAddresses: ['192.168.1.1', '10.0.0.1'],
          approximateLocations: ['San Francisco, CA, USA', 'New York, NY, USA'],
        },
        darkWebMentions: {
          count: 3,
          samples: [
            'Email found in leaked database from Company X breach (2021)',
            'Username associated with forum discussion on Site Y (2019)',
            'Personal information potentially exposed in Service Z incident (2020)',
          ],
        },
        aiSummary: `Based on the available OSINT data, ${query} appears to be a technology professional based in the United States. They have digital footprints across multiple platforms including LinkedIn, Twitter, and GitHub, suggesting active participation in professional tech communities. The individual has connections to Acme Corporation as a Senior Software Engineer. 

Some potential security concerns include exposure in multiple data breaches, with personal information potentially available on dark web forums. The subject maintains multiple email accounts and has registered several domains, expanding their attack surface. Geographic analysis suggests presence primarily on the east and west coasts of the United States.

This individual would benefit from a security audit of their personal accounts, enabling two-factor authentication where possible, and monitoring for potential identity theft based on the leaked credentials.`,
      });
    }, 2000);
  });
};
