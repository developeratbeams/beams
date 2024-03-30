import { authMiddleware } from "@clerk/nextjs";
// Middleware for the routes
export default authMiddleware({
  // public routes that are visible for the not logged in users
  publicRoutes: [
    "/",
    "/contact-us",
    "/terms-of-service",
    "/privacy-policy",
    "/api/webhooks(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

