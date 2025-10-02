import { createClient } from "@sanity/client";

// Export a flag to know if Sanity is configured
export const isSanityConfigured = Boolean(process.env.SANITY_PROJECT_ID);

// Create a real client only when the projectId is available. Otherwise, export
// a tiny stub so the app can run locally without crashing.
const client = isSanityConfigured
  ? createClient({
      projectId: process.env.SANITY_PROJECT_ID!, // you can find this in sanity.json
      dataset: "production", // or the name you chose in step 1
      useCdn: true, // `false` if you want to ensure fresh data
      apiVersion: "2021-08-31",
    })
  : ({
      // Minimal subset we use throughout the app
      fetch: async () => {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(
            "Sanity is not configured (missing SANITY_PROJECT_ID). Returning empty result."
          );
        }
        return [];
      },
    } as any);

export default client;
