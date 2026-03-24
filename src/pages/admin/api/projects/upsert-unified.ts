import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { ProjectData } from "@/models/portfolio";
import { supabase } from "@/lib/supabase";
import { TranslationService } from "@/services/translation.service";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    
    // IDs and Grouping
    let groupId = formData.get("group_id")?.toString();
    const idEs = formData.get("id_es")?.toString();
    const idEn = formData.get("id_en")?.toString();

    // Common Metadata
    const link = formData.get("link")?.toString() || "";
    const github = formData.get("github")?.toString() || "";
    const tagsString = formData.get("tags")?.toString() || "";
    const featured = formData.get("featured") === "on";
    const isNewFlag = formData.get("is_new") === "on";
    const orderIndex = parseInt(formData.get("order_index")?.toString() || "0");

    // Handle Image Upload (Shared)
    const imageFile = formData.get("image_file") as File;
    let imageUrl = formData.get("image_url")?.toString() || "";
    const currentImage = formData.get("current_image")?.toString() || "";

    if (imageFile && imageFile.size > 0) {
        const uploadedUrl = await PortfolioService.uploadImage(imageFile, "projects");
        if (uploadedUrl) {
            imageUrl = uploadedUrl;
        }
    } else {
        imageUrl = imageUrl || currentImage;
    }

    const tags = tagsString.split(",").map(t => t.trim()).filter(t => t !== "");

    // Language Specific Data
    const esData = {
        title: formData.get("title_es")?.toString() || "",
        subtitle: formData.get("subtitle_es")?.toString() || "",
        description: formData.get("description_es")?.toString() || "",
    };

    const enData = {
        title: formData.get("title_en")?.toString() || await TranslationService.translate(esData.title),
        subtitle: formData.get("subtitle_en")?.toString() || await TranslationService.translate(esData.subtitle),
        description: formData.get("description_en")?.toString() || await TranslationService.translate(esData.description),
    };

    // If no groupId (new project), we insert BOTH, otherwise we update BOTH
    if (!groupId || groupId === "undefined") {
        groupId = crypto.randomUUID();
    }

    const projectEs: ProjectData = {
        id: (idEs && idEs !== "undefined" && idEs !== "") ? idEs : crypto.randomUUID(),
        lang: "es",
        ...esData,
        link,
        github,
        image: imageUrl,
        tags,
        featured,
        is_new: isNewFlag,
        order_index: orderIndex,
        group_id: groupId
    };

    const projectEn: ProjectData = {
        id: (idEn && idEn !== "undefined" && idEn !== "") ? idEn : crypto.randomUUID(),
        lang: "en",
        ...enData,
        link,
        github,
        image: imageUrl,
        tags,
        featured,
        is_new: isNewFlag,
        order_index: orderIndex,
        group_id: groupId
    };

    try {
        const { error } = await supabase.from('projects').upsert([projectEs, projectEn]);
        if (error) {
            console.error('Error upserting projects:', error);
        }
    } catch (e) {
        console.error('Exception in upsert-unified:', e);
    }

    return redirect("/admin/projects");
};
