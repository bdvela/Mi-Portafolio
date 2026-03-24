import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { AboutData } from "@/models/portfolio";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const lang = formData.get("lang")?.toString() || "es";
    const description_1 = formData.get("description_1")?.toString() || "";
    const description_2 = formData.get("description_2")?.toString() || "";
    const description_3 = formData.get("description_3")?.toString() || "";

    // Handle Profile Image Upload
    const profileImage = formData.get("profile_image") as File;
    let profileImageUrl = formData.get("profile_image_url")?.toString() || "";
    const currentProfileImage = formData.get("current_profile_image")?.toString() || "";

    if (profileImage && profileImage.size > 0) {
        const uploadedUrl = await PortfolioService.uploadImage(profileImage, "profile");
        if (uploadedUrl) {
            profileImageUrl = uploadedUrl;
        }
    } else {
        profileImageUrl = profileImageUrl || currentProfileImage;
    }

    const skills_json = {
        FRONTEND: formData.get("skill_frontend")?.toString() || "",
        BACKEND: formData.get("skill_backend")?.toString() || "",
        SAP: formData.get("skill_sap")?.toString() || "",
        UIUX: formData.get("skill_uiux")?.toString() || "",
    };

    const highlights_json = {
        TROPHY: formData.get("high_trophy")?.toString() || "",
        TROPHY_SUB: formData.get("high_trophy_sub")?.toString() || "",
        DEGREE: formData.get("high_degree")?.toString() || "",
        DEGREE_SUB: formData.get("high_degree_sub")?.toString() || "",
    };

    const aboutData: AboutData = {
        lang,
        description_1,
        description_2,
        description_3,
        skills_json,
        highlights_json,
        profile_image_url: profileImageUrl,
    };

    await PortfolioService.upsertAbout(aboutData);

    return redirect("/admin/about");
};
