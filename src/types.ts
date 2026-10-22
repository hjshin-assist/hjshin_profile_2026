export interface StageInfo {
  stage: 'before' | 'plan' | 'final';
  title: string;
  description: string;
  keyPoints: string[];
  imageUrl?: string;
  imageFallbacks?: string[];
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  stages: StageInfo[];
}

export interface ProjectItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  role: string;
  description: string;
  impacts: string[];
  features?: string[];
  techStack?: string[];
  category: 'automation' | 'content' | 'product' | 'brand';
  isHighlighted?: boolean;
  outcome?: string;
  demoUrl?: string;
  imageUrl?: string;
  imageFallbacks?: string[];
  images?: string[];
  imagesFallbacks?: string[][];
  browserMockupTitle?: string;
  browserMockupSubtitle?: string;
  champCategories?: ProjectCategory[];
}

export interface CareerItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level: string;
    description: string;
  }[];
}
