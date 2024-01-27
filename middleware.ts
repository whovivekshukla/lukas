import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  apiRoutes: ["/api(.*)"],
  afterAuth(auth, req, evt) {
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
