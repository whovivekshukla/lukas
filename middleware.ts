import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/temp-account", "/sign-in"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId === process.env.NEXT_PUBLIC_LUKAS_TEMP_ACCOUNT_ID) {
      if (
        req.method === "POST" ||
        req.method === "PATCH" ||
        req.method === "PUT" ||
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
