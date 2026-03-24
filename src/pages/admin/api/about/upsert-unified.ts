import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { AboutData } from "@/models/portfolio";
import { supabase } from "@/lib/supabase";
import { TranslationService } from "@/services/translation.service";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    
    // Shared Metadata
    const profileImageUrl = formData.get("profile_image_url")?.toString();
    
    // Check for profile image upload
    const profileImageFile = formData.get("profile_image") as File;
    let finalProfileImageUrl = profileImageUrl;
    if (profileImageFile && profileImageFile.size > 0) {
        const uploadedUrl = await PortfolioService.uploadImage(profileImageFile, 'about');
        if (uploadedUrl) finalProfileImageUrl = uploadedUrl;
    }

    // Dynamic Skills Array
    const skills = [];
    let sIdx = 0;
    while (formData.has(`skill_key_${sIdx}`)) {
        skills.push({
            key: formData.get(`skill_key_${sIdx}`)?.toString() || "",
            label: formData.get(`skill_label_${sIdx}`)?.toString() || "",
            icon: formData.get(`skill_icon_${sIdx}`)?.toString() || "",
            color: formData.get(`skill_color_${sIdx}`)?.toString() || "blue"
        });
        sIdx++;
    }
    // Fallback if no dynamic fields (e.g. from old form or if loop failed)
    if (skills.length === 0) {
        skills.push(
            { key: "FRONTEND", label: formData.get("skill_frontend")?.toString() || "", icon: "mdi:palette-swatch-outline", color: "purple" },
            { key: "BACKEND", label: formData.get("skill_backend")?.toString() || "", icon: "mdi:xml", color: "blue" },
            { key: "SAP", label: formData.get("skill_sap")?.toString() || "", icon: "mdi:layers-triple-outline", color: "cyan" },
            { key: "UIUX", label: formData.get("skill_uiux")?.toString() || "", icon: "mdi:vector-bezier", color: "pink" }
        );
    }

    const highlights = {
        TROPHY: formData.get("high_trophy")?.toString() || "",
        TROPHY_SUB: formData.get("high_trophy_sub")?.toString() || "",
        DEGREE: formData.get("high_degree")?.toString() || "",
        DEGREE_SUB: formData.get("high_degree_sub")?.toString() || ""
    };

    const values = {
        FAITH_CODE: formData.get("val_faith")?.toString() || "",
        LOCATION: formData.get("val_location")?.toString() || ""
    };

    // Language Specific Data
    const bioEs = formData.get("biography_es")?.toString() || "";
    
    const aboutEs: AboutData = {
        lang: "es",
        description_1: bioEs,
        description_2: "",
        description_3: "",
        profile_image_url: finalProfileImageUrl,
        skills_json: skills as any,
        highlights_json: highlights as any,
        values_json: values as any
    };

    const aboutEn: AboutData = {
        lang: "en",
        description_1: await TranslationService.translate(bioEs),
        description_2: "",
        description_3: "",
        profile_image_url: finalProfileImageUrl,
        skills_json: skills as any,
        highlights_json: highlights as any,
        values_json: values as any
    };

    try {
        const { error } = await supabase.from('about').upsert([aboutEs, aboutEn], { onConflict: 'lang' });
        if (error) console.error('Error upserting about:', error);
    } catch (e) {
        console.error('Exception in about upsert-unified:', e);
    }

    return redirect("/admin/about");
};
