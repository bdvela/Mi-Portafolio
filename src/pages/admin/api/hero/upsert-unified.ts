import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { HeroData } from "@/models/portfolio";
import { supabase } from "@/lib/supabase";
import { TranslationService } from "@/services/translation.service";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    
    // Shared Metadata
    const statusAvailable = formData.get("status_available") === "on";
    const imageUrl = formData.get("image_url")?.toString();
    
    // Check for file uploads
    const heroImageFile = formData.get("hero_image") as File;

    let finalImageUrl = imageUrl;
    if (heroImageFile && heroImageFile.size > 0) {
        const uploadedUrl = await PortfolioService.uploadImage(heroImageFile, 'hero');
        if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    // Language Specific Data
    const esData = {
        short_description: formData.get("short_description_es")?.toString() || "",
        long_description: formData.get("long_description_es")?.toString() || "",
        cta_text: formData.get("cta_text_es")?.toString() || "",
        cta_link: formData.get("cta_link_es")?.toString() || "",
    };
    
    // Process Stats
    const stats_es = [];
    for (let i = 0; i < 3; i++) {
        stats_es.push({
            value: formData.get(`stat_value_${i}_es`)?.toString() || "",
            label: formData.get(`stat_label_${i}_es`)?.toString() || ""
        });
    }

    const enData = {
        short_description: formData.get("short_description_en")?.toString() || await TranslationService.translate(esData.short_description),
        long_description: formData.get("long_description_en")?.toString() || await TranslationService.translate(esData.long_description),
        cta_text: formData.get("cta_text_en")?.toString() || await TranslationService.translate(esData.cta_text),
        cta_link: formData.get("cta_link_en")?.toString() || esData.cta_link,
    };
    
    const stats_en = [];
    for (let i = 0; i < 3; i++) {
        stats_en.push({
            value: stats_es[i].value,
            label: formData.get(`stat_label_${i}_en`)?.toString() || await TranslationService.translate(stats_es[i].label)
        });
    }

    const heroEs: HeroData = {
        lang: "es",
        ...esData,
        image_url: finalImageUrl,
        cv_url: "", // Now handled by Global Settings
        status_available: statusAvailable,
        stats_json: stats_es
    };

    const heroEn: HeroData = {
        lang: "en",
        ...enData,
        image_url: finalImageUrl,
        cv_url: "", // Now handled by Global Settings
        status_available: statusAvailable,
        stats_json: stats_en
    };

    try {
        // Upsert both versions (Hero usually has 'lang' as a unique constraint or primary key pattern)
        // In HeroData, lang is used for upsert conflict resolution in PortfolioService.upsertHero
        const { error } = await supabase.from('hero').upsert([heroEs, heroEn], { onConflict: 'lang' });
        if (error) console.error('Error upserting hero:', error);
    } catch (e) {
        console.error('Exception in hero upsert-unified:', e);
    }

    return redirect("/admin/hero");
};
