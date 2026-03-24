export interface HeroData {
    id?: string;
    lang: string;
    short_description: string;
    long_description: string;
    cta_text: string;
    cta_link: string;
    cv_url: string;
    status_available: boolean;
    image_url?: string;
    stats_json?: any;
}

export interface ExperienceData {
    id?: string;
    lang: string;
    title: string;
    company: string;
    date: string;
    description: string;
    current: boolean;
    link?: string;
    order_index?: number;
    group_id?: string;
}

export interface ProjectData {
    id?: string;
    lang: string;
    title: string;
    subtitle: string;
    description: string;
    link: string;
    image: string;
    tags: string[];
    featured?: boolean;
    is_new?: boolean;
    github?: string;
    gradient?: string;
    order_index: number;
    group_id?: string;
}

export interface TestimonialData {
    id?: string;
    lang: string;
    author: string;
    company: string;
    review: string;
    order_index: number;
    group_id?: string;
}

export interface AboutData {
    id?: string;
    lang: string;
    description_1: string;
    description_2: string;
    description_3: string;
    skills_json?: any;
    highlights_json?: any;
    values_json?: any;
    profile_image_url?: string;
}

export interface GlobalSettings {
    id?: string;
    email: string;
    brand_name?: string;
    phone: string;
    whatsapp_url: string;
    linkedin_url: string;
    github_url: string;
    instagram_url?: string;
    facebook_url?: string;
    resume_url?: string; // Legacy/Fallback
    resume_url_es?: string;
    resume_url_en?: string;
}
