import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { HeroData } from "@/models/portfolio";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const lang = formData.get("lang")?.toString() || "es";
    const short_description = formData.get("short_description")?.toString() || "";
    const long_description = formData.get("long_description")?.toString() || "";
    const cta_text = formData.get("cta_text")?.toString() || "";
    const cta_link = formData.get("cta_link")?.toString() || "";
    const status_available = true; // Hardcoded for now

    const heroData: HeroData = {
        lang,
        short_description,
        long_description,
        cta_text,
        cta_link,
        cv_url: "", // Handled by Global Settings
        status_available,
        image_url: formData.get("image_url")?.toString() || ""
    };

    await PortfolioService.upsertHero(heroData);

    return redirect("/admin/hero");
};
