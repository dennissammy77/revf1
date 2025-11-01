export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthService } from "./modules/auth/auth.service";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("revf1_token")?.value;

  if (!token) {
    console.log("revf1_token1",token)
    return NextResponse.redirect(new URL("auth/login", req.url));
  };
  console.log("revf1_token2",token)

  const authService = new AuthService();
  const authorizationResult = await authService.verifyJwtToken(token);

  if (authorizationResult.is_authorized && authorizationResult.data) {
    console.log("revf1_token3",token)
    const res = NextResponse.next({
      request: {
        headers: new Headers(req.headers),
      },
    });

    res.headers.set("x-user-token", token);
    res.headers.set("x-user-id", authorizationResult.data.id);

    return res;
  }
  console.log("revf1_token4",authorizationResult)


  return NextResponse.redirect(new URL("auth/login", req.url));
}

// Protect pages/actions: specify paths in matcher
export const config = {
  matcher: ["/dashboard/:path*"],
};
