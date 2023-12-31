import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/inspection/:id",
    "/api/test/:id",
    "/api/flytbase/ros/flytos/navigation/access_request",
    "/api/flytbase/ros/flytos/navigation/arm",
    "/api/flytbase/ros/flytos/navigation/disarm",
    "/api/flytbase/ros/flytos/navigation/take_off",
    "/api/flytbase/ros/flytos/navigation/land",
    "/api/flytbase/ros/flytos/navigation/waypoint_set",
    "/api/flytbase/ros/flytos/navigation/waypoint_execute",
    "/api/flytbase/ros/flytos/navigation/rtl",
  ],
  apiRoutes: ["/api(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
