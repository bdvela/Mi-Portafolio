import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { TestimonialData } from "@/models/portfolio";
import { supabase } from "@/lib/supabase";
import { TranslationService } from "@/services/translation.service";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    
    // IDs and Grouping
    let groupId = formData.get("group_id")?.toString();
    const idEs = formData.get("id_es")?.toString();
    const idEn = formData.get("id_en")?.toString();

    // Common Metadata
    const author = formData.get("author")?.toString() || "";
    const company = formData.get("company")?.toString() || "";
    const orderIndex = parseInt(formData.get("order_index")?.toString() || "0");

    // Language Specific Data
    const reviewEs = formData.get("review_es")?.toString() || "";
    const reviewEn = formData.get("review_en")?.toString() || await TranslationService.translate(reviewEs);

    if (!groupId || groupId === "undefined" || groupId === "") {
        groupId = crypto.randomUUID();
    }

    const testEs: TestimonialData = {
        id: (idEs && idEs !== "undefined" && idEs !== "") ? idEs : crypto.randomUUID(),
        lang: "es",
        author,
        company,
        review: reviewEs,
        order_index: orderIndex,
        group_id: groupId
    };

    const testEn: TestimonialData = {
        id: (idEn && idEn !== "undefined" && idEn !== "") ? idEn : crypto.randomUUID(),
        lang: "en",
        author,
        company,
        review: reviewEn,
        order_index: orderIndex,
        group_id: groupId
    };

    try {
        const { error } = await supabase.from('testimonials').upsert([testEs, testEn]);
        if (error) console.error('Error upserting testimonials:', error);
    } catch (e) {
        console.error('Exception in testimonials upsert-unified:', e);
    }

    return redirect("/admin/testimonials");
};
