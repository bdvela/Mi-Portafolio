import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";
import type { TestimonialData } from "@/models/portfolio";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const lang = formData.get("lang")?.toString() || "es";
    const author = formData.get("author")?.toString() || "";
    const company = formData.get("company")?.toString() || "";
    const review = formData.get("review")?.toString() || "";
    const order_index = parseInt(formData.get("order_index")?.toString() || "0");

    const tData: TestimonialData = {
        lang,
        author,
        company,
        review,
        order_index,
    };

    if (id) tData.id = id;

    await PortfolioService.upsertTestimonial(tData);

    return redirect("/admin/testimonials");
};
