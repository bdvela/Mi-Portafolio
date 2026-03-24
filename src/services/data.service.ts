import { supabase } from '../lib/supabase';
import type { 
    HeroData, 
    ExperienceData, 
    ProjectData, 
    TestimonialData, 
    AboutData,
    GlobalSettings
} from '../models/portfolio';

export class PortfolioService {
    static async getHero(lang: string): Promise<HeroData | null> {
        const { data, error } = await supabase
            .from('hero')
            .select('*')
            .eq('lang', lang)
            .single();
        
        if (error) {
            console.error('Error fetching hero:', error);
            return null;
        }
        return data;
    }

    static async upsertHero(hero: HeroData): Promise<HeroData | null> {
        const { data, error } = await supabase
            .from('hero')
            .upsert(hero, { onConflict: 'lang' })
            .select()
            .single();
        
        if (error) {
            console.error('Error upserting hero:', error);
            return null;
        }
        return data;
    }

    static async getExperience(lang: string): Promise<ExperienceData[]> {
        const { data, error } = await supabase
            .from('experience')
            .select('*')
            .eq('lang', lang)
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Error fetching experience:', error);
            return [];
        }
        return data || [];
    }

    static async getAllExperience(): Promise<ExperienceData[]> {
        const { data, error } = await supabase
            .from('experience')
            .select('*')
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Error fetching all experience:', error);
            return [];
        }
        return data || [];
    }

    static async getExperienceById(id: string): Promise<ExperienceData | null> {
        const { data, error } = await supabase
            .from('experience')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error fetching experience by id:', error);
            return null;
        }
        return data;
    }

    static async getExperienceGroup(groupId: string): Promise<ExperienceData[]> {
        const { data, error } = await supabase
            .from('experience')
            .select('*')
            .eq('group_id', groupId);
        
        if (error) {
            console.error('Error fetching experience group:', error);
            return [];
        }
        return data || [];
    }

    static async getProjects(lang: string): Promise<ProjectData[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('lang', lang)
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
        return data || [];
    }

    static async getAllProjects(): Promise<ProjectData[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Error fetching all projects:', error);
            return [];
        }
        return data || [];
    }

    static async getTestimonials(lang: string): Promise<TestimonialData[]> {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('lang', lang)
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Error fetching testimonials:', error);
            return [];
        }
        return data || [];
    }

    static async getAllTestimonials(): Promise<TestimonialData[]> {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Error fetching all testimonials:', error);
            return [];
        }
        return data || [];
    }

    static async getTestimonialById(id: string): Promise<TestimonialData | null> {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error fetching testimonial by id:', error);
            return null;
        }
        return data;
    }

    static async getTestimonialGroup(groupId: string): Promise<TestimonialData[]> {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('group_id', groupId);
        
        if (error) {
            console.error('Error fetching testimonial group:', error);
            return [];
        }
        return data || [];
    }

    static async getAbout(lang: string): Promise<AboutData | null> {
        const { data, error } = await supabase
            .from('about')
            .select('*')
            .eq('lang', lang)
            .single();
        
        if (error) {
            console.error('Error fetching about:', error);
            return null;
        }
        return data;
    }

    static async getProjectById(id: string): Promise<ProjectData | null> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error fetching project by id:', error);
            return null;
        }
        return data;
    }

    static async getProjectGroup(groupId: string): Promise<ProjectData[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('group_id', groupId);
        
        if (error) {
            console.error('Error fetching project group:', error);
            return [];
        }
        return data || [];
    }

    // Mutations
    static async createProject(project: ProjectData): Promise<ProjectData | null> {
        const { data, error } = await supabase
            .from('projects')
            .insert([project])
            .select()
            .single();
        
        if (error) {
            console.error('Error creating project:', error);
            return null;
        }
        return data;
    }

    static async updateProject(id: string, project: Partial<ProjectData>): Promise<ProjectData | null> {
        const { data, error } = await supabase
            .from('projects')
            .update(project)
            .eq('id', id)
            .select()
            .single();
        
        if (error) {
            console.error('Error updating project:', error);
            return null;
        }
        return data;
    }

    static async deleteProject(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error deleting project:', error);
            return false;
        }
        return true;
    }

    static async deleteProjectGroup(groupId: string): Promise<boolean> {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('group_id', groupId);
        
        if (error) {
            console.error('Error deleting project group:', error);
            return false;
        }
        return true;
    }

    static async upsertExperience(experience: ExperienceData): Promise<ExperienceData | null> {
        const { data, error } = await supabase
            .from('experience')
            .upsert(experience)
            .select()
            .single();
        
        if (error) {
            console.error('Error upserting experience:', error);
            return null;
        }
        return data;
    }

    static async deleteExperience(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('experience')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error deleting experience:', error);
            return false;
        }
        return true;
    }

    static async deleteExperienceGroup(groupId: string): Promise<boolean> {
        const { error } = await supabase
            .from('experience')
            .delete()
            .eq('group_id', groupId);
        
        if (error) {
            console.error('Error deleting experience group:', error);
            return false;
        }
        return true;
    }

    static async upsertAbout(about: AboutData): Promise<AboutData | null> {
        const { data, error } = await supabase
            .from('about')
            .upsert(about, { onConflict: 'lang' })
            .select()
            .single();
        
        if (error) {
            console.error('Error upserting about:', error);
            return null;
        }
        return data;
    }

    static async upsertTestimonial(testimonial: TestimonialData): Promise<TestimonialData | null> {
        const { data, error } = await supabase
            .from('testimonials')
            .upsert(testimonial)
            .select()
            .single();
        
        if (error) {
            console.error('Error upserting testimonial:', error);
            return null;
        }
        return data;
    }

    static async deleteTestimonial(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error deleting testimonial:', error);
            return false;
        }
        return true;
    }

    static async deleteTestimonialGroup(groupId: string): Promise<boolean> {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('group_id', groupId);
        
        if (error) {
            console.error('Error deleting testimonial group:', error);
            return false;
        }
        return true;
    }

    static async uploadImage(file: File, folder: string = 'general'): Promise<string | null> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filePath);

        return publicUrl;
    }

    static async getDashboardStats(): Promise<{ projects: number, experience: number, testimonials: number }> {
        const [projects, experience, testimonials] = await Promise.all([
            supabase.from('projects').select('*', { count: 'exact', head: true }),
            supabase.from('experience').select('*', { count: 'exact', head: true }),
            supabase.from('testimonials').select('*', { count: 'exact', head: true })
        ]);

        return {
            projects: projects.count || 0,
            experience: experience.count || 0,
            testimonials: testimonials.count || 0
        };
    }

    static async getGlobalSettings(): Promise<GlobalSettings | null> {
        const { data, error } = await supabase
            .from('global_settings')
            .select('*')
            .limit(1)
            .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching settings:', error);
            return null;
        }
        return data;
    }

    static async upsertGlobalSettings(settings: GlobalSettings): Promise<GlobalSettings | null> {
        const { data, error } = await supabase
            .from('global_settings')
            .upsert({ ...settings, id: '00000000-0000-0000-0000-000000000000' })
            .select()
            .single();
        
        if (error) {
            console.error('Error upserting settings:', error);
            return null;
        }
        return data;
    }
}
