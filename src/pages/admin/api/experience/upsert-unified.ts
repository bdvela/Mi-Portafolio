import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { ExperienceData } from "@/models/portfolio";
import { supabase } from "@/lib/supabase";
import { TranslationService } from "@/services/translation.service";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    
    // IDs and Grouping
    let groupId = formData.get("group_id")?.toString();
    const idEs = formData.get("id_es")?.toString();
    const idEn = formData.get("id_en")?.toString();

    // Common Metadata
    const company = formData.get("company")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const current = formData.get("current") === "on";
    const orderIndex = parseInt(formData.get("order_index")?.toString() || "0");

    // Language Specific Data
    const esData = {
        title: formData.get("title_es")?.toString() || "",
        description: formData.get("description_es")?.toString() || "",
    };

    const enData = {
        title: formData.get("title_en")?.toString() || await TranslationService.translate(esData.title),
        description: formData.get("description_en")?.toString() || await TranslationService.translate(esData.description),
    };

    if (!groupId || groupId === "undefined" || groupId === "") {
        groupId = crypto.randomUUID();
    }

    const expEs: ExperienceData = {
        id: (idEs && idEs !== "undefined" && idEs !== "") ? idEs : crypto.randomUUID(),
        lang: "es",
        ...esData,
        company,
        date,
        link,
        current,
        order_index: orderIndex,
        group_id: groupId
    };

    const expEn: ExperienceData = {
        id: (idEn && idEn !== "undefined" && idEn !== "") ? idEn : crypto.randomUUID(),
        lang: "en",
        ...enData,
        company,
        date,
        link,
        current,
        order_index: orderIndex,
        group_id: groupId
    };

    try {
        const { error } = await supabase.from('experience').upsert([expEs, expEn]);
        if (error) console.error('Error upserting experience:', error);
    } catch (e) {
        console.error('Exception in experience upsert-unified:', e);
    }

    return redirect("/admin/experience");
};
