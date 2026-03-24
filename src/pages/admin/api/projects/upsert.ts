import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { ProjectData } from "@/models/portfolio";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const lang = formData.get("lang")?.toString() || "es";
    const title = formData.get("title")?.toString() || "";
    const subtitle = formData.get("subtitle")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const tagsString = formData.get("tags")?.toString() || "";
    const featured = formData.get("featured") === "on";
    const isNewProject = formData.get("is_new") === "on";
    const orderIndex = parseInt(formData.get("order_index")?.toString() || "0");

    // Handle Image Upload
    const imageFile = formData.get("image_file") as File;
    let imageUrl = formData.get("image_url")?.toString() || "";
    const currentImage = formData.get("current_image")?.toString() || "";

    if (imageFile && imageFile.size > 0) {
        const uploadedUrl = await PortfolioService.uploadImage(imageFile, "projects");
        if (uploadedUrl) {
            imageUrl = uploadedUrl;
        }
    } else {
        // If no new file, use manual URL or keep current
        imageUrl = imageUrl || currentImage;
    }

    const tags = tagsString.split(",").map(t => t.trim()).filter(t => t !== "");

    const projectData: Partial<ProjectData> = {
        lang,
        title,
        subtitle,
        description,
        link,
        image: imageUrl,
        tags,
        featured,
        is_new: isNewProject,
        order_index: orderIndex
    };

    if (id && id !== "new") {
        await PortfolioService.updateProject(id, projectData);
    } else {
        await PortfolioService.createProject(projectData as ProjectData);
    }

    return redirect("/admin/projects");
};
