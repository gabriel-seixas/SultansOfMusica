import { type Actions, fail, redirect } from "@sveltejs/kit";
import { createUser } from "$lib/somapi/client";
// import { setToken } from "$lib/auth";

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        if (!email || !password) {
            return fail(400, { error: "Preencha todos os campos." });
        }

        try {
            await createUser({ email, password });
            // setToken(cookies, data["jwt-token"]);
        } catch {
            return fail(401, { error: "E‑mail ou senha inválidos." });
        }

        throw redirect(303, "/login");
    },
};