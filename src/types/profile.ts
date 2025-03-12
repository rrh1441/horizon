
export interface ProfileData {
  id: string;
  query: string;
  basicInfo: {
    name?: string;
    emails: string[];
    phoneNumbers: string[];
    avatar?: string;
  };
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
    venmo?: string;
  };
  businessInfo: {
    company?: string;
    jobTitle?: string;
    domains: string[];
  };
  location: {
    ipAddresses: string[];
    approximateLocations: string[];
  };
  darkWebMentions: {
    count: number;
    samples: string[];
  };
  aiSummary: string;
}

export interface DataSection {
  id: string;
  title: string;
  icon: JSX.Element;
  data: any;
}
