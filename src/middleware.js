import { NextResponse } from "next/server";

export const middleware = (req) => {
	const token = req.cookies.get("token")?.value;
	const url = req.nextUrl;

	if (
		token &&
		(url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
	) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (!token && url.pathname === "/") {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/login", "/signup"],
};
