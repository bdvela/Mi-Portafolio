import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { ExperienceData } from "@/models/portfolio";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const lang = formData.get("lang")?.toString() || "es";
    const date = formData.get("date")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const company = formData.get("company")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const current = formData.get("current") === "on";
    const link = formData.get("link")?.toString() || "";

    const expData: ExperienceData = {
        lang,
        date,
        title,
        company,
        description,
        current,
        link,
    };

    if (id) expData.id = id;

    await PortfolioService.upsertExperience(expData);

    return redirect("/admin/experience");
};
