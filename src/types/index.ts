export interface Project {
    title: string;
    subtitle: string;
    description: string;
    link: string;
    image: string;
    tags: string[];
    featured?: boolean;
    new?: boolean;
    gradient: string;
    github?: string;
}

export interface ExperienceItem {
    date: string;
    title: string;
    company: string;
    description: string;
    current?: boolean;
    link?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}
