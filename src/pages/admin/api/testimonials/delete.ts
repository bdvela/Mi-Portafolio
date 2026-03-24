import type { APIRoute } from "astro";
import { PortfolioService } from "@/services/data.service";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const groupId = formData.get("group_id")?.toString();

    if (groupId) {
        await PortfolioService.deleteTestimonialGroup(groupId);
    } else if (id) {
        await PortfolioService.deleteTestimonial(id);
    }

    return redirect("/admin/testimonials");
};
