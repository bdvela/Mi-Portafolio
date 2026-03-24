import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";

export const onRequest = defineMiddleware(async ({ locals, url, cookies, redirect }, next) => {
    // Only protect /admin routes
    if (url.pathname.startsWith("/admin")) {
        // Allow access to the login page and authentication API
        if (url.pathname === "/admin/login" || url.pathname.startsWith("/admin/api/")) {
            return next();
        }

        const accessToken = cookies.get("sb-access-token");
        const refreshToken = cookies.get("sb-refresh-token");

        if (!accessToken || !refreshToken) {
            return redirect("/admin/login");
        }

        const { data, error } = await supabase.auth.setSession({
            refresh_token: refreshToken.value,
            access_token: accessToken.value,
        });

        if (error) {
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });
            return redirect("/admin/login");
        }

        locals.session = data.session;
        locals.user = data.user;
    }

    return next();
});
