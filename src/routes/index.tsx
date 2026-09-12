import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Yogender Singh — AI/ML & Software Engineer" },
      { name: "description", content: "Portfolio of Yogender Singh, an AI/ML and software engineer building intelligent systems across computer vision and full-stack engineering." },
      { property: "og:title", content: "Yogender Singh — AI/ML & Software Engineer" },
      { property: "og:description", content: "AI/ML, computer vision, research and full-stack engineering work by Yogender Singh." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Yogender Singh", jobTitle: "AI/ML & Software Engineer", email: "mailto:yogendersingh257@gmail.com", sameAs: ["https://linkedin.com/in/yogender-singh-957952270/", "https://github.com/Yogender-Singh"], knowsAbout: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Full-stack Development", "Software Engineering"] }) }],
  }),
  component: Portfolio,
});
