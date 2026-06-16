import type { Cookies } from "@sveltejs/kit";

const TOKEN_KEY = "som_jwt";

/** Reads the JWT from a cookie (server-side only) */
export function getToken(cookies: Cookies): string | undefined {
	return cookies.get(TOKEN_KEY);
}

/** Sets the JWT cookie after login */
export function setToken(cookies: Cookies, token: string) {
	cookies.set(TOKEN_KEY, token, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 60 * 24, // 1 day
	});
}

/** Removes the token cookie */
export function removeToken(cookies: Cookies) {
	cookies.delete(TOKEN_KEY, { path: "/" });
}
