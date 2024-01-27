import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/temp-account", "/sign-in"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId === "user_2bWyl83Oam3PoCgsrUAMsFFZOZI") {
      if (
        req.method === "POST" ||
        req.method === "PATCH" ||
        req.method === "DELETE"
      ) {
        return NextResponse.json({ message: "Demo Only!" });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
