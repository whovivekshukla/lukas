import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/flytbase/ros/flytos/navigation/arm",
    "/api/flytbase/ros/flytos/navigation/disarm",
    "/api/flytbase/ros/flytos/navigation/take_off",
    "/api/flytbase/ros/flytos/navigation/land",
    "/api/flytbase/ros/flytos/navigation/waypoint_set",
    "/api/flytbase/ros/flytos/navigation/waypoint_execute",
    "/api/flytbase/ros/flytos/navigation/rtl",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
