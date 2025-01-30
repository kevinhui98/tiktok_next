import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isPublicRoute = createRouteMatcher(["/"]);
export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(request)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(request))
    return redirectToSignIn({ returnBackUrl: request.url });

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", request.url);
    return NextResponse.redirect(onboardingUrl);
  } else {
    console.log(sessionClaims?.metadata?.onboardingComplete);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(request)) return NextResponse.next();
});
// export default function handler(req, res) {
//   try {
//     // Run the Clerk middleware
//     return clerkMiddleware()(req, res);
//   } catch (error) {
//     // Log the error for debugging
//     console.error("Error in middleware:", error);

//     // Return a 500 status code with an error message
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
