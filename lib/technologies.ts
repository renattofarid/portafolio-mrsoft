import { UI } from "react-day-picker";

export interface TechnologyInfo {
  title: string;
  image: string;
}

export const technologies: Record<string, TechnologyInfo> = {
  react: {
    title: "React",
    image: "/technologies/react.svg",
  },
  laravel: {
    title: "Laravel",
    image: "/technologies/laravel.svg",
  },
  vite: {
    title: "Vite",
    image: "/technologies/vite.svg",
  },
  nextjs: {
    title: "Next.js",
    image: "/technologies/nextjs.svg",
  },
  culqi: {
    title: "Culqi",
    image: "/technologies/culqi.svg",
  },
  tailwindcss: {
    title: "Tailwind CSS",
    image: "/technologies/tailwindcss.svg",
  },
  bootstrap: {
    title: "Bootstrap",
    image: "/technologies/bootstrap.svg",
  },
  mercadopago: {
    title: "MercadoPago",
    image: "/technologies/mercadopago.svg",
  },
  cloudflare: {
    title: "Cloudflare",
    image: "/technologies/cloudflare.svg",
  },
  "google-analytics-4": {
    title: "Google Analytics 4",
    image: "/technologies/google-analytics-4.svg",
  },
  shadcnUI: {
    title: "Shadcn UI",
    image: "/technologies/shadcn.svg",
  },
  vercel: {
    title: "Vercel",
    image: "/technologies/vercel.svg",
  },
  digitalocean: {
    title: "DigitalOcean Spaces",
    image: "/technologies/digitalOcean.svg",
  },
  wordpress: {
    title: "WordPress",
    image: "/technologies/wordpress.svg",
  },
  apache: {
    title: "Apache",
    image: "/technologies/apache.svg",
  },
  mysql: {
    title: "MySQL",
    image: "/technologies/mysql.svg",
  },
  gsap: {
    title: "GSAP",
    image: "/technologies/gsap.svg",
  },
 

};
