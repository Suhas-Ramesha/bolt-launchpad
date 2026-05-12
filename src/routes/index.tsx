import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Bolt+ — Clean, Smooth Energy. No Crash." },
      {
        name: "description",
        content:
          "Bolt+ is a honey-powered natural energy gel. Three caffeine levels, zero crash. Join the pre-launch list for early access and an exclusive discount.",
      },
      { property: "og:title", content: "Bolt+ — Clean, Smooth Energy. No Crash." },
      {
        property: "og:description",
        content:
          "Honey-powered natural energy gels. No spike, no crash. Join the early access list.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
