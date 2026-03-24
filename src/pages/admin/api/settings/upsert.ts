import type { APIRoute } from 'astro';
import { PortfolioService } from '@/services/data.service';
import type { GlobalSettings } from '@/models/portfolio';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        
        const email = formData.get("email")?.toString() || "";
        const brand_name = formData.get("brand_name")?.toString() || "bdvela";
        const phone = formData.get("phone")?.toString() || "";
        const whatsapp_url = formData.get("whatsapp_url")?.toString() || "";
        const linkedin_url = formData.get("linkedin_url")?.toString() || "";
        const github_url = formData.get("github_url")?.toString() || "";
        const instagram_url = formData.get("instagram_url")?.toString() || "";
        const facebook_url = formData.get("facebook_url")?.toString() || "";

        // CV / Resume Handling (Multilingual)
        const resume_url_es = formData.get("resume_url_es")?.toString() || "";
        const resume_url_en = formData.get("resume_url_en")?.toString() || "";
        const cvFileEs = formData.get("resume_file_es") as File;
        const cvFileEn = formData.get("resume_file_en") as File;

        let finalResumeUrlEs = resume_url_es;
        if (cvFileEs && cvFileEs.size > 0) {
            const uploadedUrl = await PortfolioService.uploadImage(cvFileEs, 'CV_ES');
            if (uploadedUrl) finalResumeUrlEs = uploadedUrl;
        }

        let finalResumeUrlEn = resume_url_en;
        if (cvFileEn && cvFileEn.size > 0) {
            const uploadedUrl = await PortfolioService.uploadImage(cvFileEn, 'CV_EN');
            if (uploadedUrl) finalResumeUrlEn = uploadedUrl;
        }
        
        const settings: GlobalSettings = {
            id: '00000000-0000-0000-0000-000000000000',
            brand_name,
            email,
            phone,
            whatsapp_url,
            linkedin_url,
            github_url,
            instagram_url,
            facebook_url,
            resume_url_es: finalResumeUrlEs,
            resume_url_en: finalResumeUrlEn
        };

        const result = await PortfolioService.upsertGlobalSettings(settings);

        if (!result) {
            return new Response(JSON.stringify({ error: "Error al guardar configuraciones" }), { status: 500 });
        }

        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/admin/settings?success=true"
            }
        });
    } catch (error) {
        console.error("Settings Upsert Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
